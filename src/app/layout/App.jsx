import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import OffersDashBorad from '../../features/offers/offersDashboard/OffersDashBorad';
import NavBar from '../../features/nav/NavBar';
import OfferDetailPage from '../../features/offers/offerDetailPage/OfferDetailPage';
import HomePage from '../../features/home/HomePage';
import { Route, useLocation } from 'react-router-dom';
import OfferForm from '../../features/offers/offerForm/OfferForm';
import SandBox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify';
import ErrorComponent from '../errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';

function App() {
  // custom hook from react router, to access the location props
  // inoder to refresh the offers form, between edit and create
  const { key } = useLocation();

  const { initialized } = useSelector((state) => state.async);

  // check if we got the props from the server, before loading the component
  if (!initialized) return <LoadingComponent content='Loading...' />;

  return (
    <Fragment>
      {/* Show Error Messages */}
      <ToastContainer position='bottom-right' hideProgressBar />
      {/* manager the opening and closing of the modal */}
      <ModalManager />
      {/* Route goes to the home page */}
      <Route exact path='/' component={HomePage} />
      {/* Route to the error page */}
      <Route path='/errors' component={ErrorComponent} />
      {/* If the URL has more params then route to the other pages */}
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/offers' component={OffersDashBorad} />
              <Route exact path='/accounts' component={AccountPage} />
              <Route exact path='/sandbox' component={SandBox} />
              <Route path='/offers/:id' component={OfferDetailPage} />
              <Route path='/profile/:id' component={ProfilePage} />
              {/* go to the offer form if any of those route are actived */}
              <Route
                path={['/createOffer', '/manage/:id']}
                component={OfferForm}
                key={key}
              />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default App;
