const express = require('express');
const history = require('connect-history-api-fallback');  
const port = (process.env.PORT || 8080);
const app = express();
app.use(history());
app.use(express.static(__dirname + "/dist/"));
app.listen(port);