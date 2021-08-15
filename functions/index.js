const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Iv2HbKEiYvGvfnzLIefLpZm5ALAgDb2XJTLC9IRO7CkbA6iNDi3EfpxPnWCGK38JJmdyhp7gcENRFLMftQiCNCx00ZgxyWspr");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request recieved for this amount >>>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
