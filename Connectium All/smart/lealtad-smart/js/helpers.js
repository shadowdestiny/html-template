$(document).ready(function(){

	// 	CAPA SUPERPOSICIÓN
	$('body').prepend("<div class='overlay'></div>");


	// Loading para precarga de página
	$('.add-loading').prepend("<div class='loading'><img src='images/svg-icons/loading.svg'/></div>");
	
	$(window).load(function() {
		$(".loading").fadeOut();;
	});

	// Utilidad para centrar vertical y horizontalmente un elemento.
	var thisElement = $('.centered');
	var elementwidth = thisElement.width() / 2;
	var elementHeight = thisElement.height() / 2;

	thisElement.css({
		'position':'absolute',
		'left':'50%',
		'top':'50%',
		'margin-top':-elementHeight,
		'margin-left':-elementwidth
	});
  var htmlHeight = $('html').height();
  var mainBarHeight = $('.main-bar').height();
  var floatingBarHeight = $('.floating-bar').height();
  var tabNavHeight = $('.tab-nav').height();
  var profileTabNavHeight = $('.profile-tab-nav').height();
  var footerBarHeight = $('.footer-bar').height();
  var notificationBoxheight = $('.notification-box').height();
  var dynamicHeight = htmlHeight - mainBarHeight - footerBarHeight + 2;
  var dynamicHeight2 = htmlHeight - mainBarHeight - tabNavHeight;
  var dynamicHeight3 = htmlHeight - mainBarHeight;

  // Si se encuentra la barra de tabs y la barra flotantes, se compensa el espacio negativo del contneido central
  $('.main-section').css({paddingTop:profileTabNavHeight});
  if (tabNavHeight & floatingBarHeight != 0) {
  	$('.main-section').css({paddingTop:tabNavHeight});
  }

   //calcula y asigna dinámicamente el alto del main-section cuando el footer-bar es fijo
  $('.footer-bar.fixed').parent(document.body).find('.main-section').height(dynamicHeight);

  //calcula y asigna dinámicamente el alto del menu de categorias
  $('.tab-content .category-menu').css({minHeight:dynamicHeight2});

	// Compensa dinamicamente el espacio negativo que genera la cabecera fija.
	if (notificationBoxheight > 0) {
		notificationBoxheight = notificationBoxheight + 30;
	}
	$('html').css({paddingTop:mainBarHeight + notificationBoxheight});
	var tabNavTopSeparation = mainBarHeight + floatingBarHeight;
	$('.tab-nav').css({top:mainBarHeight});
	$('.notification-box').css({top:mainBarHeight});
	$('.profile-tab-nav').css({top:mainBarHeight});



	//BUSCADOR
	$('.search-button').click(function(){
		$('.search-box').fadeIn('fast');
		$('.input-search').focus();
	});

	$('.close-button').click(function(){
		$(this).parent().fadeOut('fast');
	});
	// 

	// MENÚ PRINCIPAL
	$('.navicon').click(function(){
		$(this).toggleClass('active');
		$('body').toggleClass('no-scroll');
		$('.overlay').toggleClass('cover');
		$('.primary-menu').toggleClass('active');
		if ($('.footer-bar').hasClass("active")){
			null
		} else {
			$('.overlay').toggle();
		}
	});
	// 

	// MENU DETALLE DESCARGA
	$('.footer-bar-main-button').click(function(){
		$(this).toggleClass('active');
		$('.footer-bar').toggleClass('active');
		$('.main-section .info-area-2').fadeToggle();
		if ($('.navicon').hasClass("active")){
			null
		} else {
			$('.overlay').toggle();
		}
	});
	// 


	//Interaccion para los iconos de compartir
	var getShareboxTitle = $('.share-box').attr('data-title');

	$('.share-box').prepend('<div class="share-box-title">'+getShareboxTitle+'</div>');

	$('.share-action-button').click(function(){
		$('.share-box').fadeIn('fast');
	});

	$('.overlay').click(function(){
		$('.share-box').fadeOut('fast');
	});

	$('.share-box .close-button').click(function(){
		$('.share-box').fadeOut('fast');
	});

	var shareBoxHeight = $('.share-box').height();
	var iconHeight = $('.share-box-content > a').height();
	var iconCount = $('.share-box-content > a').length;

	var sbMaxHeight = iconHeight * iconCount;
	$('.share-box').css({maxHeight:sbMaxHeight + (1*iconCount) + 41 });


	//Interacción para boton de favoritos
	//Abre modal para confirmar eliminar favorito
	$('.favorites-list li .button-close').click(function(){
		var href = $(this).attr('url');
		alertify
		.okBtn("Si")
		.cancelBtn("No")
		.confirm("¿Está seguro?", function () {

		    window.location.href = href;
		}, function() {
		    // user clicked "cancel"
		});
	});

	//Abre modal info
	$('.download-list li .info-button').click(function(){
		infoModalTitle = "<div class='info-modal-title'>Detalles</div>";
		infoModalHtml = "<ul class='info-modal'>"
		+"<li>- <b>Nombre: </b>" 		 + "Té verde" + "</li>"
		+"<li>- <b>Fecha: </b>"			 + "14/11/2016" + "</li>"
		+"<li>- <b>Reintentos: </b>" + "3" + "</li>"
		+"</ul>";
		alertify
		.okBtn("Cerrar")
		.alert(infoModalTitle + infoModalHtml, function () {

		}, function() {
		    // user clicked "cancel"
		});
	});

	// Accion para mostrar/ocultar contraseña de un input password
	// OPCION 1
	$('#show-hide-pass-1').click(function () {
	  if ($(this).is(':checked')) {
	    $('#password-1').attr('type', 'text').focus();
	  } else {
	    $('#password-1').attr('type', 'password').focus();
	  }
	});

	// OPCION 2
	// $(".show-hide-pass").mousedown(function(){
	// 	$(this).prev().attr('type','text');
 //  });
 //  $(".show-hide-pass").mouseup(function(){
 //  	$(this).prev().attr('type','password');
 //  	$(this).prev().focus();
 //  });

// Muestra con ajax un preview de la imagen de perfil al cambiarla.
  function PreviewImage(id) {
	  var oFReader = new FileReader();
	  oFReader.readAsDataURL(document.getElementById("uploadImage"+id).files[0]);

	  oFReader.onload = function (oFREvent) {
	      document.getElementById("uploadPreview"+id).src = oFREvent.target.result;
	  };
  }

  $('#uploadImage1').change(function(){
  	PreviewImage(1);
  });


//Efecto de pulsación al estilo material design
  $(".ripple-effect").click(function(e){
    var rippler = $(this);

    if(rippler.find(".ink").length == 0) {
        rippler.append("<span class='ink'></span>");
    }

    var ink = rippler.find(".ink");

    ink.removeClass("animate");

    if(!ink.height() && !ink.width())
    {
        var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
        ink.css({height: d, width: d});
    }

    var x = e.pageX - rippler.offset().left - ink.width()/2;
    var y = e.pageY - rippler.offset().top - ink.height()/2;

    ink.css({
      top: y+'px',
      left:x+'px'
    }).addClass("animate");
  });


  // Interactividad para abrir seccion de cambio de contraseña
  $('#show-change-pass').change(function(){
		if ($(this).is(':checked'))
		{
			$('.change-pass-section').slideDown();
			$(".change-pass-section input[type='password']").prop('disabled', false);
			$("html, body").animate({scrollTop: htmlHeight}, 300);
		} else 
		{
			$('.change-pass-section').slideUp();
			$(".change-pass-section input[type='password']").prop('disabled', true);
		}
  	
  });

  // Ajuste del scroll automático cuando alto del browser es menor al alto del elemento. Aplica para para los access-form 
  $(window).resize(function(){
		var windowHeight = $(window).height();
		var accessFormHeight = $('.access-form').height() + 80;
		if (accessFormHeight >= windowHeight) {
			$('.access-form').addClass('responsive-form');
		} else {
			$('.access-form').removeClass('responsive-form');
		}
	});

  // Asigna alto dinámico al slidernav
	$('.slider-content').height(dynamicHeight3);
	// $('.slider-content').css({'min-height':dynamicHeight3});

	// Interaccion boton inferior flotante

	$('.footer-options-trigger').click(function(){
		$(this).toggleClass('active');
		$('.footer-options').fadeToggle(200);
	});	
});
