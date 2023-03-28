import { Faculty } from './faculty';

export interface Major {
  id: string;
  name: string;
  fac_id: string;
  faculty: Faculty;
  abbreviation: string;
}
