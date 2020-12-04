require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;
const mailgun = require("mailgun-js");
const e = require("express");

const APIKEY = process.env.APIKEY;
const DOMAIN = process.env.DOMAIN;

const mg = mailgun({ apiKey: APIKEY, domain: DOMAIN });

app.get("/", (req, res) => {
  res.send("Server running!");
});

app.post("/", async (req, res) => {
  console.log(req.body);

  const recipientData = {
    from: "Zachary Ernst <zernst3@live.com>",
    to: req.body.email,
    subject: "Thank You for your Email",
    template: "thank_you_email",
    "h:X-Mailgun-Variables": JSON.stringify({
      recipient_name: req.body.name,
    }),
  };

  const myData = {
    from: req.body.email,
    to: "Zachary Ernst <zernst3@live.com>",
    subject: req.body.subject,
    template: "email_to_me",
    "h:X-Mailgun-Variables": JSON.stringify({
      recipient_name: req.body.name,
      text: req.body.message,
      recipient_email: req.body.email,
    }),
  };

  const sendEmails = async () => {
    return new Promise((resolve, reject) => {
      mg.messages().send(recipientData, function (error, body) {
        if (error) {
          console.log(error);
          return reject(error);
        } else {
          console.log(body);
          mg.messages().send(myData, function (error, body) {
            if (error) {
              console.log(error);
              return reject(error);
            } else {
              console.log(body);
              return resolve();
            }
          });
        }
      });
    });
  };

  try {
    await sendEmails();
    console.log("Message Sent!");
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
});

app.listen(PORT, () => console.log(`Email app listening on port ${8080}!`));
