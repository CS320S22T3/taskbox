import express from "express";
import session from "express-session";
import { EXPRESS_PORT } from "./constants";
import { SESSION_SECRET } from "./constants";
import sequelize from "./db/sequelize";

import { sessions } from "./routes/sessions.route";

const app = express();
app.use(express.json());
app.use(session({ secret: SESSION_SECRET }));

const api = express.Router();
api.use("/sessions", sessions);

app.use("/api", api);

function start() {
  return new Promise<void>((res, rej) => {
    console.log("Authenticating with database...");
    sequelize
      .authenticate()
      .then(() => {
        console.log("Authenticated with database.");
        console.log("Starting express server...");
        app.listen(EXPRESS_PORT, () => {
          console.log(`Express server listening on port ${EXPRESS_PORT}`);
          res();
        });
      })
      .catch(rej);
  });
}

console.log("Starting server...");
start()
  .then(() => {
    console.log("Server ready.");
  })
  .catch((e) => {
    console.error("Unable to start server. Aborting.");
    console.log(e);
    process.exit(-1);
  });
