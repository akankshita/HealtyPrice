$(document).ready(function(){
	var drSearch = getDrSearchDiv();
	drSearch.find('ul#tabs_content li').hide();
	drSearch.find('ul#tabs_content li:first').show();
	drSearch.find('ul#tabs li:first').addClass("active");
	drSearch.find('ul#tabs li').click(showTab);
});

//method enum
var Method = {Redirect: 'redirect', Ajax: 'ajax'};

function showTab(e) {
	stop(e);
	var drSearch = getDrSearchDiv();
	drSearch.find('ul#tabs li.active').removeClass("active");
	$(this).addClass("active");
	var tabIndex = drSearch.find('ul#tabs li').index($(this));
	drSearch.find('ul#tabs_content li:visible').hide();
	document.zipcode_form.zipcode.value="";
	document.city_state_form.city.value="";
	document.city_state_form.state.value="California";
	document.search_doctor_name.doctor_name.value="";
	document.company_form.company.value="";
	return drSearch.find('ul#tabs_content li:eq(' + tabIndex + ')').show();
}

function getDrSearchDiv() {
	return $('div#doctor_search_options');
}

function submitSearchZipcode(e,method) {
	stop(e);
	var drSearch = getDrSearchDiv();
	var zipcode = escape($.trim(drSearch.find('#zipcode_form input#zipcode').val().replace(".","%20").replace("/","%20")));
	if (zipcode!='') {
		var url = Routing.search_doctors_zipcode_path(urlParams({zipcode: zipcode},method));
		url += "&spanish="+spanish;
		doctorSearch(url,method);
	}
}

function submitSearchCityState(e,method) {
	stop(e);
	var drSearch = getDrSearchDiv();
	var city = escape($.trim(drSearch.find('#city_state_form input#city').val().replace(".","%20").replace("/","%20"))); 
	var state = escape(drSearch.find('#state').val());
	if (city!='') {
		var url = Routing.search_doctors_city_path(urlParams({city: city, state: state},method));
		url += "&spanish="+spanish;
		doctorSearch(url,method);
	}
}

function submitSearchDoctorName(e,method) {
	stop(e);
	var drSearch = getDrSearchDiv();
	var query = escape($.trim($('#doctor_name').val().replace(".","%20").replace("/","%20")));
	if (query=='') {
		showAllDoctors(e);
	}
	else{
		var url = Routing.search_doctors_name_path(urlParams({query: query},method));
		url += "&spanish="+spanish;
		doctorSearch(url,method);
	}
}

function showAllDoctors(e){
	stop(e);
	var method = 'ajax'
	var drSearch = getDrSearchDiv();
	var query = 'show_all';
	var url = Routing.search_doctors_name_path(urlParams({query: query},method));
	url += "&spanish="+spanish;
	doctorSearch(url,method);
}

function submitSearchCompany(e,method) {
	stop(e);
	var drSearch = getDrSearchDiv();
	var query = escape($.trim($('#company_form input#company').val().replace(".","%20").replace("/","%20")));
	if (query!='') {
		var url = Routing.search_doctors_company_path(urlParams({query: query},method));
		url += "&spanish="+spanish;
		doctorSearch(url,method);
	}
}

function doctorSearch(url,method) {
	if (method == Method.Ajax) {
		setLoadingModeOn();
		$("#results").load(url,handleDoctorResults);
	} else {
		window.location = url;
	}
}

function setLoadingModeOn() {
	$('<div id="spinner"><img src="/images/spinner.gif"></spinner>').appendTo($('#results'));
	$('#results ul').fadeTo('fast',0.15);
}

function setLoadingModeOff() {
	$('#results ul').fadeTo('fast',1.0);
}

function stop(event) {
	if (event != null && event != undefined) {
		event.preventDefault();
		event.stopPropagation();
	}
}

function urlParams(url_params,method) {
	if (method == Method.Ajax) $.extend(url_params,{format:'js'});
	return url_params;
}