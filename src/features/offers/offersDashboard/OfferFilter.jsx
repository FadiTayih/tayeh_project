import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default function OfferFilter({ predicate, setPredicate, loading }) {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%' }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        {/* check if the item is filter all then apply */}
        <Menu.Item
          active={predicate.get('filter') === 'all'}
          onClick={() => setPredicate('filter', 'all')}
          disabled={loading}
          content='All Offers'
        />
        <Menu.Item
          content="I'm Interested In"
          active={predicate.get('filter') === 'isInterested'}
          onClick={() => setPredicate('filter', 'isInterested')}
          disabled={loading}
        />
        <Menu.Item
          content="I'm Offering"
          active={predicate.get('filter') === 'isHosting'}
          onClick={() => setPredicate('filter', 'isHosting')}
          disabled={loading}
        />
      </Menu>

    </>
  );
}
