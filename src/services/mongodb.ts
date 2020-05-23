import { MongoClient } from "https://deno.land/x/mongo/mod.ts";

class CrudDeno extends MongoClient {
  constructor() {
    super();
    this.connectWithUri("mongodb://localhost:27017");
  }
}

export const Client = new CrudDeno();
