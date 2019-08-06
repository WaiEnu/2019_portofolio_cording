$(function(){
"use strict";

var $ajaxURLArr = [
	'104/mailcan1810/index.html',
	'104_r2/mailcan1810/index.html',
	'104_r3/mailcan1810/index.html'
];

var setNews = function(ajaxUrl){
	var itemList = [];
	var json = "";
	var url = ajaxUrl;
	$.ajax({
		type: 'GET',
		url:url,
		cache: false,
		datatype: 'html',
		data: {name: 'chara'}
	})
	.done(function(data){
		json = $.parseJSON($(data).find('[type="application/ld+json"]').text());
		itemList = json.itemListElement.filter(function(elem){
			return elem["@type"] === "Notice";
		});
		$(itemList).each(function(i,elem) {
			$('#news-wrap .news').append('<dt>' + elem.item.date + ' : ' + elem.item.title + '</dt><dd>' + elem.item.content + '</dd>');
		});
	})
	.fail(function() { return false; });
}

$('#news-wrap').append('<dl class="news"></dl>');
for(var i = 0;i < $ajaxURLArr.length; i++){
	var count = i;
	setNews($ajaxURLArr[i])
}

});