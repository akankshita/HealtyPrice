var clicked_button = '';
			function Validate_pdf(form){
				if (clicked_button == "cancel"){
					if (confirm("Are you sure you wish to delete this PDF file?")){
						return true;
					}
					else{
						return false;
					}
				}
				var PDFFileName =form.elements["doctor[pdf_doc]"].value;
				if (PDFFileName == ""){
					alert("Please select a PDF file (.pdf) for upload.");
					return false;
				}
				else if (PDFFileName.substring(PDFFileName.length-4) != ".pdf"){
					if (confirm("The file you have selected does not have a .pdf extension. Are you sure you wish to upload this file?\nThe document format will be checked after upload and the file will be rejected if it is not a PDF document.")){
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
