
    // SNS tab 메뉴
    $(function(){
        var tabs = $('.sns_nav');
        var selector = $('.sns_nav').find('.tab_item').length;
        var activeItem = tabs.find('.on');
        var activeWidth = document.querySelector('.tab_item').offsetWidth;
        $(".slider").css({
        "left": activeItem.position.left + "px", 
        "width": activeWidth + "px"
        });
  
        $(".sns_nav").on("click",".tab_item",function(e){
            e.preventDefault();
            $('.sns_nav .tab_item').removeClass("on");
            $(this).addClass('on');
            var activeWidth = $(this).innerWidth();
            var itemPos = $(this).position();
            $(".slider").css({
                "left":itemPos.left + "px", 
                "width": activeWidth + "px"
            });
        });
  
        $('.sns_nav .tab_item').click(function(){
            var idx = $(this).index();
            $('.sns_nav .tab_item').removeClass('on');
            $(this).addClass('on');
  
            $('.tab_content').removeClass('on');
            $('.tab_content').eq(idx).addClass('on');
        });
      });