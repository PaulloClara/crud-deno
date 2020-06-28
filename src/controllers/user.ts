import { Context } from "../router.ts";
import { UserModel, UserType } from "../models/user.ts";

import { makeJWT } from "../services/jwt.ts";
import { hashPassword, comparePassword } from "../services/bcrypt.ts";

function handleUserResponse(user: UserType): UserType {
  user.id = user._id?.$oid || "";
  user._id = undefined;
  user.password = undefined;

  return user;
}

export class UserController {
  static async index({ response }: Context): Promise<void> {
    try {
      const users: Array<UserType> = await UserModel.find();

      response.body = users.map(handleUserResponse);
    } catch (error) {
      console.error(error);
    }
  }

  static async store(context: Context): Promise<void> {
    try {
      const { response, json } = context;

      if (!UserModel.isValid(json)) {
        response.body = { error: "invalid fields" };

        return;
      }

      json.password = await hashPassword(json.password);
      json.createdAt = new Date().toISOString();

      const _id: string = await UserModel.insertOne(json);
      const user: UserType = await UserModel.findOne({ _id });

      user.token = await makeJWT({ id: _id });
      user.password = undefined;

      response.body = handleUserResponse(user);
    } catch (error) {
      console.error(error);
    }
  }

  static async update(context: Context): Promise<void> {
    try {
      const { request, response, json } = context;
      const _id: string = request.headers.get("id") || "";

      await UserModel.updateOne({ _id: { $oid: _id } }, { $set: json });

      response.body = { status: "OK" };
    } catch (error) {
      console.error(error);
    }
  }

  static async destroy(context: Context): Promise<void> {
    try {
      const { request, response } = context;
      const _id: string = request.headers.get("id") || "";

      await UserModel.deleteOne({ _id: { $oid: _id } });

      response.body = { status: "OK" };
    } catch (error) {
      console.error(error);
    }
  }
}

export class SessionController {
  static async store(context: Context): Promise<void> {
    try {
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
    } catch (error) {
      console.error(error);
    }
  }
}
