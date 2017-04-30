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
    responsiveClass: true,
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

$('.partners').owlCarousel({
    loop: true,
    smartSpeed: 700,
    dots: false, 
    nav: true,
    navText: ['<i class = "fa fa-angle-left"></i>', '<i class = "fa fa-angle-right"></i>'],  
    responsiveClass: true,
    responsive: {
      0: {items: 1},
      768: {items: 2},
      992: {items: 3},
      1200: {items: 4}
    }
});

// Resize Window
  window.onresize = function() {
     carouselService();
     carouselEqualHeight('.carousel-sevices-content');
     carouselEqualHeight('.carousel-sevices-image');
} 

// Курсор Наверх
$(window).scroll(function(){
  if ($(this).scrollTop() > $(this).height()) {
    $('.top').addClass('active');
  }
  else {$('.top').removeClass('active');}
});

$('.top').click(function() {
  $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
  });

})  // End document.ready

//E-mail Ajax Send with form validation
$("form.callback").submit(function() { 
 if(validator.form()) {
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
  }
});

// Form validation
 var validator = $('#callback-form').validate({
      rules: {
        Имя: {
          required: true
        },
        Телефон: {
           required: true,
           digits: true
        },
        //   Услуга: {
        //    required: true
        // }
      },

      messages: {
         Имя: {
          required: "Укажите пожалуйста ваше имя"
        },
        Телефон: {
           required: "Укажите пожалуйста ваш телефон",
           digits: "Номер должен содержать только цифры"
        },
        // Услуга: {
        //    required: "Выбирите пожалуйста услугу"
        // }
      }, 

      focusCleanup: true,
      // focusInvalid: false,
      invalidHandler: function(event, validator) {
        $('.callback .form-message').text("Пожалуйста внимательно заполните форму");
      },
      onkeyup: function(element) {
        $('.callback .form-message').text("");
      },
      errorPlacement: function(error, element) {
        return true;
      }
});

// Прелоадер
$(window).on('load', function() {
  $('.preloader').delay(1000).fadeOut('slow');
})