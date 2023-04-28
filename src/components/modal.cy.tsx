import Modal from './modal';

import { mount } from 'cypress/react18';

describe('<Modal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <Modal
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
      >
        <div>Modal</div>
      </Modal>
    );
  });
});
