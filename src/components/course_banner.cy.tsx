import React from 'react';
import CourseBanner from './course_banner';

describe('<CourseBanner />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CourseBanner course_code={''} course_name={''} lecturer={''} />);
  });
});
