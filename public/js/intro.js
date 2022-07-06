$('.intro1').click(function(){
    var offset = $('#intro_contents').offset();
          
  $('html').animate({scrollTop : offset.top}, 400);});

  $('.intro2').click(function(){
    var offset = $('#intro_time').offset();
        
  $('html').animate({scrollTop : offset.top}, 400);});

  $('.intro3').click(function(){
    var offset = $('#intro_location').offset();
        
  $('html').animate({scrollTop : offset.top}, 400);});


  $('.navTab .introTab').click(function(){
    $('.navTab .introTab').removeClass('introtxt_active');
    $(this).addClass('introtxt_active');
});