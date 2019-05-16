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
}

const createTweetElement = (tweetObj) => {
  let name = tweetObj.user.name
  let avatar = tweetObj.user.avatars.regular
  let handle = tweetObj.user.handle
  let text = tweetObj.content.text
  // let time = tweetObj.created_at;
  let time = howLongAgo(tweetObj.created_at)
  console.log(time);

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
  charCounter();
  console.log("charactercounter run")
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
}

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

}

const howLongAgo = (time) => {
  var a = new Date(time * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = "Posted " + month + " " + date;
  return time;
}

submitForm();

$("#compose-button").click(function(){
  $(".new-tweet").slideToggle("fast");
  $("textarea").select();
});
// tweetValidator();

loadTweets();

// renderTweets(data);

});
