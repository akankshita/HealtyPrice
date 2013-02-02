$(document).ready(function(){
	$('#search_doctor_name').submit(function(e){submitSearchDoctorName(e,Method.Ajax)});
	$('#company_form').submit(function(e){submitSearchCompany(e,Method.Ajax)});
	$('#zipcode_form').submit(function(e){submitSearchZipcode(e,Method.Ajax)});
	$('#city_state_form').submit(function(e){submitSearchCityState(e,Method.Ajax)});
})

handleDoctorResults = function() {
	$('span#no_results').glow();
	// $('#results a').colorbox({href:Routing.search_doctors_name_path({query: 'greg'})});
	$('#results a.dr_map').click(showDrMap);
	$('#results a.dr_more_info').click(showDrMoreInfo);
	//alert('sgfsdhsdgf');
	setLoadingModeOff();
}

showDrMap = function() {
	var address = $(this).parent().find("span.address").text();
	var drname = $(this).parent().find("strong.dr_name").text();
	showMap(address,drname);
	return false;
}

showDrMoreInfo = function() {
	var doctor_id = $(this).attr("rel");
	var url = Routing.doctor_path({id: doctor_id, format: 'js'});
	$.fn.healthybox({href: url, open:true});	//, maxWidth: '50%'
	//alert('dfsdgsdfg');
	return false;
}

// only used when we link to the page with search params 
function submitSearchAuto(type) {
	var searchType = type.replace(/_/,'-');
	var li = $('#' + searchType).eq(0);
	var liContent = showTab.call(li);
	var form = $(liContent).find('form');	
	$(form).submit();
}