import React from 'react';
import RowAction from './row-action';

describe('<RowAction />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RowAction onOpenEdit={() => {}} onOpenDelete={() => {}} />);
  });
});
