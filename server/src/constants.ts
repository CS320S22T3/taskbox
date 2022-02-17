/* eslint-disable @typescript-eslint/no-non-null-assertion */

import assert from 'assert';
import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;

export const SQL_CONN_STR = process.env.SQL_CONN_STR!;
assert(SQL_CONN_STR, 'No `SQL_CONN_STR` in `.env`.');
