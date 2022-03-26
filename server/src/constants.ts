/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { assert } from "console";
import { config } from "dotenv";

config();

function getEnv(key: string, doAssert = true): string {
  if (doAssert)
    assert(process.env[key], `.env file is missing the \`${key}\` field.`);

  return process.env[key]!;
}

export const EXPRESS_PORT = getEnv("EXPRESS_PORT", false) || 3201;

export const DB_NAME = getEnv("DB_NAME");
export const DB_USERNAME = getEnv("DB_USERNAME");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
