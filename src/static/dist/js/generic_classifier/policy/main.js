ai.OverviewGC = {
    setCallback: function () {
        ai.OverviewGC.setPath();
    },
    setPath: function () {
        console.log("setPath policy");
    },
};


$(function () {
    $(".menu a").click(function(event) {
        // 阻止默認行為
        event.preventDefault();
        
        var target = $(this).attr("href");
        $('.text').animate({
            scrollTop: $(target).offset().top - $('.text').offset().top + $('.text').scrollTop()
        }, 60);

        $(".menu a").removeClass("active");

        $(this).addClass("active");
    });

    function checkActiveMenu(){
        var scrollPosition = $('.text').scrollTop();
        $(".menu a").each(function() {
            var target = $(this).attr("href");
            var targetOffsetTop = $(target).offset().top - $('.text').offset().top;
            var targetHeight = $(target).outerHeight();

            if (scrollPosition >= targetOffsetTop - 25 && scrollPosition < targetOffsetTop + targetHeight - 25) {
                $(".menu a").removeClass("active");
                $(this).addClass("active");
            }
        });
    }

    $('.text').on('scroll', function() {
        checkActiveMenu();
    });
    checkActiveMenu();
});



