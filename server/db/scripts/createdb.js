const pgtools = require("pgtools");
require("dotenv").config();

pgtools.createdb(
  {
    user: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
    port: process.env["DB_PORT"],
    host: process.env["DB_HOST"],
  },
  "taskbox",
  (err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    }
    console.log(res);
  }
);
