import express from "express";
import session from "express-session";
import { EXPRESS_PORT } from "./constants";

import { sessions } from "./routes/sessions";

const app = express();
app.use(express.json());
app.use(session());

const api = express.Router();
app.use("/sessions", sessions);

app.use("/api", api);

app.listen(EXPRESS_PORT);
