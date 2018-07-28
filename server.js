const express = require("express");
const app = express();
const fetchUserRepo = require("./handler.js").fetchUserRepo;

app.get("/:user", fetchUserRepo);
app.listen(8000);
