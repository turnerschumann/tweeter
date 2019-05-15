$(document).ready(function() {


  $(".new-tweet textarea").on('keyup', function() {
    let counter = $(this).siblings('.counter');
    charactersEntered = $("textarea").val().length
    remaining = 140 - charactersEntered
    console.log(charactersEntered);
    console.log($("textarea").val());

    if (remaining < 0) {
      $(counter).css({"color":"red"});
    }

    $(counter).html(remaining);
  });


});
