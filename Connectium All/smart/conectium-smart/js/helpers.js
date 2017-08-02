$(document).ready(function(){
	
	//Tabs
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content li').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});

	$('.initial-section-list li').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
	});


});

function redir(elementId,url) {
	$(elementId).attr('href',url);
}