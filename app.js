const express = require('express');
const app = express();
const indexRouter = require('./index.js');
const { auth } = require('express-openid-connect');
const path = require('path');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'vBJ6NaX1N23Dcr1qgYKPpLMuE3htVWk423SawPYnSWI0cURUG5Hn0y94jRnLmahCPNzxB8YXr209pimiYioHLlmrQ9gJ7mkABAKb',
    baseURL: 'http://localhost:3000',
    clientID: 'jkH1B1BTNZEOkCPTl3srxtAiEu7tJJTB',
    issuerBaseURL: 'https://boogeraids.eu.auth0.com'
};

const staticPath = path.join(__dirname, "./public"); // defines path to public directory
app.use(express.static(staticPath)); // idk how but this middleware makes it possible to render the files stored in the public directory
app.set('view engine', 'html'); // sets ejs as the view engine to render ejs files in view directory when building the express application from app.js

app.use(auth(config));
app.use('/', indexRouter); // configures (adds) base '/' endpoint from router.js to express app
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.oidc.isAuthenticated();
    next();
}); // makes isAuthenticated value available as a local value to all ejs templates, templates can only be accessed if user is authenticated

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); // duh!