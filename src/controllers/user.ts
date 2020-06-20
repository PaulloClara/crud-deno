import { Context } from "../router.ts";
import { UserModel, UserType } from "../models/user.ts";

import { makeJWT } from "../services/jwt.ts";
import { hashPassword, comparePassword } from "../services/bcrypt.ts";

export class UserController {
  static async index({ response }: Context): Promise<void> {
    const users: [UserType] = await UserModel.find();

    users.forEach(user => (user.password = undefined));
    response.body = users;
  }

  static async store(context: Context): Promise<void> {
    const { response, json } = context;

    if (!UserModel.isValid(json)) {
      response.body = { error: "invalid fields" };

      return;
    }

    json.password = await hashPassword(json.password);

    const _id: string = await UserModel.insertOne(json);
    const user: UserType = await UserModel.findOne({ _id });

    user.token = await makeJWT({ id: _id });
    user.password = undefined;

    response.body = user;
  }

  static async update(context: Context): Promise<void> {
    const { request, response, json } = context;

    const _id: string = request.headers.get("id") || "";

    await UserModel.updateOne({ _id: { $oid: _id } }, { $set: json });
    response.body = { status: "OK" };
  }

  static async destroy(context: Context): Promise<void> {
    const { request, response } = context;

    const _id: string = request.headers.get("id") || "";
    await UserModel.deleteOne({ _id: { $oid: _id } });

    response.body = { status: "OK" };
  }
}

export class SessionController {
  static async store(context: Context): Promise<void> {
    const { response, params, json } = context;

    const user: UserType = await UserModel.findOne({
      _id: { $oid: params.id }
    });

    if (!(await comparePassword(json.password, user.password || ""))) {
      response.body = { error: "Password Error" };

      return;
    }

    user.token = await makeJWT({ id: params.id });
    user.password = undefined;

    response.body = user;
  }
}
