/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {


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

const loadTweets = () => {
  $.getJSON("/tweets").done(function (data) {
    renderTweets(data);
  });
}

const tweetValidator = (input) => {
  char = $(".new-tweet textarea").val().length
  if (char < 1 || char === "" || char === null) {
    let result = "empty";
    return result
  } else if (char > 140) {
    let result = "long";
    return result;
  } else {
    let result = "valid"
    return result
  }
}

const submitForm = () => {
  $("#new-tweet").submit(function(event) {
    console.log("Handler for .submit() called.");
    event.preventDefault();
    let text = $(this).serialize();
    console.log("Validator outcome: " + tweetValidator())

    if (tweetValidator(text) === "empty") {
      alert("Tweet content is empty");
      return
    } else if (tweetValidator(text) === "long") {
      alert("Tweet is too long");
      return
    } else {
      console.log("Post attempt")
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: text
      });
    }
  });
}

submitForm();
// tweetValidator();

loadTweets();

// renderTweets(data);

});
