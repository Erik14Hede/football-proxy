// server.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // Dein Football-Data.org API Token aus Render Environment

// ✅ Erlaube CORS-Anfragen von allen Domains
app.use(cors());

// 🔁 Proxy-Route
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing target URL.' });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch data from external API.' });
  }
});

// 🟢 Server starten
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
