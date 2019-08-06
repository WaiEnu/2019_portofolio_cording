// JavaScript Document
$(document).ready(function() {
	var $setElm = $('.ranklet');
	var effectSpeed = 1000;
	var switchDelay = 6000;
	var easing = 'swing';

	$setElm.each(function(){
		var $targetObj = $(this);
		var $targetUl = $targetObj.children('.ranklet-wrapper');
		var $targetLi = $targetObj.find('.ranklet-item');
		var $setList = $targetObj.find('.ranklet-item:first');

		var ulWidth = $targetUl.width();
		var listHeight = $targetLi.height();
		$targetObj.css({height:(listHeight)});
		$targetLi.css({top:'0',left:'0',position:'absolute'});

		var liCont = $targetLi.length;

		$setList.css({left:(ulWidth),display:'block',opacity:'0',zIndex:'98'}).stop().animate({left:'0',opacity:'1'},effectSpeed,easing).addClass('showlist');
		if(liCont > 1) {
			setInterval(function(){
				var $activeShow = $targetObj.find('.showlist');
				$activeShow.animate({left:(-(ulWidth)),opacity:'0'},effectSpeed,easing).next().css({left:(ulWidth),display:'block',opacity:'0',zIndex:'99'}).animate({left:'0',opacity:'1'},effectSpeed,easing).addClass('showlist').end().appendTo($targetUl).css({zIndex:'98'}).removeClass('showlist');
			},switchDelay);
		}
	});
});