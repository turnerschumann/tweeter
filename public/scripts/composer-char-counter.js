$(document).ready(function() {


  $("textarea").on('keypress', function() {
    charactersEntered = $("textarea").val().length
    remaining = 139 - charactersEntered
    console.log(remaining);

    $('.counter').html(remaining);
  });


});



