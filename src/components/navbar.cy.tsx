import MockRouter from '../../cypress/utils/router';
import Navbar from './navbar';

describe('<Navbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <MockRouter>
        <Navbar />
      </MockRouter>
    );
  });
});
