$(function() {
	$('#slides').append('<ul id="pager"><li><a href="#" class="prev"><</a></li><li><a href="#" class="next">></a></li></ul><div id="nav"></div>');
	var $pager = $('#pager'),
		$slidesWrap = $('#slides'),
		$nav = $('#nav'),
		$slides = $('#inner'),
		$slideImg = $slides.find('.slide'),
		current = 0,
		number = $slideImg.length;

	$slideImg.each(function(i) {
		$(this).css({
			left: '100' * i + '%'
		});
		$nav.append('<a href="#"></a>');
	});

	function navUpdate() {
		$nav.find('a').removeClass('active');
		$nav.find('a').eq(current).addClass('active');
	}

	function slider(index) {
		if (index < 0) {
			index = number - 1;
		}
		if (index > number - 1) {
			index = 0;
		}
		$slides.animate({
			left: '-100' * index + '%'
		});
		current = index;
		navUpdate();
	}

	$pager.find('a').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('prev')) {
			slider(current - 1);
		} else {
			slider(current + 1);
		}
	});

	$nav.find('a').click(function(event) {
		event.preventDefault();
		var navIndex = $(this).index();
		navUpdate();
		slider(navIndex);
	});

	var start;

	function timerStart() {
		start = setInterval(function() {
			slider(current + 1);
		}, 5000);
	}

	function timerStop() {
		clearInterval(start);
	}

	slider(current);

	timerStart();

	$slideImg.on({
		mouseover: timerStop,
		mouseout: timerStart
	});
});