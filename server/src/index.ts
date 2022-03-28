import express from "express";
import session from "express-session";
import { EXPRESS_PORT, SESSION_SECRET } from "./constants";

import { sessions } from "./routes/sessions.route";

const app = express();
app.use(express.json());
app.use(session({ secret: SESSION_SECRET }));

const api = express.Router();
api.use("/sessions", sessions);

app.use("/api", api);

app.listen(EXPRESS_PORT);
