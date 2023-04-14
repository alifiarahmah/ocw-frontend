import MockRouter from '../../cypress/utils/router';
import Layout from './layout';

describe('<Layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // mount next router
    cy.mount(
      <MockRouter>
        <Layout>
          <p>test</p>
        </Layout>
      </MockRouter>
    );
  });
});
