export interface UserClaim {
  name: string;
  email: string;
  role: string;
  type: 'refresh' | 'access';
  is_verified: boolean;
}
