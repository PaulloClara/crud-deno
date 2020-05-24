import { validateJwt } from "https://deno.land/x/djwt/validate.ts";
import {
  Jose,
  Payload,
  makeJwt,
  setExpiration
} from "https://deno.land/x/djwt/create.ts";

const KEY = "HaShKeYbOlAdAuM";

const PAYLOAD: Payload = {
  iss: "joe",
  exp: setExpiration(new Date().getTime() + 60 * 60 * 24000)
};

const HEADER: Jose = {
  alg: "HS256",
  typ: "JWT",
  ["app"]: { id: "" }
};

function makeHeader(app: any) {
  return { ...HEADER, ["app"]: app };
}

export async function makeJWT(opts: any): Promise<any> {
  return makeJwt({
    header: makeHeader(opts),
    payload: PAYLOAD,
    key: KEY
  });
}

export async function validateJWT(jwt: string): Promise<any> {
  return validateJwt(jwt, KEY, { isThrowing: false });
}
