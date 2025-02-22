export interface Config {
  port: number;
  jwtSecret: string;
  environment: string;
  logLevel: string;
  bcryptSaltRounds: number;
}