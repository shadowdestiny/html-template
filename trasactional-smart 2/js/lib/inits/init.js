/**
 * Created by user on 26/4/2017.
 */


/*
 * @author: lmarin
 * @description: permite crear los elementos que se usaran para inicializar la pagina web
 * */
var AppInit;

AppInit = (function($, window){

    var popup = function(){
        $(".term-link-transactional").click(function(){
            $("#pop-up-transactional").show();
        });
        $("#pop-up-transactional").click(function(){
            $(this).hide();
        });
    };

    var formDinamicContent = function(){
        $("[fromTitle]").each(function(){
            var fromTitle = jQuery(this).attr("fromTitle");

            $(this).find("input[type='text']:eq(0)").click(function(){
                var input = $(this);
                var to = $("[toTitle='"+fromTitle+"'] td:eq(1) span");

                if (input.attr('placeholder').length > 0)
                    to.text(input.attr('placeholder'));
                input.attr('placeholder',"");
            });
        });
    };

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
        
        $("td.menu-right-transactional").click(function(){
            if ($(this).hasClass("menu-show")){
                $(this).removeClass("menu-show");
                $(this).addClass("menu-hide");
            } else {
                $(this).removeClass("menu-hide");
                $(this).addClass("menu-show");
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

    var tran1 = function(){

        jQuery("#paid_link").click(function(){
            jQuery("#pop-up-transactional").show();
            $("#top-focus").focus();
        });
        jQuery("#btn_comment").click(function(){
            jQuery("#pop-up-transactional").hide();
        });
    };

    return {
        init: init,
        show_hide : show_hide,
        bas : bas,
        bas_2 : bas_2,
        tran1 : tran1,
        formDinamicContent : formDinamicContent,
        popup : popup
    };

})(jQuery,window);
