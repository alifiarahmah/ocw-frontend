import AddCourseModal from './add-course-modal';

import { mount } from 'cypress/react18';

describe('<AddCourseModal />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <AddCourseModal
        isOpen={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleConfirm={function (): void {
          throw new Error('Function not implemented.');
        }}
        id={''}
        setId={function (id: string): void {
          throw new Error('Function not implemented.');
        }}
        name={''}
        setName={function (name: string): void {
          throw new Error('Function not implemented.');
        }}
        majors={[]}
        majabbr={''}
        setMajabbr={function (majabbr: string): void {
          throw new Error('Function not implemented.');
        }}
        abbreviation={''}
        setAbbreviation={function (abbreviation: string): void {
          throw new Error('Function not implemented.');
        }}
        description={''}
        setDescription={function (description: string): void {
          throw new Error('Function not implemented.');
        }}
        lecturer={''}
        setLecturer={function (lecturer: string): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  });
});
