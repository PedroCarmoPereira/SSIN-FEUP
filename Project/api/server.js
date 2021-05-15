'use strict';

const express = require('express');

// Constants
const PORT = 8010;
const HOST = '0.0.0.0';


// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Parse incoming requests data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);
