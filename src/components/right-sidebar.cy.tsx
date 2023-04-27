import RightSidebar from './right-sidebar';

describe('<RightSidebar />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <RightSidebar kodeMataKuliah={''} mataKuliah={''} dosenPengajar={''} />
    );
  });
});
