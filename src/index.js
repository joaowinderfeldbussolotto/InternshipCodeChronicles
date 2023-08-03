const express = require('express');
const app = express();
// Import the config object from config.js
const config = require('./config');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');

// Read the swagger.yaml file
const swaggerDocument = yaml.load(fs.readFileSync('./swagger.yaml', 'utf8'));
let options = { };

app.get('/', (req, res) => {
    res.status(200).send('Este é o app Equipe 1 😀');
});

const jokesRoutes = require('./routes/jokesRoutes');
const activityRoutes = require('./routes/activityRoutes');

app.use('/api/piadas', jokesRoutes);
app.use('/api/atividades', activityRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




app.use((req, res) => {
    res.status(404).json({message: 'Route not found'});
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
