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
  // console.log(req.query)

  const query = req.query.q;
  const count = req.query.count;

  // console.log(process.env.TWITTER_API_TOKEN)

  twitter.get(query, count)
    .then((response) => {
      res.status(200).send(response.data);
    }).catch((error) => {
      res.status(400).send(error);
    });
})

app.listen(port, () => {
  console.log(`Twitter App listening at http://localhost:${port}`)
})