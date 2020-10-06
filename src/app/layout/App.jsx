import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import OffersDashBorad from '../../features/offers/offersDashboard/OffersDashBorad';
import NavBar from '../../features/nav/NavBar';
import OfferDetailPage from '../../features/offers/offerDetailPage/OfferDetailPage';
import HomePage from '../../features/home/HomePage';
import { Route, useLocation } from 'react-router-dom';
import OfferForm from '../../features/offers/offerForm/OfferForm';
import SandBox from '../../features/sandbox/Sandbox';

function App() {
  // custom hook from react router, to access the location props
  // inoder to refresh the offers form, between edit and create
  const { key } = useLocation();
  return (
    <Fragment>
      {/* Route goes to the home page */}
      <Route exact path='/' component={HomePage} />
      {/* If the URL has more params then route to the other pages */}
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/offers' component={OffersDashBorad} />
              <Route exact path='/sandbox' component={SandBox} />
              <Route path='/offers/:id' component={OfferDetailPage} />
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
