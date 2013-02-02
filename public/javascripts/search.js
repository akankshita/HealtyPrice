var ShowAll = false;

$(document).ready(function(){
	$('input#query').textboxhint({hint: 'search'});
	$('input#query').keyup(
		function() {
			var val = $(this).val();
			setTimeout(function(){updateResults(val)},500);
		}
	);

	$('select#specialty_filter').change(function(){
		updateResultsNow($('input#query').val());
	});

	updateResults($('input#query').val());

});

function updateResults(lastValue) {
	var value = $('input#query').val();
	//works in conjunction with the setTimeout to avoid going to the server if the user is still typing
	if(lastValue == value){updateResultsNow(value);}
}

function updateResultsNow(value) {
	if($('input#query').val() == ""){
		//value = "search";
		//query.value = "search";
		$('input#query').textboxhint({hint: 'search'});
	}
	value = ReplaceAll(value, "/", " ");
	options = {format: 'js', query: value};
	if ($('select#specialty_filter').val()!='')
		$.extend(options,{specialty_id: $('select#specialty_filter').val()})
	var tmp_path = Routing.search_services_path(options);
	tmp_path = ReplaceAll(tmp_path, " ","%20");
	tmp_path = ReplaceAll(tmp_path, ".","%20");
	tmp_path = ReplaceAll(tmp_path, "all//?","all/?");
	$('div#results').load(tmp_path, function(){
		$('span.ss_help').tooltip();
		$('tr.service_tr').click(navigateToService)
	});
}

function ReplaceAll(Input, Find, Replace){
	while(Input.indexOf(Find) > -1){
		Input=Input.replace(Find, Replace);
	}
	return Input;
}

navigateToService = function() {
	var id = $(this).attr("id");
	var Loc = Routing.specialty_service_path({id: id});
	//alert(Loc);
	window.location = Loc;
}