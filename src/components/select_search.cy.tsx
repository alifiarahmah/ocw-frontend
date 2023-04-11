import React from 'react';
import { SelectSearch } from './select_search';

describe('<SelectSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.intercept('GET', '/course/major', {
      fixture: 'major.json',
    });
    cy.intercept('GET', '/course/faculty', {
      fixture: 'faculty.json',
    });
    cy.mount(<SelectSearch />);
  });
});
