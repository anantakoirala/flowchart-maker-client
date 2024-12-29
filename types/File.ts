import { User } from "./User";

export type File = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdBy: User;
};
