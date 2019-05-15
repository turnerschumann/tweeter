/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

const renderTweets = (tweets) => {
  tweets.forEach(function(tweet) {
    $tweet = createTweetElement(tweet);
    $('#tweet-container').append($tweet);
  });
}

const createTweetElement = (tweetObj) => {
  let name = tweetObj.user.name
  let avatar = tweetObj.user.avatars.regular
  let handle = tweetObj.user.handle
  let text = tweetObj.content.text
  let time = tweetObj.created_at

  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<header>').addClass('tweet-header');
  let $h3 = $('<h3>').text(handle).addClass('tweet-name');
  let $h2 = $('<h2>').text(name).addClass('tweet-handle');
  let $img = $ ('<img>').attr("src", avatar).addClass('tweet-avatar');
  let $p = $('<p>').text(text).addClass('tweet-text');
  let $footer = $('<footer>').addClass('tweet-footer');
  let $span = $('<span>').text(time).addClass('tweet-time');
  let $body = $('<div>').addClass('tweet-body');

  $header.append($img);
  $header.append($h2);
  $header.append($h3);
  $tweet.append($header);

  $body.append($p);
  $tweet.append($body);

  $footer.append($span);
  $tweet.append($footer);


  // console.dir("Tweet " + tweet)
  return $tweet;
}

function loadTweets() {
  $.getJSON("/tweets").done(function (data) {
    renderTweets(data);
  });
}

loadTweets();

// renderTweets(data);

$("#new-tweet").submit(function(event) {
  console.log("Handler for .submit() called.");
  event.preventDefault();
  let text = $(this).serialize();
  $.ajax({method: post})
});

});
