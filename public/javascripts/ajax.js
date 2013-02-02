var xmlhttp, xmlhttp2, xmlhttp3;
var Pages = new Array();
var Destinations = new Array();
var CurDest = '';
var SubmitResultDest = '';

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

//--------------------------------------------------------------------------------------------------------------------------------------------------
//	AJAX Request [GET] and Receive Result

function AjaxLoad_AndShow(Page, Destination, D2){
	AjaxLoad(Page, Destination);
	document.getElementById(D2).style.display = '';
}
function HideElem(id){
	document.getElementById(id).style.display = 'none';
}
function ShowElem(id){
	document.getElementById(id).style.display = '';
}

function AjaxLoad(Page, Destination){
	if(CurDest == ''){
		CurDest = Destination;
		try{
			document.getElementById(CurDest).innerHTML = '<img src="/images/loading.gif" style="vertical-align:middle;">Loading...';
		}catch(e){}
		xmlhttp = MakeXmlHttpRequest();
		xmlhttp.onreadystatechange = ReceiveAjax;
		xmlhttp.open("GET", Page, true);
		xmlhttp.send(null);
		CurPage = Page;
	}
	else{
		Pages.push(Page);
		Destinations.push(Destination);
	}
	//return false;
}

function ReceiveAjax(){
	if (xmlhttp.readyState==4){
		if (xmlhttp.status==200){
			//alert(xmlhttp.responseText);
			document.getElementById(CurDest).innerHTML = xmlhttp.responseText;
			RunScriptsIfFound(xmlhttp.responseText);
		}
		else{
			//alert('Couldn\'t connect to the server');
			document.getElementById(CurDest).innerHTML = "<div style='color:#FF4444;'>Internal Server Error!</div>";
			//document.getElementById(CurDest).innerHTML = "<div style='color:#FF4444; cursor:pointer;' onclick=\"document.getElementById('HiddenError').style.display='';\">Internal Server Error!</div><div id='HiddenError' style='display:none;'>"+xmlhttp.responseText+"</div>";
		}
		CurDest = '';
		if(Pages.length > 0){
			AjaxLoad(Pages[Pages.length-1], Destinations[Destinations.length-1]);
			Pages.pop();
			Destinations.pop();
		}
	}
}

//--------------------------------------------------------------------------------------------------------------------------------------------------
//	AJAX Submit [POST] and Receive Result

function AjaxSubmit(SubmitForm, ElemCount, SubmitTo, Destination){
	var params = '';
	for(Cou = 0; Cou < ElemCount; Cou++){
		params += SubmitForm.elements[Cou].name + '=' + SubmitForm.elements[Cou].value + '&';
	}
	params += 'x=y';
	SubmitResultDest = Destination;
	document.getElementById(SubmitResultDest).innerHTML += '<img src="/images/loading.gif" style="vertical-align:middle;">Sending...';
	xmlhttp2 = MakeXmlHttpRequest();
	xmlhttp2.open("POST", SubmitTo, true);
	xmlhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp2.setRequestHeader("Content-length", params.length);
	xmlhttp2.setRequestHeader("Connection", "close");
	xmlhttp2.onreadystatechange = ReceiveAjaxPost;
	xmlhttp2.send(params);
	return false;
}

function ReceiveAjaxPost(){
	if (xmlhttp2.readyState==4){
		if (xmlhttp2.status==200){
			document.getElementById(SubmitResultDest).innerHTML = xmlhttp2.responseText;
			RunScriptsIfFound(xmlhttp2.responseText);
		}
		else{
			alert('Couldn\'t connect to the server');
		}
		SubmitResultDest = '';
	}
}

function RunScriptsIfFound(AjaxReturn){
	if(AjaxReturn.indexOf('<script>') > -1){
		var P1 = AjaxReturn.indexOf('<script>') + 8;
		var P2 = AjaxReturn.indexOf('</script>');
		setTimeout(AjaxReturn.substring(P1, P2), 200);
		//alert(AjaxReturn.substring(P1, P2));
	}
}

function UpdateRow(RowId, DataArray){
	var Row = document.getElementById(RowId);
	for(var i = 0; i < DataArray.length - 1; i++){
		Row.cells[i].innerHTML = DataArray[i];
	}
}

function InsertRow(Table, DataArray, RowID){
	var Table = document.getElementById(Table);
	var Row = Table.insertRow(Table.rows.length);
	Row.id = RowID;
	Row.className = "AltRowOdd";
	var Cell;
	for(var i = 0; i < DataArray.length; i++){
		Cell = Row.insertCell(i);
		Cell.id = Cell.uniqueID;
		Cell.innerHTML = DataArray[i];
	}
}

function RemoveRow(RowId){
	var Row = document.getElementById(RowId);
	Row.style.display = 'none';
}
