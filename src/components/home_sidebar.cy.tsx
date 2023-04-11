import React from 'react';
import HomeSidebar from './home_sidebar';

describe('<HomeSidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HomeSidebar />);
  });
});
