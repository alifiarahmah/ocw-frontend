import CourseBanner from './course_banner';

import { mount } from 'cypress/react18';

describe('<CourseBanner />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<CourseBanner course_code={''} course_name={''} lecturer={''} />);
  });
});
