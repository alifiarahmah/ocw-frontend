import React from 'react';
import ProblemItem from './problem-item';
import { Question } from '@/types/question';

describe('<ProblemItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    const question: Question = {
      number: '0',
      statement: 'Pertanyaan?',
      options: ['Jawaban A', 'Jawaban B', 'Jawaban C'],
      answer: 'Jawaban A',
      explanation: 'Karena jawaban A benar',
    };
    cy.mount(<ProblemItem id={0} question={question} />);
  });
});
