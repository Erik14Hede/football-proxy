const express = require('express');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

app.get('/competitions', async (req, res) => {
    try {
        const response = await fetch('https://api.football-data.org/v4/competitions', {
            headers: { 'X-Auth-Token': process.env.API_KEY }
        });
        const data = await response.json();
        res.set('Access-Control-Allow-Origin', '*');
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy läuft auf Port ${PORT}`));
