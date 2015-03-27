var lanfoster = lanfoster || {};

lanfoster.slider = function( options ) {

	var that = this;

	var currentIndex = 0;
	var maxIndex;

	var el;
	var container;

	var slidesContainer;
	var slides = [];	
	var pucesContainer;
	var puces = [];
	var interval;

	var delay 	= 5000;
	var duration = 700;

	var puces_space 	= 30;
	
    if (typeof options.delay != 'undefined') {
      this.delay = options.delay
    }
    if (typeof options.puces_space != 'undefined') {
      puces_space = options.puces_space
    }

    if (typeof options.el != 'undefined') {
      el = options.el
    } else {
    	console.log( 'ERROR, no container defined for lanfoster.slider')
    	return;
    }

			
	this.init = function() {
		container = $('<div></div>').addClass("lanfosterSlider_container").css({ position: "relative"}).appendTo(el);

		slidesContainer = $('<div></div>').addClass("lanfosterSlider_slidesContainer").css({ position: "absolute", overflow: 'hidden'}).appendTo(container);

		pucesContainer = $('<div></div>').addClass("lanfosterSlider_pucesContainer").css({ position: "absolute" }).appendTo(container);

	}

	this.setSlides = function( list ) {
		for( var i= 0; i< list.length; ++i ){
			var slide = $('<div></div>').addClass("lanfosterSlider_slide").css({ position: "absolute", top: 0, left:'100%', width:'100%', height: '100%', 'background-size': 'cover', 'background-position':'center', 'background-image': 'url('+list[i] +')' }).appendTo(slidesContainer);
			slides.push( slide );

			var puce = $('<div></div>').addClass("lanfosterSlider_puce").css({ position: "absolute", top: 0, left: (i*puces_space)+'px' }).appendTo(pucesContainer);
			puce.data('index', i);
			puce.bind('click touchstart', function() {
				that.setSlide( $(this).data('index') );
				that.pause();
			})
			puces.push( puce );
		}
		maxIndex = list.length-1;
		pucesContainer.css({ 'margin-left': (-(maxIndex*puces_space)/2)+'px'});
		puces[0].addClass("active");
		slides[0].css({ left: 0});
	}

	this.setSlide = function(index){
		if( index > currentIndex ) {
			slides[currentIndex].animate({left:'-100%'},duration, 'easeInOutExpo');
			puces[currentIndex].removeClass("active");
			currentIndex = index;
			if( currentIndex > maxIndex) currentIndex = 0;
			slides[currentIndex].css({left: '100%' }).animate({left:0},duration, 'easeInOutExpo');
			puces[currentIndex].addClass("active");
		} else {
			slides[currentIndex].animate({left:'100%'},duration, 'easeInOutExpo');
			puces[currentIndex].removeClass("active");
			currentIndex = index;
			slides[currentIndex].css({left: '-100%' }).animate({left:0},duration, 'easeInOutExpo');
			puces[currentIndex].addClass("active");
		}
	}

	this.nextSlide = function() {
		that.setSlide( currentIndex+1 );
	}

	this.pause = function() {
		clearInterval( interval );
		interval = null;
	}

	this.start = function() {
		interval = setInterval( this.nextSlide, delay )
	}

	this.resume = function() {

	}

	this.init();
	return this;

}