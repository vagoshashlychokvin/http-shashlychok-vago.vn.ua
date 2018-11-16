//top cart
jQuery(function($){

	//Sticky Menu
	var menu_wrapper = $('#sp-header-wrapper');

	var windowWidth = $(window).width();
	if (windowWidth > 979){
		var stickyNavTop = menu_wrapper.offset().top;

		var stickyNav = function(){
			var scrollTop = $(window).scrollTop() > 100;

			if (scrollTop > stickyNavTop) {
				menu_wrapper.addClass('menu-fixed').fadeIn(400);
			}
			else
			{
				if(menu_wrapper.hasClass('menu-fixed'))
				{
					menu_wrapper.removeClass('menu-fixed').removeAttr('style');
				}

			}
		};

		stickyNav();

		$(window).scroll(function() {
			stickyNav();
		});
	}else{
		menu_wrapper.removeClass('menu-fixed');
	}




	$('body.subpage').css('padding-top', $('#sp-header-wrapper').outerHeight());

	var windowHeight = $(window).height();
	$('#sp-smart-slider.sp-organic-life-layout, .sp-organic-life-layout .sp-slider-item').css('height', windowHeight + 60);

	//Search
	$(".icon-search.top-icon").on('click', function(){
		$(".searchwrapper").fadeIn(400);
	});

	$("#search_close").on('click', function(){
		$(".searchwrapper").fadeOut(400);
	});

	//Shopping cart
	var toggle = $('.icon-shopping-cart'),
	hikashop_cart = $('#hikashop_cart');

	toggle.on('click', function() {
		hikashop_cart.fadeToggle();
	});

	//WOW JS
	var wow = new WOW(
	{
	    boxClass:     'wow',
	    animateClass: 'animated',
	    offset:       0,
	    mobile:       true,
	    live:         true
	}
	);
	wow.init();

});