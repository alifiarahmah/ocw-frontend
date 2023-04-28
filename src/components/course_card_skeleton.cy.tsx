import CourseCardSkeleton from './course_card_skeleton';

import { mount } from 'cypress/react18';

describe('<CourseCardSkeleton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    mount(<CourseCardSkeleton />);
  });
});
