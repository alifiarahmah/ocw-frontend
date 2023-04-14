import React from 'react';
import CourseCard from './course_card';

describe('<CourseCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
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
