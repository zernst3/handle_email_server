require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;
const mailgun = require("mailgun-js");

const APIKEY = process.env.APIKEY;
const DOMAIN = process.env.DOMAIN;

const mg = mailgun({ apiKey: APIKEY, domain: DOMAIN });

const data = {
  from: "Zachary Ernst <zernst3@live.com>",
  to: "zernst3@live.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomness!",
};

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.post("/", (req, res) => {
  // mg.messages().send(data, function (error, body) {
  //   if (error) {
  //     console.log(error);
  //     res.send("Error");
  //   } else {
  //     console.log(body);
  //     res.send("Success");
  //   }
  // });
  console.log(req.body);
  setTimeout(() => {
    res.send("Success");
  }, 10000);
});

app.listen(PORT, () => console.log(`Email app listening on port ${8080}!`));
