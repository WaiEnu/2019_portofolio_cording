'use strict';

var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;
var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet && isSmartPhone && isAndroidChrome;
var isPC                 = !isMobile;

var breakPoint           = 768;
var currentWidth = window.innerWidth;

$(document).on('ready', function(){

var $window = $(window);

imageFullBg();
if(isPC || $window.width() >= breakPoint){
	parallaxBg();
}
var tmvTimer2 = false;
$(window).resize(function(){
	if(tmvTimer2 !== false){
		clearTimeout(tmvTimer2);
	}
	tmvTimer2 = setTimeout(function() {
		topMainVisualHeight();
	}, 200);
});
topMainVisualHeight();

var tmvInitFlg = false;
var tmvElm = $('.slider').children('li');
var tmvTxtElm = $('.main-txt02');
var tmvLen = tmvElm.length - 1;
var tmvCount0 = 0;
var tmvCount0_2 = 0;
var tmvCount1 = 0;
var tmvCount2 = 1;
/* top main visual animation */
function topMainVisual(){
	tmvTxtElm.removeClass('top-main-txt-init');
	tmvTxtElm.removeClass('top-main-txt-end');
	tmvTxtElm.removeClass('top-main-txt-next');
	tmvTxtElm.removeClass('top-main-txt-show');
	tmvElm.removeClass('top-main-active_next');
	tmvElm.eq(tmvCount1).addClass('top-main-active').stop(true,true).queue(new Function).delay(1500).queue( function(){
		if(tmvInitFlg){
			tmvElm.removeClass('top-main-init');
			tmvElm.eq(tmvCount0).removeClass('top-main-active');
			tmvCount0++;
		}
	}).dequeue();
	if(tmvInitFlg){
		tmvTxtElm.eq(tmvCount0_2).addClass('top-main-txt-show').stop(true,true).queue(new Function).delay(1000).queue( function(){
			$(this).addClass('top-main-txt-end');
			tmvTxtElm.eq(tmvCount0_2).addClass('top-main-txt-next');
		}).dequeue();
		tmvCount0_2++;
	} else {
		$(tmvTxtElm).eq(0).addClass('top-main-txt-init');
	}
	tmvElm.eq(tmvCount2).addClass('top-main-active_next');
	tmvCount1++;
	tmvCount2++;
	if(tmvCount0 > tmvLen){
		tmvCount0 = 0;
	}
	if(tmvCount0_2 > tmvLen){
		tmvCount0_2 = 0;
	}
	if(tmvCount1 > tmvLen){
		tmvCount1 = 0;
	}
	if(tmvCount2 > tmvLen){
		tmvCount2 = 0;
	}
}
var tmvTimer = setInterval(function(){
	tmvInitFlg = true;
	topMainVisual();
}, 6000);
topMainVisual();

$(window).on('load scroll',function(){
	$(".no-over").each(function(){
		var animePos = $(this).offset().top;
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if(scroll > animePos - windowHeight + windowHeight/50){
			$(this).removeClass('no-over').addClass('is-over');
			$('.is-over').removeClass('is-over').addClass('is-end');
			setTimeout(function(){
				$('.is-end span.txt-wrp, .is-end span.image-wrp').css({
					"opacity": "1",
					"transition": "all .4s",
					"transition-timing-function": "ease-in-out"
				});
			}, 700);
		}
	});
});

});//End -> ready method

/* top main visual height */
function topMainVisualHeight(){
	var winH = $(window).height();
	setTimeout(function(){
		var headerH = $('header').height();
		var tmvH = 800;
		if(winH < tmvH){ tmvH = winH - headerH; }
		$('#mv .box-image').height(tmvH);
		$('#mv .slider').height(tmvH);
		$('#mv .slider li').height(tmvH);
		$('#mv .slider-inner-wrp').height(tmvH);
	}, 500);
}

function imageFullBg(){
	$('.js-fullbg').each(function(){
		var img = $(this).children('img'),
			imgSrc = img.attr('src');
		img.hide();
		if($(this).parent().hasClass('image-wrp')){
			$(this).css("display", "inline-block");
		}
		$(this).css({
			'background' : 'url('+ imgSrc +')',
			'background-size' : 'cover',
			'background-position' : 'center',
		});
		$(this).show(0);
	});
}

function parallaxBg(){
	$('.js-parallax-bg').each(function(index){
		var $self = $(this);
		var offsetPositions = $self.offset();
		$(window).on('resize scroll', function(){
			if(($(window).scrollTop() + $(window).height()) > offsetPositions.top && ((offsetPositions.top + $self.height()) > $(window).scrollTop())){
				var offsetY = $(window).scrollTop() - offsetPositions.top;
				var self_height = $self.height();
				var calc_height = 50 - (((offsetY) / 3) / self_height * 100);
				if(calc_height <= 100){
					var positions = '50%' + calc_height + '%';
				} else {
					var positions = '50%100%';
				}
				$self.css('backgroundPosition', positions);
				var item_calc_height = 50 - ((offsetY / 12) / self_height * 100);
				var item_position = 100 - item_calc_height;
				$self.closest('.box-main-image').find('.js-parallax-item').css("top", item_position + '%');
			}
		});
	});
}