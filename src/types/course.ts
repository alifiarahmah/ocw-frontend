import { Major } from './major';

export interface Course {
  id: string;
  name: string;
  major_id: string;
  // major: Major;
  description: string;
  email?: string;
  abbreviation: string;
  lecturer: string;
}
