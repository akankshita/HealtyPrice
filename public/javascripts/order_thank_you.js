$(function(){
	$('#print_href').click(function(e){
		e.preventDefault(); e.stopPropagation();
		window.print();
	});
});