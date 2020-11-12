import { User } from './user';
export interface ApiResponse {
  validationMessages: string[],
  token: string,
  data: any,
}
