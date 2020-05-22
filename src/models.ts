import { MongoClient, Collection } from "https://deno.land/x/mongo/mod.ts";

class CrudDeno extends MongoClient {
  constructor() {
    super();
    this.connectWithUri("mongodb://localhost:27017");
  }
}

const client = new CrudDeno();

export interface User {
  _id?: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
}

class UserCollection extends Collection {
  constructor() {
    super(client, "CrudDeno", "users");
  }

  isValid({ name, surname, username, email, password }: User | any): boolean {
    if (name && surname && username && email && password) return true;
    return false;
  }
}

export const UserModel = new UserCollection();
