import NotFound from './not_found';

import { mount } from 'cypress/react18';

describe('<NotFound />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<NotFound />);
  });
});
