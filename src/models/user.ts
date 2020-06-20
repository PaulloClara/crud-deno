import { Client } from "../services/mongodb.ts";
import { Collection } from "https://deno.land/x/mongo/mod.ts";

export type UserType = {
  _id?: string;
  name: string;
  surname: string;
  username: string;
  email: string;
  password?: string;
  token?: string;
  createdAt?: Date;
};

class UserCollection extends Collection {
  constructor() {
    super(Client, "CrudDeno", "users");
  }

  isValid(user: UserType | any): boolean {
    const { name, surname, username, email, password } = user;

    return name && surname && username && email && password;
  }
}

export const UserModel = new UserCollection();
