var root='https://waienu.github.io/2019_portofolio_cording/ajax-favo/';
var pageMax = 5;
var get_favorite_pages = function(){
	var out = [];
	var item = JSON.parse(localStorage.getItem('favorite_pages'));
	if(!$.isEmptyObject(item)){ out = item; }
	return out;
};
var set_favorite_pages = function(item){
	localStorage.setItem('favorite_pages',JSON.stringify(item));
};
var favorite_pagesPush = function(favorite_pages,favorite_pages_start,except){
	if(!$.isEmptyObject(favorite_pages_start)){
		for(i=0;i<favorite_pages_start.length;i++){
			if(favorite_pages_start[i] && favorite_pages_start[i].id !== except){
				favorite_pages.push(favorite_pages_start[i]);
			}
		}
	}
};
var addtoFavorite = function($div){
	$div.find(".btnlist .fav").html('<a href="javascript:void(0)" class="btn favorite remove">★</a>');
};
var removeFavorite = function($div){
	$div.find(".btnlist .fav").html('<a href="javascript:void(0)" class="btn favorite addto">☆</a>');
};
var get_favorite_pages_addto = function($div){
	var pages_addto = [];
	if(!$.isEmptyObject($div.attr("id")) && !$.isEmptyObject($div.find(".title")) && !$.isEmptyObject($div.find(".image img")) && !$.isEmptyObject($div.find(".label"))){
		var obj_addto = {
			id: $div.attr("id"),
			title: $div.find(".title").text(),
			url: root + $div.find(".title").attr("href"),
			thumb: root + $div.find(".image img").attr("src"),
			thumb_alt: $div.find(".image img").attr("alt"),
			label:$div.find(".label").attr("class"),
			datetime: $.now()
		};
		pages_addto.push(obj_addto);
	}
	return pages_addto;
};

$(document).on("click", ".addto", function(){
	if(!$.isEmptyObject($(this).parents('.card'))){
		var $div = $(this).parents('.card');
		var favorite_pages_start = get_favorite_pages();
		var favorite_pages_addto = get_favorite_pages_addto($div);
		if(!$.isEmptyObject(favorite_pages_addto)){
			if(favorite_pages_start.length >= pageMax){
				alert("お気に入りの登録数の上限に達しました。");
				return;
			} else {
				favorite_pagesPush(favorite_pages_addto,favorite_pages_start,favorite_pages_addto[0].id);
			}
		}
		set_favorite_pages(favorite_pages_addto);
		addtoFavorite($div);
	}
});

$(document).on("click", ".remove", function(){
	if(!$.isEmptyObject($(this).parents('.card'))){
		var $div = $(this).parents('.card');
		var id = $div.attr("id");
		var favorite_pages_start = get_favorite_pages();
		var favorite_pages_remove = [];
		favorite_pagesPush(favorite_pages_remove,favorite_pages_start,id);
		set_favorite_pages(favorite_pages_remove);
		removeFavorite($div);
	}
});/****/

$(document).ready(function(){
	var favorite_pages = get_favorite_pages();
	$(".recommend .card").each(function (index, elem) {
		var selected = false;
		var $div = $(elem);
		var id = $div.attr("id");
		if(!$.isEmptyObject(favorite_pages)){
			for(i=0;i<favorite_pages.length;i++){
				if(!selected && !$.isEmptyObject(favorite_pages[i])){
					if(id === favorite_pages[i]['id']){selected = true;}
				}
			}
		}
		if(selected){
			addtoFavorite($div);
		} else {
			removeFavorite($div);
		}
	});
});