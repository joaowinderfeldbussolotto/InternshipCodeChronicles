const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).send('Este é o app Equpe 1 😀');
});



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
