import { SelectSearch } from './select_search';

import { mount } from 'cypress/react18';

describe('<SelectSearch />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.intercept('GET', '/course/major', {
      fixture: 'major.json',
    });
    cy.intercept('GET', '/course/faculty', {
      fixture: 'faculty.json',
    });
    mount(<SelectSearch />);
  });
});
