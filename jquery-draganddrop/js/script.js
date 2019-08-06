
var defaultPosiArr,nowDragObj;
$(document).ready(function() {

	$('.drag').draggable({
		stack:'.drop',
		zIndex:35,
 		helper:'clone',
		revert:'invalid'
	});

	$('.drop').droppable({
		accept: '.drag',
		hoverClass: "ui-state-active",
		activeClass: "ui-state-hover",
		drop: function (event, ui) {
			var droppable = $(this);
				var content = droppable.find('.drag');
			if(content.length<1){
				var draggable = ui.draggable;
				draggable.clone().appendTo(droppable);
			}
		}
	});

});
