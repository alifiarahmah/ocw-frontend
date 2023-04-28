import { Content } from "./content";

export interface Material {
	id: string;
	course_id: string;
	creator_email: string;
	name: string;
	week: number;
	contents: Content[];
}