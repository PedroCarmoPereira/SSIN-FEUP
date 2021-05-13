'use strict';

const express = require('express');

// Constants
const PORT = 8010;
const HOST = '0.0.0.0';


// App
const app = express();

require('./routes')(app);

app.listen(PORT, HOST);
console.log(`Running on http://localhost:${PORT}`);
