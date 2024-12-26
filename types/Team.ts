import { User } from "./User";

export type Team = {
  _id: string;
  owner: User;
  members: User[];
  name: string;
};
