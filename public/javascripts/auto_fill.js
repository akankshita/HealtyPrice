var AFInitialized = false;
var xmlhttp2;
var Sugg;
var Elem;
var TLeft, TTop;
var HideTimeout;
var SuggestionsList;
var SelectedIndex;

function Initialize(){
	if(AFInitialized)
		return;
	AFInitialized = true;
	Sugg = document.getElementById('Sugesstions');
}

function GetSugesstions(TextField, event){
	Initialize();
	Elem = TextField;
	var PressedKeyCode = GetKeycode(event);
	if(PressedKeyCode == 37 || PressedKeyCode == 38){	// Up
		SuggestionsList = getElementsByClass('Suggestion', Sugg);
		if(SelectedIndex != 0){
			if(SelectedIndex != -1)
				RemoveHighlight(SuggestionsList[SelectedIndex]);
			SelectedIndex -= 1;
			Highlight(SuggestionsList[SelectedIndex]);
			//===================================================
			//FillSuggestion(SuggestionsList[SelectedIndex].meta);//.innerHTML);
			var suggestion = SuggestionsList[SelectedIndex].onclick.toString().replace("\"", "'").replace("\"", "'");
			var p1 = suggestion.indexOf("FillSuggestion('") + 16;
			var p2 = suggestion.indexOf("');");
			suggestion = suggestion.substring(p1, p2);
			FillSuggestion(suggestion);//.innerHTML);
			//===================================================
			if((SelectedIndex) * 20 < Sugg.scrollTop){
				Sugg.scrollTop -= 20;
			}
		}
	}
	else if(PressedKeyCode == 39 || PressedKeyCode == 40){	// Down
		SuggestionsList = getElementsByClass('Suggestion', Sugg);
		if(SelectedIndex != SuggestionsList.length - 1){
			if(SelectedIndex != -1)
				RemoveHighlight(SuggestionsList[SelectedIndex]);
			SelectedIndex += 1;
			Highlight(SuggestionsList[SelectedIndex]);
			//===================================================
			var suggestion = SuggestionsList[SelectedIndex].onclick.toString().replace("\"", "'").replace("\"", "'");
			var p1 = suggestion.indexOf("FillSuggestion('") + 16;
			var p2 = suggestion.indexOf("');");
			suggestion = suggestion.substring(p1, p2);
			FillSuggestion(suggestion);//.innerHTML);
			//===================================================
			if((SelectedIndex+1) * 20 > Sugg.offsetHeight){
				Sugg.scrollTop += 20;
			}
		}
	}
	else if(TextField.value == ""){
		HideSuggestions2();
	}
	else{
		var params = 'context=' + Elem.name + '&query=' + Elem.value;
		xmlhttp2 = MakeXmlHttpRequest();
		xmlhttp2.open("POST", '/autofill/search', true);
		xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp2.setRequestHeader("Content-length", params.length);
		xmlhttp2.setRequestHeader("Connection", "close");
		xmlhttp2.onreadystatechange = ReceiveAjaxPost;
		xmlhttp2.send(params);
	}
}

function GetKeycode(evt){
	return (evt.which) ? evt.which : event.keyCode;
}

function ReceiveAjaxPost(){
	if (xmlhttp2.readyState==4){
		if (xmlhttp2.status==200){
			Sugg.innerHTML = xmlhttp2.responseText;
			findPos(Elem);
			Sugg.style.left = TLeft + 'px';
			Sugg.style.top = TTop + Elem.offsetHeight + 'px';
			Sugg.style.width = Elem.offsetWidth + 'px';
			Sugg.style.height = (Elem.offsetWidth / 2) + 'px';
			SelectedIndex = -1;
			if(Sugg.style.display == 'none')
				Sugg.style.display = '';
		}
		else{}
		SubmitResultDest = '';
	}
}

function FillSuggestion(Text){
	Elem.value = Text;
}

function BindAutoFill(ToElement){
	ToElement.onblur = HideSuggestions;
}

function HideSuggestions(){
	HideTimeout = setTimeout("HideSuggestions2();", 250);
}
function HideSuggestions2(){
	Sugg.style.display = 'none';
}
function CancelHideSuggestions(){
	clearTimeout(HideTimeout);
}

function Highlight(Element){
	Element.style.background = '#DDEEFF';
	//SelectedIndex = Element.id;
}
function RemoveHighlight(Element){
	Element.style.background = '#FFFFFF';
}

function MakeXmlHttpRequest(){
	if (window.XMLHttpRequest){
		return new XMLHttpRequest();
	}
	else if (window.ActiveXObject){
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	else{
		alert("Your browser does not support AJAX!");
	}
}

function getElementsByClass(searchClass, node) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	var els = node.getElementsByTagName("div");
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function findPos(obj){
	var curleft = curtop = 0;
	while(obj != null){
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		obj = obj.offsetParent
	}
	TLeft = curleft;
	TTop = curtop;
}
