/**
 * Created by user on 26/4/2017.
 */


/*
 * @author: lmarin
 * @description: permite crear los elementos que se usaran para inicializar la pagina web
 * */
var AppInit;

AppInit = (function($, window){

    var init = function(options) {
        menu_dialog();
    };

    var menu_dialog = function(){
        $(function(){
            $("button.footer-btn").click(function(){
                $('.footer-bar-main-button').trigger('click');
            });
            $(".overlay").click(function(){
                $('.footer-bar-main-button').trigger('click');
            });
        });
    };

    /**
     * @author: lmarin
     * permite mostrar el contenido de una seccion de carrito
     * */
    var show_hide = function(){
        var img_up = "images/svg-icons-2/up.svg",
        img_down = "images/svg-icons-2/down.svg";
       $(".down-up").click(function(){
           //show
          if ($(this).attr("src") === img_up){
              $(this).attr("src",img_down);
              $(this).parents(".row-content:eq(0)")
                  .find(".content-show").show();
          } else {
              //hide
              $(this).attr("src",img_up);
              $(this).parents(".row-content:eq(0)")
                  .find(".content-show").hide();
          }
       });
    };

    var bas_2 = function(){
        var div_bach = $("div.bas-hist");
        var link_bach = $(".more-download-button");
        div_bach.click(function(){
            $(this).hide();
        });
        link_bach.click(function(){
           $(this).parent().find("div.bas-hist").show();
        });
    };

    var bas = function(){
        var _old_center_width = "68%";
        var _old_right_width = "2%";

        var _new_center_width = "30%";
        var _new_right_width = "40%";

        $(".right-section2-B").click(function(){
            var _parent_div =  $(this).parent("div:eq(0)");
            if (_parent_div.hasClass("active")){
                //_parent_div.find(".right-section2").css({"width":_old_center_width});
                $(this).css({"width":_old_right_width});
                $(this).find("img").hide();
                _parent_div.removeClass("active");

            } else {
               // _parent_div.find(".right-section2").css({"width":_new_center_width});
                $(this).css({"width":_new_right_width});
                $(this).find("img").show();
                _parent_div.addClass("active");
            }
        });
    };

    return {
        init: init,
        show_hide : show_hide,
        bas : bas,
        bas_2 : bas_2
    };

})(jQuery,window);
