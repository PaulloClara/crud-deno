import { UserModel, UserFields } from "../models/user.ts";
import { RouterContext, Body } from "https://deno.land/x/oak/mod.ts";

export class UserController {
  static async index({ response }: RouterContext): Promise<any> {
    const user: UserFields = await UserModel.find();
    response.body = user;
  }

  static async store({ request, response }: RouterContext): Promise<any> {
    const { value: fields }: Body = await request.body({
      contentTypes: { json: [] }
    });

    if (!UserModel.isValid(fields))
      return (response.body = { error: "invalid fields" });

    const _id = await UserModel.insertOne(fields);
    const user: UserFields = await UserModel.findOne({ _id });

    response.body = user;
  }

  static async update(context: RouterContext): Promise<any> {
    const { request, response, params } = context;

    const { value: fields }: Body = await request.body({
      contentTypes: { json: [] }
    });

    await UserModel.updateOne({ _id: { $oid: params.id } }, { $set: fields });

    response.body = { status: "OK" };
  }

  static async destroy(context: RouterContext): Promise<any> {
    const { response, params } = context;

    await UserModel.deleteOne({ _id: { $oid: params.id } });

    response.body = { status: "OK" };
  }
}
