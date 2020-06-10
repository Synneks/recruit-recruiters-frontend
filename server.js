const express = require("express");
const app = express();
const apth = require("path");

app.use(express.static(__dirname + "/dist/recruit-recruiters"));

app.listen(process.env.PORT || 8080);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/recruit-recruiters/index.html"));
});

console.log("Console listening!");
