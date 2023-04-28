import DeleteCourseModal from './delete-course-modal';

import { mount } from 'cypress/react18';

describe('<DeleteCourseModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
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
