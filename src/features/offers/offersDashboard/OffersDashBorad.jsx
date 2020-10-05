import React, { useState } from 'react';
import OfferList from './OfferList';
import OfferForm from '../offerForm/OfferForm';
import { Grid, GridColumn } from 'semantic-ui-react';
import { sampleData } from './../../../app/api/SampleData';

// OfferDashBoared is the parent component of OfferList (Child), sample Data is pasted to OfferList
export default function OffersDashBorad({ formOpen, setFormOpen }) {
  // past the sample data as offer
  const [offers, setOffers] = useState(sampleData);

  return (
    <Grid>
      <GridColumn width={10}>
        <OfferList offers={offers} />
      </GridColumn>
      <GridColumn width={6}>
        {formOpen && <OfferForm setFormOpen={setFormOpen} />}
      </GridColumn>
    </Grid>
  );
}
