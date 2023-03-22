import { Major } from "./major";

export interface Course {
  Abbreviation: string;
  Description: string;
  Email?: string;
  ID: string;
  Lecturer: string;
  Major_id: string;
  Major: Major;
  Name: string;
}
