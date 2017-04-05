$(document).ready(function() {

	$('#my-menu').mmenu(
	{
		extensions: [ 'theme-black', 'fx-menu-slide', 'pagedim-black'],
		navbar: {
			title: '<img src="img/logo-color.svg" alt="Салон красоты Смитлер">'
		},
		offCanvas: {
			"position": "right"
		}
	});

	var api = $('#my-menu').data('mmenu');
	var $icon = $('.hamburger');

	api.bind('open:finish', function() {
	$icon.addClass('is-active');});

	api.bind('close:finish', function() {
	$icon.removeClass('is-active');})


  $('.carousel-sevices').owlCarousel({
  	loop: true,
  	nav: true,
  	smartSpeed: 700,
  	navText: ['<i class = "fa fa-angle-double-left"></i>', '<i class = "fa fa-angle-double-right"></i>'],  
   	responsive: {
   		0: {
   			items: 1
   		},
   		800: {
   			items: 2
   		},
   		1100: {
   			items: 3
   		}
   	}
   });  
      
})