const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const API_TOKEN = process.env.API_KEY;

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // <<< Das ist der wichtige Header
  res.set('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/proxy', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': API_TOKEN
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed', details: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Proxy läuft auf Port ${PORT}`);
});
