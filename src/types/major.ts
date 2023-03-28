import { Faculty } from './faculty';

export interface Major {
  ID: string;
  Name: string;
  Fac_id: string;
  Faculty: Faculty;
  Abbreviation: string;
}
