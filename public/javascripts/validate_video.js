			function Validate_video(form){
				var VideoFileName =form.elements["doctor[video_code]"].value;
				if (VideoFileName == ""){
					alert("Please select a Flash video file (.flv) for upload.");
					return false;
				}
				else if (VideoFileName.substring(VideoFileName.length-4) != ".flv"){
					if (confirm("The file you have selected does not have the .flv extention. Are you sure that you want to attempt uploading this file.\nHowever, if the video format is not FLV, it will be rejected.")){
						return true;
					}
					else{
						return false;
					}
				}
				else{
					document.getElementById('UploadStatus').innerHTML = "Uploading...";
					//<img src='/images/loading.gif' /> 
					return true;
				}
			}
