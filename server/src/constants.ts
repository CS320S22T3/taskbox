/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { assert } from "console";
import { config } from "dotenv";

config();

function getEnv(key: string): string {
  assert(process.env[key], `.env file is missing the \`${key}\` field.`);

  return process.env[key]!;
}

export const EXPRESS_PORT = process.env.EXPRESS_PORT || 3201;

export const SQL_CONNECTION_URI = getEnv("SQL_CONNECTION_URI");
