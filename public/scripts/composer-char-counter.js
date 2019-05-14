$(document).ready(function() {


  $(".new-tweet textarea").on('keypress', function() {
    charactersEntered = $("textarea").val().length
    remaining = 139 - charactersEntered

    if (remaining < 0) {
      $('.new-tweet .counter').css({"color":"red"});
    }

    $('.new-tweet .counter').html(remaining);
  });


});



