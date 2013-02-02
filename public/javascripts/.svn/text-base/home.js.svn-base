$(function(){
	$('#go').click(searchServices);
	
	function searchServices() {
		var query = $('#services-query').val();
		query = query.replace("/", " ");
		query = query.replace("/", " ");
		query = query.replace("/", " ");
		query = query.replace(".", " ");
		query = query.replace(".", " ");
		query = query.replace("  ", " ");
		query = query.replace("  ", " ");
		query = query.replace("  ", " ");
		var url = Routing.search_services_path({query:query});
		//alert(url);
		//return;
		url = url.replace("//", "/");
		window.location = url;
	}
	
	$('#promo-slider').cycle({
		fx: 'fade', // choose your transition type, ex: fade, scrollUp, shuffle, etc...
		timeout: 6000,
		pager: '#promo-slider-pager'
	});

	bindDoctorSearchTabs();
});

function bindDoctorSearchTabs() {
	var drSearch = getDrSearchDiv();
	drSearch.find('#zipcode_form').submit(function(e){submitSearchZipcode(e,Method.Redirect)})
	drSearch.find('#city_state_form').submit(function(e){submitSearchCityState(e,Method.Redirect)});
	drSearch.find('#search_doctor_name').submit(function(e){submitSearchDoctorName(e,Method.Redirect)});
	drSearch.find('#company_form').submit(function(e){submitSearchCompany(e,Method.Redirect)});
}
