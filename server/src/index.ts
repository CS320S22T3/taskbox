import express from "express";
import session from "express-session";
import ConnectSessionKnex from "connect-session-knex";
import { Knex } from "connect-session-knex/node_modules/knex";
import { EXPRESS_PORT, SESSION_SECRET } from "./constants";

import { sessions } from "./routes/sessions.route";
import { users } from "./routes/users.route";
import { tasks } from "./routes/tasks.route";
import knex from "./pool";

const KnexSessionStore = ConnectSessionKnex(session);
const store = new KnexSessionStore({
  knex: knex as unknown as Knex,
});

const app = express();
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

const api = express.Router();
api.use("/sessions", sessions);
api.use("/users", users);
api.use("/tasks", tasks);

app.use("/api", api);

app.listen(EXPRESS_PORT, () =>
  console.log("Server listening on port " + EXPRESS_PORT)
);
