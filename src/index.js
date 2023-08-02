const express = require('express');
const app = express();

// Import the config object from config.js
const config = require('./config');

app.get('/', (req, res) => {
    res.status(200).send('Este é o app Equipe 1 😀');
});

const jokesRoutes = require('./routes/jokesRoutes');

app.use('/api/piadas', jokesRoutes);

app.use((req, res) => {
    res.status(404).json({message: 'Route not found'});
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
