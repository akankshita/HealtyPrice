//SiteSections enum
var currentSection;
var SiteSections = { Home: 'home', ServicesProcedures: 'servicesProcedures', FAQ: 'faq', AboutUs: 'aboutus', Contact: 'contact'};

$(function(){
	$.fn.colorbox.settings.opacity = "0.7";
	$.fn.colorbox.settings.close = "CLOSE X";
	$.fn.colorbox.settings.title = "";

	$.fn.healthybox = function(options, custom_callback) {
		this.colorbox(options, custom_callback);
	}

	$('div.footerbox').equalHeights();

	$('span.ss_help').tooltip();
	
	if (currentSection!=undefined) $('#header_large_nav a#' + currentSection).addClass("active");
});

showMap = function(address,label) {
	var url ="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=" + escape(address) + "(" + escape(label) + ")&amp;ie=UTF&amp;z=14&amp;iwloc=A&amp;output=embed";
	//document.location=url;
	$.fn.healthybox({href:url, width: '50%', height: '80%', open:true, iframe:true});
}

bindHealthyBox = function() {
	$("a.healthybox").healthybox({width: '50%'},bindHealthyBox);
}

$(function(){
	bindHealthyBox();
});

