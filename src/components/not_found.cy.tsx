import React from 'react';
import NotFound from './not_found';

describe('<NotFound />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotFound />);
  });
});
