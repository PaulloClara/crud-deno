import { Client } from "../services/mongodb.ts";
import { Collection } from "https://deno.land/x/mongo/mod.ts";

export type UserFields = {
  _id?: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
};

class UserCollection extends Collection {
  constructor() {
    super(Client, "CrudDeno", "users");
  }

  isValid({
    name,
    surname,
    username,
    email,
    password
  }: UserFields | any): boolean {
    if (name && surname && username && email && password) return true;
    return false;
  }
}

export const UserModel = new UserCollection();
