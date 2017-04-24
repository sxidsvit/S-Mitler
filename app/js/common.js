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

  function carouselEqualHeight(element) {
    $(element).equalHeight({
        resizeTimeout: 50, 
        updateOnDOMLoad: true 
    });
  }

  carouselEqualHeight('.carousel-sevices-content');
  carouselEqualHeight('.carousel-sevices-image');

$('.carousel-sevices').on('initialized.owl.carousel', function(){
      setTimeout(function() {carouselService()}, 100);
    });

 $('.carousel-sevices').owlCarousel({
    loop: true,
    nav: true,
    dots: false, 
    navText: ['<i class = "fa fa-angle-double-left"></i>', '<i class = "fa fa-angle-double-right"></i>'],  
    smartSpeed: 700,
    responsive: {
      0: {items: 1},
      800: {items: 2},
      1100: {items: 3}
    }
   });  

$('.carousel-sevices-composition .h3').each(function() {
  var ths = $(this);
  ths.html(ths.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
});

$('section .h2').each(function() {
  var ths = $(this);
  ths.html(ths.html().replace(/^(\S+)/, '<span>$1</span>'));
});

$('select').selectize();

$('.reviews').owlCarousel({
    loop: true,
    items: 1,
    smartSpeed: 700,
    nav: false,
    autoHeight: true
});

//E-mail Ajax Send
$("form.callback").submit(function() { //Change
  var th = $(this);
  $.ajax({
    type: "POST",
    url: "mail.php", //Change
    data: th.serialize()
  }).done(function() {
    th.find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
    setTimeout(function() {
      th.find('.success').removeClass('active').css('display', 'none').fadeOut();
      th.trigger("reset")
    }, 3000);
  });
  return false;
});

// Resize Window

  window.onresize = function() {
     carouselService();
     carouselEqualHeight('.carousel-sevices-content');
     carouselEqualHeight('.carousel-sevices-image');
} 
      
})  // end $(document).ready( ...