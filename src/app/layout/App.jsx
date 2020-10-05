import React, { Fragment, useState } from 'react';
import { Container } from 'semantic-ui-react';
import OffersDashBorad from '../../features/offers/offersDashboard/OffersDashBorad';
import NavBar from '../../features/nav/NavBar';

function App() {
  // toggle the form opening/closing
  const [formOpen, setFormOpen] = useState(false);

  // view the offer
  const [selectedOffer, setSelectedOffer] = useState(null);

  // view the offer
  function handleSelectedOffer(offer) {
    setSelectedOffer(offer);
    setFormOpen(true);
  }

  // handle the form open and selected offer at the same time
  function handleCreatedOfferOpen() {
    setSelectedOffer(null);
    setFormOpen(true);
  }
  return (
    <Fragment>
      <NavBar setFormOpen={handleCreatedOfferOpen} />
      <Container className='main'>
        <OffersDashBorad
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectOffer={handleSelectedOffer}
          selectedOffer={selectedOffer}
        />
      </Container>
    </Fragment>
  );
}

export default App;
