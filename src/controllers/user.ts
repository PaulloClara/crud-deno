import { makeJWT } from "../services/jwt.ts";
import { hashPassword, comparePassword } from "../services/bcrypt.ts";

import { Context } from "../router/utils.ts";
import { UserModel, UserFields } from "../models/user.ts";

export class UserController {
  static async index({ response }: Context): Promise<any> {
    const users: [UserFields] = await UserModel.find();

    users.forEach(user => (user.password = ""));
    response.body = users;
  }

  static async store(context: Context): Promise<any> {
    const { response, json } = context;

    if (!UserModel.isValid(json))
      return (response.body = { error: "invalid fields" });

    json.password = await hashPassword(json.password);

    const _id: string = await UserModel.insertOne(json);
    const user: UserFields = await UserModel.findOne({ _id });

    user.token = await makeJWT({ id: _id });
    user.password = "";

    response.body = user;
  }

  static async update(context: Context): Promise<any> {
    const { request, response, json } = context;

    const _id: string = request.headers.get("id") || "";

    await UserModel.updateOne({ _id: { $oid: _id } }, { $set: json });
    response.body = { status: "OK" };
  }

  static async destroy(context: Context): Promise<any> {
    const { request, response } = context;

    const _id: string = request.headers.get("id") || "";
    await UserModel.deleteOne({ _id: { $oid: _id } });

    response.body = { status: "OK" };
  }
}

export class SessionController {
  static async store(context: Context): Promise<any> {
    const { response, params, json } = context;

    const user: UserFields = await UserModel.findOne({
      _id: { $oid: params.id }
    });

    if (!(await comparePassword(json.password, user.password)))
      return (response.body = { error: "Password Error" });

    user.token = await makeJWT({ id: params.id });
    user.password = "";

    response.body = user;
  }
}
