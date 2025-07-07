// server.js auf Render
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/proxy", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send("Missing URL");

  try {
    const response = await fetch(targetUrl, {
      headers: { "X-Auth-Token": process.env.API_KEY }
    });
    const data = await response.json();

    // CORS erlauben
    res.set("Access-Control-Allow-Origin", "*");
    res.json(data);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, () => {
  console.log("Proxy server running on port", PORT);
});
