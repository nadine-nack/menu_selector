// server.js
require('dotenv').config({ path: ".env.local" });
const express = require('express');
const app = express();
const port = 3000;

const AnyList = require('anylist');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index', { title: 'My Node.js App', message: 'Hello, World!' });
});

app.get('/api', (req, res) => {
    const anylistUsername = process.env.ANYLIST_USERNAME;
    const anylistPassowrd = process.env.ANYLIST_PASSWORD;

    const anylist = new AnyList({email: anylistUsername, password: anylistPassowrd});

    anylist.login().then(async () => {
        const recipeList = await anylist.getRecipes();
        const collections = await anylist.getCollections();
        anylist.teardown();

        // Serve the HTML file
        res.render('menu', { recipes: recipeList , collections: collections });
    });

});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})