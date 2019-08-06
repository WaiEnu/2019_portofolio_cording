
var pageMax = 5;
var newsMax = 3;
var last = function(array,cnt){
	var num = array.length;
	if(length>cnt){ num = cnt; }
	return num;
};
var get_favorite_pages = function(){
	var out = [];
	var item = JSON.parse(localStorage.getItem('favorite_pages'));
	if(!$.isEmptyObject(item)){ out = item; }
	return out;
};
var newsList_f = function(data){
	var newsList = [];
	var obj_li = $(data).filter('ul.newslist').children();
	obj_li.each(function(i,elem){
		var obj = $(elem);
		if(!$.isEmptyObject(obj.find('.date').text()) && !$.isEmptyObject(obj.find('.news').text())){
			var news = {
				news_date:obj.find('.date').text(),
				news_cnt:obj.find('.news').text()
			}
			newsList.push(news);
		}
	});
	return newsList;
};
var set_news_ul = function(newsList,url){
	var news_ul = $('<ul></ul>',{
		class: "news"
	});
	for(var i=0; i<last(newsList,newsMax); i++){
		var news_li = $('<li></li>',{
			style: "list-style:none;"
		});
		var news_date = $('<span></span>',{
			text:newsList[i].news_date,
			class: "news_date"
		});
		var link = $('<a></a>',{
			href: url,
			target: "_blank"
		});
		var news_cnt = $('<span></span>',{
			text: newsList[i].news_cnt,
			class: "news_cnt"
		});
		link.html(news_cnt);
		news_li.append(news_date);
		news_li.append(link);
		news_ul.append(news_li);
	}
	return news_ul;
};
var set_listitem = function(listitem,favorite_page){
	var thumb = $('<img/>',{
		src:favorite_page.thumb,
		width: "80px",
		height: "auto",
		class: "thumb"
	});
	var thumb_title = $('<div></div>',{
		text: favorite_page.title,
		class: "thumb_title"
	});
	var label = $('<span></span>',{
		class: "list " + favorite_page.label
	});
	thumb_title.append(label);
	listitem.html(thumb);
	listitem.append(thumb_title);
	return listitem;
};
var getNewsList_f = function(favorite_page,ajaxUrl){
	$.ajax({
		type: 'GET',
		url: ajaxUrl,
		cache: false,
		datatype: 'html',
		data: {name: 'chara'}
	})
	.done(function(data){
		var newsList = newsList_f(data);
		var $list = $('li#'+favorite_page.id);
		if(!$.isEmptyObject(newsList)){
			$list.append(set_listitem($list,favorite_page));
			$list.append(set_news_ul(newsList,favorite_page.url));
		} else {
			$list.remove();
		}
	})
	.fail(function(){ return false;});
};

function displayNews(){
	var favorite_pages = get_favorite_pages();
	$("#newslist_f").text('');
	if(!$.isEmptyObject(favorite_pages)){
		var listclass = 'viewhistory';
		var listdata = $("<ul></ul>",{
			class: listclass
		});
		$("#newslist_f").append(listdata);
		for(var i=0;i<last(favorite_pages,pageMax);i++){
			var list = $('<li></li>',{
				id:favorite_pages[i].id
			});
			$("#newslist_f ul").append(list);
			getNewsList_f(favorite_pages[i],favorite_pages[i].url);
		}
	} else {
		$("#newslist_f").text("お知らせはありません。");
	}
}

$(document).ready(function(){
	displayNews();
});

$(document).ajaxComplete(function() {
	if($.isEmptyObject($("#newslist_f ul").html())){
		$("#newslist_f").html("お知らせはありません。");
	}
});