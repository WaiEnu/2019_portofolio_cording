(function(win, doc) {
"use strict";

const rabbit_cvs = document.getElementById('dahune');
const rabbit_ctx = rabbit_cvs.getContext('2d');
const rabbit_flame = [
		'img/usa_flame1.png',
		'img/usa_flame2.png',
		'img/usa_flame3.png',
		'img/usa_flame4.png',
		'img/usa_flame3.png',
		'img/usa_flame2.png'
	];

const moon_cvs = document.getElementById('moon');
const moon_ctx = moon_cvs.getContext('2d');
const moon_flame = 'img/moon.png';

const star_cvs = document.getElementById('star');
const star_ctx = star_cvs.getContext('2d');
const star_flame = 'img/starlight.png';

var canvasSize = 400;
var _canvasReset = function(cvs){
cvs.width = canvasSize;
cvs.height = canvasSize;
}

var imgList = [],
		frame_length = rabbit_flame.length,
		count = 0,
		i = 0;

document.addEventListener("DOMContentLoaded",function(){
	moonSet();
	starSet();
	animate();
});

function moonSet(){
	_canvasReset(moon_cvs);
	drawMoon();
};
function drawMoon(){
	var image = new Image();
	image.src = moon_flame;
	image.onload = function(){
		moon_ctx.drawImage(image, 0, 0);
	}
	setInterval(_shake, 30000);
}
function _shake() {
	moon_cvs.animate([
		{transform: 'rotate(0deg)'},
		{transform: 'rotate(-10deg)'}
	],{
		duration: 15000
	});
}

function starSet(){
	_canvasReset(star_cvs);
	drawStar();
};
function drawStar(){
	var image = new Image();
	image.src = star_flame;
	image.onload = function(){
		star_ctx.drawImage(image, 0, 0);
	}
	setTimeout(_twincle, 2000);
}
function _twincle(){
	star_cvs.animate([
		{ opacity: 0.0125 },
		{ opacity: 1.0 }
	], {
		duration: 4000,
		iterations: Infinity
	});
}

function animate(){
	_canvasReset(rabbit_cvs);
	loop();
}
function loop(){
	for(var i=0;i<frame_length;i++) {
		imgList[i] = new Image();
		imgList[i].onload = _handleLoad;
		imgList[i].onerror = _handleLoad; // 一旦エラーは無視
		imgList[i].src = rabbit_flame[i];
	}
	function _handleLoad() {
		if (++count === frame_length) {
			_draw();
		}
	}
}
function _draw() {
	_canvasReset(rabbit_cvs);
	rabbit_ctx.drawImage(imgList[i], 0, 0);
	i = ++ i % frame_length;
	setTimeout(_draw, 1000/2.5);
}

})(this, document);
