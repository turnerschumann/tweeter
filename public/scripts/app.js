/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 $(document).ready(function() {


const renderTweets = (tweets) => {
  $("#tweet-container").empty();
  tweets.forEach(function(tweet) {
    $tweet = createTweetElement(tweet);
    $('#tweet-container').prepend($tweet);
  });
};

const createTweetElement = (tweetObj) => {
  let name = tweetObj.user.name;
  let avatar = tweetObj.user.avatars.regular;
  let handle = tweetObj.user.handle;
  let text = tweetObj.content.text;
  let time = moment(tweetObj.created_at).fromNow();

  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<header>').addClass('tweet-header');
  let $h3 = $('<h3>').text(handle).addClass('tweet-name');
  let $h2 = $('<h2>').text(name).addClass('tweet-handle');
  let $img = $ ('<img>').attr("src", avatar).addClass('tweet-avatar');
  let $p = $('<p>').text(text).addClass('tweet-text');
  let $footer = $('<footer>').addClass('tweet-footer');
  let $span = $('<span>').text(time).addClass('tweet-time');
  let $body = $('<div>').addClass('tweet-body');

  let $thumbs_up = $('<i>').addClass('fas fa-thumbs-up');
  let $flag = $('<i>').addClass('fas fa-flag');
  let $retweet = $('<i>').addClass('fas fa-retweet');
  let $thumbs_div = $('<div>').addClass('thumb-div');
  let $flag_div = $('<div>').addClass('flag-div');
  let $retweet_div = $('<div>').addClass('retweet-div');

  $header.append($img);
  $header.append($h2);
  $header.append($h3);
  $tweet.append($header);
  $body.append($p);
  $tweet.append($body);

  $footer.append($span);

  $flag_div.append($flag);
  $footer.append($flag_div);
  $retweet_div.append($retweet);
  $footer.append($retweet_div);
  $thumbs_div.append($thumbs_up);
  $footer.append($thumbs_div);
  $tweet.append($footer);


  // console.dir("Tweet " + tweet)
  return $tweet;
};

const loadTweets = () => {
  charCounter();
  console.log("charactercounter run")
  $.getJSON("/tweets").done(function (data) {
    renderTweets(data);
  });
};

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
};

const submitForm = () => {
  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    let text = $(this).serialize();
    $(".alert").hide();

    if (tweetValidator(text) === "empty") {
      $(".alert").show();
      $(".alert").text("Tweet is Empty");
      return
    } else if (tweetValidator(text) === "long") {
      $(".alert").show();
      $(".alert").text("Tweet is too long");
      return
    } else {
      console.log("Post attempt")
      $("#new-tweet textarea").val('');

      $.ajax({
        method: "POST",
        url: "/tweets",
        data: text
      })

      loadTweets();

    }
  });
};

const charCounter = () => {
  if($("textarea").val().length === 0) {
    $("#character-counter").html(140);
  }
  $(".new-tweet textarea").on('keyup', function() {
    let counter = $(this).siblings('.counter');
    charactersEntered = $("textarea").val().length
    remaining = 140 - charactersEntered
    $(counter).css({"color":"white"});

    if (remaining < 0) {
      $(counter).css({"color":"red"});
    }

    $(counter).html(remaining);
  });

};

const howLongAgo = (time) => {
  let a = new Date(time * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  // let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  let timeString= "Posted " + month + " " + date;
  return timeString;
};

submitForm();

$("#compose-button").click(function(){
  $(".new-tweet").slideToggle("fast");
  $("textarea").select();
});

loadTweets();

});
