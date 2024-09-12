export const LOGIN_ERROR = {
  EMAIL: 'email',
  PASSWORD: 'password',
  INVALID: 'invalid',
  UNKNOWN: 'unknown',
} as const;

export type LoginErrorTypes = (typeof LOGIN_ERROR)[keyof typeof LOGIN_ERROR];
