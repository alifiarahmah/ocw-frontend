export interface User {
  email: string;
  name: string;
  role: 'admin' | 'contributor' | 'student';
  activated: boolean;
  created_at: string;
  updated_at: string;
}
