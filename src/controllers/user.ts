import { UserModel, UserFields } from "../models/user.ts";
import { RouterContextJSON } from "../middlewares/index.ts";
import { RouterContext } from "https://deno.land/x/oak/mod.ts";

export class UserController {
  static async index({ response }: RouterContext): Promise<any> {
    const user: UserFields = await UserModel.find();
    response.body = user;
  }

  static async store(context: RouterContextJSON): Promise<any> {
    const { response, json } = context;

    if (!UserModel.isValid(json))
      return (response.body = { error: "invalid fields" });

    const _id = await UserModel.insertOne(json);
    const user: UserFields = await UserModel.findOne({ _id });

    response.body = user;
  }

  static async update(context: RouterContextJSON): Promise<any> {
    const { response, params, json } = context;

    await UserModel.updateOne({ _id: { $oid: params.id } }, { $set: json });
    response.body = { status: "OK" };
  }

  static async destroy(context: RouterContext): Promise<any> {
    const { response, params } = context;

    await UserModel.deleteOne({ _id: { $oid: params.id } });

    response.body = { status: "OK" };
  }
}
