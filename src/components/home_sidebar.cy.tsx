import HomeSidebar from './home_sidebar';

import { mount } from 'cypress/react18';

describe('<HomeSidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<HomeSidebar />);
  });
});
