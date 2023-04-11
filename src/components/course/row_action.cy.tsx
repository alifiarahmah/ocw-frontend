import RowAction from './row_action';

describe('<RowAction />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RowAction onOpenEdit={() => {}} onOpenDelete={() => {}} />);
  });
});
