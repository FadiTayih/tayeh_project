import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import {
  addUserToInterestList,
  cancelUserPlaceInInterestList,
} from '../../../app/firebase/fireBaseService';

const eventImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

export default function OfferDetailedHeader({ offer, isInterested, isHost }) {
  const [loading, setLoading] = useState(false);

  // handle if the user want to join an offer
  async function handleUserJoinOffer() {
    setLoading(true);

    try {
      await addUserToInterestList(offer);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  // handle if the user want to cancel his place in offer
  async function handleUserCancelOffer() {
    setLoading(true);
    try {
      await cancelUserPlaceInInterestList(offer);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          size='large'
          src={offer.carPhotoURL}
          style={{ objectFit: 'cover', width: '100%', height: 550 }}
        />

        <Segment basic style={eventImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='large'
                  content={offer.name}
                  style={{ color: 'white' }}
                />
                <p>
                  Offered by{' '}
                  <strong>
                    <Link to={`/profile/${offer.hostUid}`}>
                      {offer.createdBy}
                    </Link>
                  </strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>

      <Segment attached='bottom' clearing>
        {/* If the user is not a host show those buttons */}
        {!isHost && (
          <>
            {/* If the user is interested in the offer , then show the cancel button */}
            {isInterested ? (
              <Button onClick={handleUserCancelOffer} loading={loading}>
                Cancel My Place
              </Button>
            ) : (
              <Button
                onClick={handleUserJoinOffer}
                loading={loading}
                color='teal'
              >
                JOIN THIS Offer
              </Button>
            )}
          </>
        )}

        {/* If the user is the host , show  the manage button */}
        {isHost && (
          <Button
            as={Link}
            to={`/manage/${offer.id}`}
            color='orange'
            floated='right'
          >
            Manage Offer
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
}
