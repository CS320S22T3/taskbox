/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
