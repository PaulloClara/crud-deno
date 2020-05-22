import { UserModel, User } from "./models.ts";
import { RouterContext, Body } from "https://deno.land/x/oak/mod.ts";

export class HomeController {
  static index({ response }: RouterContext): void {
    response.body = "Hello World!";
  }
}

export class UserController {
  static async index({ response }: RouterContext): Promise<any> {
    const user: User = await UserModel.find();
    response.body = user;
  }

  static async store({ request, response }: RouterContext): Promise<any> {
    const { value: fields }: Body = await request.body({
      contentTypes: { json: [] }
    });

    if (!UserModel.isValid(fields))
      return (response.body = { error: "invalid fields" });

    const _id = await UserModel.insertOne(fields);
    const user: User = await UserModel.findOne({ _id });

    response.body = user;
  }
}
