import express from "express";
import session from "express-session";

import { sessions } from "./routers/sessions";

const app = express();
app.use(express.json());
app.use(session());

app.use("/api/sessions", sessions);
