import RowAction from './row-action';

import { mount } from 'cypress/react18';

describe('<RowAction />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<RowAction onOpenEdit={() => {}} onOpenDelete={() => {}} />);
  });
});
