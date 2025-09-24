import { UserRes } from './user-type';

export interface responseType {
  isSucceded: boolean;
  message: string;
  messageList: string[];
  value: UserRes[];
}
