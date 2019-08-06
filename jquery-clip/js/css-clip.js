(function($) {

	var gallery = '.gallery';
	var warpper = '.gallery__wrapper';
	var iamge = 'img.post-image';
	var zoomImg = 'img.zoomImg';
	var galleryInit = function(gallery){
		if (window.matchMedia('(max-width:768px)').matches) {
			$(gallery).css( 'height', '45vmin' );
		}else{
			$(gallery).css( 'height', $(gallery).outerWidth() );
		}
	}
	var gallerySize = function(gallery){
		var gallerySize = setSize(zoomImgSize(gallery), $(gallery).outerWidth());
		return gallerySize - 10;
	};
	var zoomImgSize = function(gallery){
		var zoomIamge = $(gallery).find(zoomImg);
		var zoomIamgesize = setSize($(zoomIamge).width(), $(zoomIamge).height());
		return zoomIamgesize * 0.96;
	};
	function setSize(size1, size2){
		var result = 0;
		if(size2 < size1){
			result = size2;
		}else if(size2 >= size1){
			result = size1;
		}
		return result;
	}

	function adjust(gallery, elem){
		var sec = $(gallery).find(elem);
		var size = gallerySize(gallery);
		$(sec).css({ width:size, height:size });
	}

	$(window).on('load resize', function(){
		galleryInit(gallery);
		adjust(gallery,warpper);
		adjust(gallery,iamge);
	})

})(jQuery);