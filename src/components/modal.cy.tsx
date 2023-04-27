import Modal from './modal';

describe('<Modal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <Modal
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        children={undefined}
      />
    );
  });
});
