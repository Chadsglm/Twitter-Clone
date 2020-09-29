const URL = "http://localhost:3000/tweets";



const onEnter = (event) => {
  if (event.key == "Enter") {
    getTwitterData();
  }
}

/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
  // const url = "http://localhost:3000/tweets?q=coding&count=10"
  const query = document.getElementById("user-search-input").value;
  // console.log(query);
  if (!query) return;
  const encodedQuery = encodeURIComponent(query); // for Hastag "#"
  const params = `q=${encodedQuery}&count=10`;
  let fullUrl = `${URL}?${params}`

  fetch(fullUrl, {
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then((data) => {
    // console.log(data)
    return buildTweets(data.statuses);
  });
}


/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
  const trendText = e.innerText;
  document.getElementById("user-search-input").value = trendText;
  getTwitterData();
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
  let twitterContent = "";
  tweets.map((tweet) => {
    const createdDate = moment(tweet.created_at).fromNow();
    twitterContent += `
      <div class="tweet-container">
          <div class="tweet-user-info">
              <div class="tweet-user-profile" style="background-image: url(${tweet.user.profile_image_url_https})"></div>
              <div class="tweet-user-name-container">
                  <div class="tweet-user-fullname">${tweet.user.name}</div>
                  <div class="tweet-user-username">@${tweet.user.screen_name}</div>
              </div>
          </div>
    `
    if (tweet.extended_entities
      && tweet.extended_entities.media
      && tweet.extended_entities.media.length > 0) {
      twitterContent += buildImages(tweet.extended_entities.media);
      twitterContent += buildVideo(tweet.extended_entities.media);
    }
    twitterContent += `
          <div class="tweet-text-container">
            <span class="tweet-text">
            ${tweet.full_text}
            </span>
          </div>
          <div class="tweet-date">
            ${createdDate}
          </div>
      </div>
    `
  })
  if (nextPage) {
    document.querySelector('.tweets-list').insertAdjacentHTML('beforeend', twitterContent)
  } else {
    document.querySelector('.tweets-list').innerHTML = twitterContent;
  }
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
  let imagesContent = `<div class="tweet-images-container">`;
  let imagesExist = false;
  mediaList.map((media) => {
    if (media.type == "photo") {
      imagesExist = true;
      imagesContent += `
        <div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>
      `
    }
  })
  imagesContent += `</div>`;
  return (imagesExist ? imagesContent : '');

}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {
  let videoContent = `<div class="tweet-video-container">`;
  let videoExists = false;
  mediaList.map((media) => {
    if (media.type == "video" || media.type == 'animated_gif') {
      videoExists = true;
      const video = media.video_info.variants.find((video) => video.content_type == 'video/mp4');
      const videoOptions = getVideoOptions(media.type);
      videoContent += `
        <video ${videoOptions}>
          <source src="${video.url}" type="video/mp4">
          Your browser does not support HTML5 video.
        </video>
      `
    }
  })
  videoContent += `</div>`;
  return (videoExists ? videoContent : '');
}

const getVideoOptions = (mediaType) => {
  if (mediaType == 'animated_gif') {
    return "loop autoplay";
  } else {
    return "controls";
  }
}