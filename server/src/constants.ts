/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { assert } from "console";
import { config } from "dotenv";

config();

export const EXPRESS_PORT = process.env.EXPRESS_PORT || 3000;

export const SQL_CONNECTION_URI = process.env.SQL_CONNECTION_URI!;
assert(SQL_CONNECTION_URI, "Missing `SQL_CONNECTION_URI` from env.");
