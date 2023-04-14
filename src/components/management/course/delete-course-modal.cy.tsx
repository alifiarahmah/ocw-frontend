import React from 'react';
import DeleteCourseModal from './delete-course-modal';

describe('<DeleteCourseModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <DeleteCourseModal
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleConfirm={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
