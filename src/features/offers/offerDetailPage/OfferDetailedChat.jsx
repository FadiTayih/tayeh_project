import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment, Header, Comment } from 'semantic-ui-react';
import { listenToOfferChat } from '../../offerActions';
import {
  firebaseObjectToArray,
  getOfferChatRef,
} from '../../../app/firebase/fireBaseService';
import OfferDetailChatForm from './OfferDetailedChatForm';
import { Link } from 'react-router-dom';

import { formatDistance } from 'date-fns';
import { CLEAR_COMMENTS } from '../../offerConst';
import { createDataTree } from '../../../app/common/util/util';

export default function OfferDetailedChat({ offerId }) {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.offer);

  // control the reply functionality
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  });

  // handle closing the reply form
  function handleCloseReplyForm() {
    setShowReplyForm({ open: false, commentId: null });
  }

  useEffect(() => {
    // listen to any new comment based on the value
    getOfferChatRef(offerId).on('value', (snapshot) => {
      if (!snapshot.exists()) return;
      dispatch(
        listenToOfferChat(firebaseObjectToArray(snapshot.val()).reverse())
      );
    });
    // to clear the comments and try out the lister
    return () => {
      dispatch({ type: CLEAR_COMMENTS });
    };
  }, [offerId, dispatch]);
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='teal'
        style={{ border: 'none' }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <OfferDetailChatForm
          offerId={offerId}
          parentId={0}
          closeForm={setShowReplyForm}
        />
        <Comment.Group>
          {createDataTree(comments).map((comment) => (
            <Comment key={comment.id}>
              <Comment.Avatar
                src={comment.photoURL || `/assests/images/user.png`}
              />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>
                  {comment.displayName}
                </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.date, new Date())}</div>
                </Comment.Metadata>
                <Comment.Text>
                  {comment.text.split('/n').map((text, i) => (
                    <span key={i}>
                      {text}
                      <br />
                    </span>
                  ))}
                </Comment.Text>
                <Comment.Actions>
                  <Comment.Action
                    onClick={() =>
                      setShowReplyForm({ open: true, commentId: comment.id })
                    }
                  >
                    Reply
                  </Comment.Action>
                  {showReplyForm.open &&
                    showReplyForm.commentId === comment.id && (
                      <OfferDetailChatForm
                        offerId={offerId}
                        closeForm={handleCloseReplyForm}
                        parentId={comment.id}
                      />
                    )}
                </Comment.Actions>
              </Comment.Content>
              {/* if there is  childNodes ie replies then show this section */}
              {comment.childNodes.length > 0 && (
                <Comment.Group>
                  {comment.childNodes.reverse().map((child) => (
                    <Comment key={child.id}>
                      <Comment.Avatar
                        src={child.photoURL || `/assests/images/user.png`}
                      />
                      <Comment.Content>
                        <Comment.Author as={Link} to={`/profiles/${child.uid}`}>
                          {child.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                          <div>{formatDistance(child.date, new Date())}</div>
                        </Comment.Metadata>
                        <Comment.Text>
                          {child.text.split('/n').map((text, i) => (
                            <span key={i}>
                              {text}
                              <br />
                            </span>
                          ))}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action
                            onClick={() =>
                              setShowReplyForm({
                                open: true,
                                commentId: child.id,
                              })
                            }
                          >
                            Reply
                          </Comment.Action>
                          {showReplyForm.open &&
                            showReplyForm.commentId === child.id && (
                              <OfferDetailChatForm
                                offerId={offerId}
                                closeForm={handleCloseReplyForm}
                                parentId={child.parentId}
                              />
                            )}
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  ))}
                </Comment.Group>
              )}
            </Comment>
          ))}
        </Comment.Group>
      </Segment>
    </>
  );
}
