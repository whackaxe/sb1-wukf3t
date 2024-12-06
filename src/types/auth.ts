export interface User {
  username: string;
  token: string;
  profile_picture?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}