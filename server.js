// server.js
const express = require('express');
const { processPlayerData } = require('./nbaInjuryScraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/playerData', async (req, res) => {
    const { firstName, lastName } = req.body;
    try {
        const playerData = await processPlayerData(firstName, lastName);
        res.json(playerData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
