/* Function to toggle menubar */
$(function() {
  var menu = $('.navbar-collapse');
  if( window.innerWidth <= 320 ){
       $("body").css( "fontSize", "95%" );
       $("button").css( "fontSize", "85%" );
  }
  if( /iPhone|iPod|iPad/i.test(navigator.userAgent) ){
       $(".btn-quick-guide").css( "display", "none" );
  }

  $('#pull').unbind('click').on('click', function(e) {
	 e.preventDefault();
	 e.stopPropagation();
	 if( menu.hasClass( 'in') ){
		menu.removeClass('collapse in').addClass('collapse');
	 }else{
		menu.removeClass('collapse').addClass('collapse in');
	 }
  });
});
/*
Plugin Name: 	scrollToTop for jQuery.
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		0.1
*/
(function($) {
	$.extend({

		scrollToTop: function() {

			var _isScrolling = false;

			// Append Button
			$("body").append($("<a />")
							.addClass("scroll-to-top")
							.attr({
								"href": "#",
								"id": "scrollToTop"
							})
							.append(
								$("<i />")
									.addClass("icon icon-chevron-up icon-white")
							));

			$("#scrollToTop").click(function(e) {

				e.preventDefault();
				$("body, html").animate({scrollTop : 0}, 500);
				return false;

			});

			// Show/Hide Button on Window Scroll event.
			$(window).scroll(function() {

				if(!_isScrolling) {

					_isScrolling = true;

					if($(window).scrollTop() > 150) {

						$("#scrollToTop").stop(true, true).addClass("visible");
						_isScrolling = false;

					} else {

						$("#scrollToTop").stop(true, true).removeClass("visible");
						_isScrolling = false;

					}

				}

			});

		}

	});
})(jQuery);

/*
Plugin Name: 	afterResize.js
Written by: 	https://github.com/mcshaman/afterResize.js
Description: 	Simple jQuery plugin designed to emulate an 'after resize' event.

*/
( function( $ ) {
	"use strict";

	// Define default settings
	var defaults = {
		action: function() {},
		runOnLoad: false,
		duration: 500
	};

	// Define global variables
	var settings = defaults,
		running = false,
		start;

	var methods = {};

	// Initial plugin configuration
	methods.init = function() {

		// Allocate passed arguments to settings based on type
		for( var i = 0; i <= arguments.length; i++ ) {
			var arg = arguments[i];
			switch ( typeof arg ) {
				case "function":
					settings.action = arg;
					break;
				case "boolean":
					settings.runOnLoad = arg;
					break;
				case "number":
					settings.duration = arg;
					break;
			}
		}

		// Process each matching jQuery object
		return this.each(function() {

			if( settings.runOnLoad ) { settings.action(); }

			$(this).resize( function() {

				methods.timedAction.call( this );

			} );

		} );
	};

	methods.timedAction = function( code, millisec ) {

		var doAction = function() {
			var remaining = settings.duration;

			if( running ) {
				var elapse = new Date() - start;
				remaining = settings.duration - elapse;
				if( remaining <= 0 ) {
					// Clear timeout and reset running variable
					clearTimeout(running);
					running = false;
					// Perform user defined function
					settings.action();

					return;
				}
			}
			wait( remaining );
		};

		var wait = function( time ) {
			running = setTimeout( doAction, time );
		};

		// Define new action starting time
		start = new Date();

		// Define runtime settings if function is run directly
		if( typeof millisec === 'number' ) { settings.duration = millisec; }
		if( typeof code === 'function' ) { settings.action = code; }

		// Only run timed loop if not already running
		if( !running ) { doAction(); }

	};


	$.fn.afterResize = function( method ) {

		if( methods[method] ) {
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else {
			return methods.init.apply( this, arguments );
		}

	};

})(jQuery);
/*
Name: 			Core Initializer
Written by: 	Okler Themes - (http://www.okler.net)
Version: 		2.7.0 - Fri Feb 21 2014 15:44:30
*/
(function() {

	"use strict";

	var Core = {

		initialized: false,

		initialize: function() {

			if (this.initialized) return;
			this.initialized = true;
			this.build();
			this.events();

		},

		build: function() {
			// Adds browser version on html class.
			//$.browserSelector();
			// Adds window smooth scroll on chrome.
			//if($("html").hasClass("chrome")) {
			//	$.smoothScroll();
			//}
			// Scroll to Top Button.
			$.scrollToTop();
			// Featured Boxes
			this.featuredBoxes();
			// Toggle
			this.toggle();

		},

		events: function() {

			// Window Resize
			$(window).afterResize(function() {

				// Featured Boxes
				Core.featuredBoxes();
				// Sticky Menu
				Core.checkStickyMenu();

			});
		},

		stickyMenu: function() {
			if($("body").hasClass("boxed"))
				return false;
			var header = $("body header:first"),
				headerHeight = header.height(),
				logoWrapper = header.find(".logo"),
				logo = header.find(".logo img"),
				logoWidth = logo.width(),
				logoHeight = logo.height(),
				$this = this,
				logoPaddingTop = 28,
				logoSmallHeight = 40;

			logo
				.css("height", logoSmallHeight);

			var logoSmallWidth = logo.width();

			logo
				.css("height", "auto")
				.css("width", "auto");

			var flatParentItems = $("header.flat-menu ul.nav-main > li > a");

			$this.checkStickyMenu = function() {

				if($("body").hasClass("boxed"))
					return false;

				if($(window).scrollTop() > ((headerHeight - 15) - logoSmallHeight) && $(window).width() > 991) {

					if($("body").hasClass("sticky-menu-active"))
						return false;

					logo.stop(true, true);

					$("body").addClass("sticky-menu-active").css("padding-top", headerHeight);
					flatParentItems.addClass("sticky-menu-active");

					logoWrapper.addClass("logo-sticky-active");

					logo.animate({
						width: logoSmallWidth,
						height: logoSmallHeight,
						top: logoPaddingTop + "px"
					}, 200, function() {});

				} else {

					if($("body").hasClass("sticky-menu-active")) {

						$("body").removeClass("sticky-menu-active").css("padding-top", 0);
						flatParentItems.removeClass("sticky-menu-active");

						logoWrapper.removeClass("logo-sticky-active");

						logo.animate({
							width: logoWidth,
							height: logoHeight,
							top: "0px"
						}, 200, function() {

							logo.css({
								width: "auto",
								height: "auto"
							});

						});

					}

				}

			}

			$(window).on("scroll", function() {

				$this.checkStickyMenu();

			});

			$this.checkStickyMenu();

		},
		featuredBoxes: function() {

			$("div.featured-box").css("height", "auto");

			$("div.featured-boxes").each(function() {

				var wrapper = $(this);
				var minBoxHeight = 0;

				$("div.featured-box", wrapper).each(function() {
					if($(this).height() > minBoxHeight)
						minBoxHeight = $(this).height();
				});

				$("div.featured-box", wrapper).height(minBoxHeight);

			});

		},
		toggle: function() {

			var $this = this,
				previewParClosedHeight = 25;

			$("section.toggle > label").prepend($("<i />").addClass("icon icon-plus"));
			$("section.toggle > label").prepend($("<i />").addClass("icon icon-minus"));
			$("section.toggle.active > p").addClass("preview-active");
			$("section.toggle.active > div.toggle-content").slideDown(350, function() {});

			$("section.toggle > label").click(function(e) {

				var parentSection = $(this).parent(),
					parentWrapper = $(this).parents("div.toogle"),
					previewPar = false,
					isAccordion = parentWrapper.hasClass("toogle-accordion");

				if(isAccordion && typeof(e.originalEvent) != "undefined") {
					parentWrapper.find("section.toggle.active > label").trigger("click");
				}

				parentSection.toggleClass("active");

				// Preview Paragraph
				if(parentSection.find("> p").get(0)) {

					previewPar = parentSection.find("> p");
					var previewParCurrentHeight = previewPar.css("height");
					previewPar.css("height", "auto");
					var previewParAnimateHeight = previewPar.css("height");
					previewPar.css("height", previewParCurrentHeight);

				}

				// Content
				var toggleContent = parentSection.find("> div.toggle-content");

				if(parentSection.hasClass("active")) {

					$(previewPar).animate({
						height: previewParAnimateHeight
					}, 350, function() {
						$(this).addClass("preview-active");
					});

					toggleContent.slideDown(350, function() {});

				} else {

					$(previewPar).animate({
						height: previewParClosedHeight
					}, 350, function() {
						$(this).removeClass("preview-active");
					});

					toggleContent.slideUp(350, function() {});

				}

			});

		},
	};

	Core.initialize();

	$(window).load(function () {
		// Sticky Meny
		Core.stickyMenu();

	});
})();
