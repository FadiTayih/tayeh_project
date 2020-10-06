import React, { Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import OffersDashBorad from '../../features/offers/offersDashboard/OffersDashBorad';
import NavBar from '../../features/nav/NavBar';
import OfferDetailPage from '../../features/offers/offerDetailPage/OfferDetailPage';
import HomePage from '../../features/home/HomePage';
import { Route } from 'react-router-dom';
import OfferForm from '../../features/offers/offerForm/OfferForm';

function App() {
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
              <Route path='/offers/:id' component={OfferDetailPage} />
              <Route
                path={(['/createOffer'], '/manage/:id')}
                component={OfferForm}
              />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default App;
