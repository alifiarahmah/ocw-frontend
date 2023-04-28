import CourseCard from './course_card';

import { mount } from 'cypress/react18';

describe('<CourseCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(
      <CourseCard
        courseCode={''}
        major={''}
        courseName={''}
        lecturer={''}
        href={''}
      />
    );
  });
});
