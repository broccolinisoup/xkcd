const express = require('express');

const app = express();
const request = require('request');
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/', function(req, res) {
  let url = "https://xkcd.com/" + req.url;
  req.pipe(request({ url })).pipe(res);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
