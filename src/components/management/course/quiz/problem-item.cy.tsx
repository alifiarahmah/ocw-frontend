import { Problem } from '@/types/problem';
import ProblemItem from './problem-item';

describe('<ProblemItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const question: Problem = {
      number: '0',
      statement: 'Pertanyaan?',
      options: ['Jawaban A', 'Jawaban B', 'Jawaban C'],
      answer: 'Jawaban A',
      explanation: 'Karena jawaban A benar',
    };
    cy.mount(<ProblemItem id={0} question={question} />);
  });
});
