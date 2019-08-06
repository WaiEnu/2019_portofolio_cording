
var pageMax = 5;
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
var set_favorite_pages = function(item){
	localStorage.setItem('favorite_pages',JSON.stringify(item));
};
var favorite_pagesPush = function(favorite_pages,favorite_pages_start,except){
	if(!$.isEmptyObject(favorite_pages_start)){
		for(i=0;i<favorite_pages_start.length;i++) {
			if(favorite_pages_start[i] && favorite_pages_start[i].id !== except){
				favorite_pages.push(favorite_pages_start[i]);
			}
		}
	}
};
var set_listitem = function(favorite_page){
	var textlist = $('<li></li>');
	var thumb = $('<img/>',{
			src:favorite_page.thumb,
			width: "50px",
			height: "auto",
			class: "thumb"
	});
	var label = $('<span></span>',{
		class: "list "+favorite_page['label']
	});
	var textdata = $('<a></a>',{
		href: favorite_page.url,
		text: favorite_page.title
	});
	var removedata = $('<button></button>',{
		id: favorite_page.id,
		text: "お気に入りから削除する",
		class: "btn-primary btn removedata"
	});
	textlist.html(thumb);
	textlist.append(label);
	textlist.append(textdata);
	textlist.append(removedata);
	return textlist;
};
var setFavorites = function(favorite_pages){
	var listclass = 'viewhistory';
	var listdata = $("<ul></ul>",{
		class: listclass
	});
	$("#favoritelist").append(listdata);
	for(i=0;i<last(favorite_pages,pageMax);i++){
		$("#favoritelist ul").append(set_listitem(favorite_pages[i]));
	}
};

function displayFavorites(){
	var favorite_pages = get_favorite_pages();
	$("#favoritelist").text('');
	if(!$.isEmptyObject(favorite_pages)){
		setFavorites(favorite_pages);
	} else {
		$("#favoritelist").text("お気に入りはありません。");
	}
}

$(document).on("click", ".removedata", function(){
	var favorite_pages_start = get_favorite_pages();
	var favorite_pages_prev = [];
	var $id = $(this).attr("id");
	favorite_pagesPush(favorite_pages_prev,favorite_pages_start,$id);
	set_favorite_pages(favorite_pages_prev);
	displayFavorites();
});

$(document).ready(function(){
	displayFavorites();
});