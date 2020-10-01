const express = require('express');
const Twitter = require('./api/helpers/twitter');
require('dotenv').config()

const app = express()
const port = 3000

const twitter = new Twitter();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());

app.get('/tweets', (req, res) => {
  const query = req.query.q;
  const resultType = req.query.result_type;
  const maxId = req.query.max_id;
  
  twitter.get(query, resultType, maxId).then((response) => {
    res.status(200).send(response.data);
  }).catch((error) => {
    res.status(400).send(error);
  });
})

app.listen(port, () => {
  console.log(`Twitter App listening at http://localhost:${port}`)
})