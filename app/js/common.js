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
		$icon.removeClass('is-active');
	})

})