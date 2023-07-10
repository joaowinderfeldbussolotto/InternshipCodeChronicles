const express = require('express');
const axios = require('axios');

const app = express();
const config = require('./config');

app.get('/api/comic', (req,res) => {
    let comicNumber = ''
    let url = `https://xkcd.com/${comicNumber}/info.0.json`
    axios.get(url)
    .then(response => {
        res.json(response.data.img)
    })
})

app.get('/api/gifs', (req, res) => {
    const giphyApiKey = config.giphyApiKey;
    const search = req.query.search || 'cats';

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&limit=3&q=${search}`;
    axios
        .get(url)
        .then(response => {
            const gifData = response.data;
            if (gifData.data.length > 0) {
                const keys = Object.keys(gifData);
                console.log(keys); // Print the keys to the console
                res.json(gifData.data);
            } else {
                res.status(404).json({ message: 'No GIF found' });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
