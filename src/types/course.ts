import { Major } from './major';

export interface Course {
  id: string;
  name: string;
  major_id: string;
  major: string | Major | null;
  description: string;
  email?: string;
  abbreviation: string;
  lecturer: string;
}
