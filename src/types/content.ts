export interface Content {
  id: string;
  type: 'video' | 'handout' | 'external';
  link: string;
  material_id: string;
}
