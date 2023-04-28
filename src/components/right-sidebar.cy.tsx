import RightSidebar from './right-sidebar';

import { mount } from 'cypress/react18';

describe('<RightSidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <RightSidebar kodeMataKuliah={''} mataKuliah={''} dosenPengajar={''} />
    );
  });
});
