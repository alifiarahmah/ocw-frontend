import React from 'react';
import CourseCardSkeleton from './course_card_skeleton';

describe('<CourseCardSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CourseCardSkeleton />);
  });
});
