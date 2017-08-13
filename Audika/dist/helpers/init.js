
var Init;

Init = (function($,window){

    var init = function(){
        slick();
        hoverMenu();
    };

    var slick = function(){
        $('.multiple-items').slick({
            infinite: false,
            slidesToShow: 8,
            slidesToScroll: 8,
            responsive:[
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 8,
                        slidesToScroll: 8,
                        infinite: false
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 6,
                        slidesToScroll: 6,
                        infinite: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        infinite: false,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    };

    var hoverMenu = function(){

    };

    return {
        init: init
    };

})($,window);
