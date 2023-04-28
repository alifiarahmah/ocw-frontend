import { AnswerOption } from './answer_option';

export interface Problem {
  id: string;
  media_id?: any[];
  question: string;
  answers: AnswerOption[];
}
