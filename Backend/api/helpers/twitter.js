const axios = require('axios');
const TWITTER_URL = "https://api.twitter.com/1.1/search/tweets.json";

class Twitter {
  get(query, count) {
    return axios.get(TWITTER_URL, {
      params: {
        q: query,
        count: count
      },
      headers: {
        "Authorization": `Bearer ${process.env.TWITTER_API_TOKEN}`
      }
    })
  }

}

module.exports = Twitter;