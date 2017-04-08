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
	$icon.removeClass('is-active');});


  function carouselService() {
    $('.carousel-sevices-item').each(function(){
      var ths = $(this),
          thsh = ths.find('.carousel-sevices-content').outerHeight();
          ths.find('.carousel-sevices-image').css('min-height', thsh);
    });
  }


$('.carousel-sevices').on('initialized.owl.carousel', function(){
      setTimeout(function () {
          carouselService();
          // $(this).equalHeight();
         }, 
        100);
    });

 $('.carousel-sevices').owlCarousel({
    loop: true,
    nav: true,
    dots: false, 
    navText: ['<i class = "fa fa-angle-double-left"></i>', '<i class = "fa fa-angle-double-right"></i>'],  
    smartSpeed: 700,
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

$('.carousel-sevices-content').equalHeight(
  {
    groupByTop: false,
    resizeTimeout: 20, 
    updateOnDOMReady: true, 
    updateOnDOMLoad: true 
  }
);

$('.carousel-sevices-composition .h3').each(function() {
  var ths = $(this);
  ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));

});

      
})  // end $(document).ready( ...


// Resize Window

//   window.onresize = function() {
//     $('.carousel-sevices-content').equalHeight();
// }