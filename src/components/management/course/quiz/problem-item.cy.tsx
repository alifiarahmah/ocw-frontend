import { Problem } from '@/types/problem';
import ProblemItem from './problem-item';

import { mount } from 'cypress/react18';

describe('<ProblemItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const question: Problem = {
      id: 'fe7d63c9-8cf1-4f1f-a351-ce6e611f06b4',
      media_id: [],
      question: 'Berapa 1 + 1 ?',
      answers: [
        {
          id: '23fe6f84-cb98-4782-9cf6-3d7e99ad2246',
          media_id: [],
          answer: '',
          is_solution: null,
        },
        {
          id: '04ecce22-175a-4c6b-9f2e-057e68f3a30a',
          media_id: [],
          answer: '',
          is_solution: null,
        },
        {
          id: 'e505a84a-56d8-4544-a719-52fbeb8a860c',
          media_id: [],
          answer: '',
          is_solution: null,
        },
        {
          id: '1f29a78e-65e0-4b45-b884-663eed2ef644',
          media_id: [],
          answer: '',
          is_solution: null,
        },
      ],
    };
    mount(
      <ProblemItem
        number={5}
        problems={[question]}
        problem={question}
        setProblems={() => {}}
      />
    );
  });
});
