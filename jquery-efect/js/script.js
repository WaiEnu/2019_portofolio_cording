$(function() {

	$(".hover").hover(
		function () {
			$(this).append($('<span class="red"> ***</span>'));
		},
		function () {
			$(this).find("span:last").remove();
		}
	);

	function sayHello(){
		$(".hover").append($('<p class="Hello">Hello?</p>'));
	}

	$(".click").bind('click',sayHello);

	$(".unclick").click(
		function () {
			$(".hover").unbind('click', sayHello)
				.find("p:last").remove();
		}
	);

	$('#panel > dd').hide();
	$('#panel > dt').click(
		function(e){
			$('+dd', this).slideToggle(500);
		}
	);

	$('.toggle1').on('click',
		function(){
			$(this).toggleClass('active');
		}
	);

	$('.toggle2').on('click',
		function(){
			$('.toggle2 p').toggleClass('active')
			if($('.toggle2 p').hasClass('active')){
				$('.toggle2 p').text('HARD');
			}else{
				$('.toggle2 p').text('EASY');
			}
		}
	);

	$('#fade').bind('click',
		function(){
			$("#fadeIn").fadeIn("slow");
			$("#fadeOut").fadeOut("slow");
		}
	);


});
