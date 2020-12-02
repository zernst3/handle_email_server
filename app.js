const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.listen(PORT, () => console.log(`Email app listening on port ${8080}!`));
