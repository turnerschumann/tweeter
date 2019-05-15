/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {

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



const tweetData =  {
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
  }

  var $tweet = createTweetElement(tweetData);

  console.log($tweet);
$('#tweet-container').append($tweet);

});
