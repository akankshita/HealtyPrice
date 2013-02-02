var PreviousImageIndex, CurrentImageIndex, NextImageIndex;
var COpacity, WaitRotate, TTransition;
var PreviousImage, NextImage, CurrentImage;

function initialize_imgrotate(){
	CurrentImageIndex = 1;
	PreviousImageIndex = 3;
	COpacity = 1;
	WaitRotate = setTimeout("RotateImg();", 7000);
	GetElem("Slide1").style.zIndex = 3;
	GetElem("Slide2").style.zIndex = 3;
	GetElem("Slide3").style.zIndex = 3;
}

function RotateImgOld(){
	PreviousImage = GetElem("Slide"+PreviousImageIndex);
	PreviousImage.style.opacity = 0;
	PreviousImage.style.MozOpacity = 0;
	PreviousImage.style.filter = "alpha(opacity = 0)";
	PreviousImage.style.zIndex = 2;
	PreviousImageIndex = CurrentImageIndex;
	if (CurrentImageIndex == 3){
		NextImageIndex = 1;
	}
	else{
		NextImageIndex = CurrentImageIndex + 1;
	}
	NextImage = GetElem("Slide"+NextImageIndex);
	NextImage.style.opacity = 0;
	NextImage.style.MozOpacity = 0;
	NextImage.style.filter = "alpha(opacity = 0)";
	FadeInNextImage(0);
	NextImage.style.zIndex = 4;
	CurrentImage = GetElem("Slide"+CurrentImageIndex);
	CurrentImage.style.zIndex = 3;
	CurrentImageIndex = NextImageIndex;
	WaitRotate = setTimeout("RotateImg();", 7000);
}

function RotateImg(){
	PreviousImage = GetElem("Slide"+PreviousImageIndex);
	PreviousImageIndex = CurrentImageIndex;
	if (CurrentImageIndex == 3){
		NextImageIndex = 1;
	}
	else{
		NextImageIndex = CurrentImageIndex + 1;
	}
	NextImage = GetElem("Slide"+NextImageIndex);
	CurrentImage = GetElem("Slide"+CurrentImageIndex);
	CommitRotateImage();
}

function CommitRotateImage(){
	PreviousImage.style.opacity = 0;
	PreviousImage.style.MozOpacity = 0;
	PreviousImage.style.filter = "alpha(opacity = 0)";
	PreviousImage.style.zIndex = 2;
	NextImage.style.opacity = 0;
	NextImage.style.MozOpacity = 0;
	NextImage.style.filter = "alpha(opacity = 0)";
	NextImage.style.zIndex = 4;
	FadeInNextImage(0);
	CurrentImage.style.zIndex = 3;
	CurrentImageIndex = NextImageIndex;
	set_jump_link_styles();
	WaitRotate = setTimeout("RotateImg();", 7000);
}

function FadeInNextImage(Opacity){
	if (Opacity > 99){
		NextImage.style.opacity = Opacity/100;
		NextImage.style.MozOpacity = Opacity/100;
		NextImage.style.filter = "alpha(opacity = " + Opacity + ")";
	}
	else{
		NextImage.style.opacity = Opacity/100;
		NextImage.style.MozOpacity = Opacity/100;
		NextImage.style.filter = "alpha(opacity = " + Opacity + ")";
		TTransition = setTimeout("FadeInNextImage("+(Opacity+10)+");", 100);
	}
}

function GotoSlide(Num){
	clearTimeout(WaitRotate);
	clearTimeout(TTransition);
	if (Num == 1){
		CurrentImageIndex = 1;
		NextImageIndex = 2;
		PreviousImageIndex = 3;
	}
	else if (Num == 3){
		CurrentImageIndex = 3;
		NextImageIndex = 1;
		PreviousImageIndex = 2;
	}
	else{
		CurrentImageIndex = Num;
		NextImageIndex = Num+1;
		PreviousImageIndex = Num-1;
	}
	PreviousImage = GetElem("Slide"+PreviousImageIndex);
	NextImage = GetElem("Slide"+NextImageIndex);
	CurrentImage = GetElem("Slide"+CurrentImageIndex);
	//
	PreviousImage.style.opacity = 0;
	PreviousImage.style.MozOpacity = 0;
	PreviousImage.style.filter = "alpha(opacity = 0)";
	PreviousImage.style.zIndex = 2;
	//
	CurrentImage.style.opacity = 1;
	CurrentImage.style.MozOpacity = 1;
	CurrentImage.style.filter = "alpha(opacity = 100)";
	CurrentImage.style.zIndex = 4;
	//
	NextImage.style.opacity = 0;
	NextImage.style.MozOpacity = 0;
	NextImage.style.filter = "alpha(opacity = 0)";
	NextImage.style.zIndex = 3;
	//
	set_jump_link_styles();
	WaitRotate = setTimeout("RotateImg();", 7000);
}

function set_jump_link_styles(){
	//var tmp;
	//tmp = GetElem("jump_link"+PreviousImageIndex);
	//tmp.style.background="url(images/non_current_slide.jpg)";
	//tmp.style.backgroundColor="#FFFFFF";
	//tmp = GetElem("jump_link"+CurrentImageIndex);
	//tmp.style.background="url(images/current_slide.jpg)";
	//tmp.style.backgroundColor="#DDDDFF";
	//tmp = GetElem("jump_link"+NextImageIndex);
	//tmp.style.background="url(images/non_current_slide.jpg)";
	//tmp.style.backgroundColor="#FFFFFF";
}

function GetElem(id){
	return document.getElementById(id);
}
