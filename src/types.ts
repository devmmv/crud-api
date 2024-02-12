import { UUID } from "crypto";
import http from "http";

export type ResType = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};
export type ReqType = http.IncomingMessage;

export type UserProp = {
  username: string;
  age: number;
  hobbies: string[] | [];
};
export type Id = {
  id: UUID;
};
export type User = {
  id: `${string}-${string}-${string}-${string}-${string}`;
  username: string;
  age: number;
  hobbies: [] | string[];
};

export type AllUsersType = User[] | [];
