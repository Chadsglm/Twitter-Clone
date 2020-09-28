const express = require('express');
const axios = require('axios');


const app = express()
const port = 3000

app.get('/tweets', (req, res) => {
  // console.log(req.query)

  const query = req.query.q;
  const count = req.query.count;
  const TWITTER_URL = "https://api.twitter.com/1.1/search/tweets.json";

  axios.get(TWITTER_URL, {
    params: {
      q: query,
      count: count
    },
    headers: {
      "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAG9qIAEAAAAAL0WiB0AFrH2DhmJIhQhyppZbhWI%3DbhSUTG7FQWEA3650Lse0lcyrFLhqFfglnpc1ljcQWhqwhtkSmW"
    }
  }).then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data);
  }).catch((error) => {
    console.log(error)
    res.status(400).send(error);
  });

  // res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Twitter App listening at http://localhost:${port}`)
})