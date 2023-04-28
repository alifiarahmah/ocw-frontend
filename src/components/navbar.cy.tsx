import MockRouter from '../../cypress/utils/router';
import Navbar from './navbar';

import { mount } from 'cypress/react18';

describe('<Navbar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <MockRouter>
        <Navbar />
      </MockRouter>
    );
  });
});
