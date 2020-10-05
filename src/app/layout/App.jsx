import React, { Fragment, useState } from 'react';
import { Container } from 'semantic-ui-react';
import OffersDashBorad from '../../features/offers/offersDashboard/OffersDashBorad';
import NavBar from '../../features/nav/NavBar';

function App() {
  // toggle the form opening/closing
  const [formOpen, setFormOpen] = useState(false);
  return (
    <Fragment>
      <NavBar setFormOpen={setFormOpen} />
      <Container className='main'>
        <OffersDashBorad formOpen={formOpen} setFormOpen={setFormOpen} />
      </Container>
    </Fragment>
  );
}

export default App;
