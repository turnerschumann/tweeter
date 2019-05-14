$(document).ready(function() {


  $(".new-tweet textarea").on('keypress', function() {
    charactersEntered = $("textarea").val().length
    remaining = 139 - charactersEntered
    counter = $(this).siblings('.counter');
    console.log(counter);

    if (remaining < 0) {
      $(counter).css({"color":"red"});
    }

    $(counter).html(remaining);
  });


});

