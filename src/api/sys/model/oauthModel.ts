export interface AuthModel {
  OAuthPlatform: number;
  State: string;
}

export interface AuthLoginModel {
  Code: string;
  State: string;
}
