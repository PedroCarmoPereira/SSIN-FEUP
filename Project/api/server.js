'use strict';

const express = require('express');

// Constants
const PORT = 8010;

// App
const https = require('https')
const app = express();

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

const fs = require('fs')

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
    console.log(`Running on https://localhost:${PORT}`);
})

