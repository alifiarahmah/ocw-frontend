import MockRouter from '../../cypress/utils/router';
import Layout from './layout';

import { mount } from 'cypress/react18';

describe('<Layout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    // mount next router
    mount(
      <MockRouter>
        <Layout>
          <p>test</p>
        </Layout>
      </MockRouter>
    );
  });
});
