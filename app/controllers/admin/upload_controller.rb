class Admin::UploadController < Admin::AdminController#ApplicationController
  layout 'blank'
  before_filter :require_user

  def index
  end

  def upload
      @errors=""
      @message=""
      @id = params[:id]
      if params[:doctor] != nil && params[:doctor][:video_code] != nil
	upload = params[:doctor][:video_code]
	if !(upload.content_type == "video/x-flv" || upload.content_type == "video/x-m4v")
	  @message += "The uploaded file is not of the correct format. Please upload a Flash video (.flv) file."
	  @errors="X"
	else
	  filename = params[:id]+ "_video.flv"
	  path = File.join("public/images/uploads", filename)
	  path2 = File.join("/images/uploads", filename)
	  File.open(path, "wb") { |f| f.write(upload.read) }
	  @message += "The file was successfully uploaded."
	  #"The selected file [<i>" + upload.original_filename + "</i>] uploaded successfully"
	  #"<a href='"+path2+"'>https://www.healthyprice.com"+path2+"</a>"
	  @errors=""
	  sql = "UPDATE doctors SET video_code='Show' WHERE id = " + params[:id]
	  ActiveRecord::Base.connection.execute(sql)
	  #"File upload completed"
	end
      else
	@message += "Please select a Flash video file (.flv) for upload."
	@errors="X"
      end
  end

  def upload_pdf
      @errors=""
      @message=""
      @id = params[:id]
      if params[:doctor] != nil && params[:doctor][:pdf_doc] != nil && params[:upload] != nil
	upload = params[:doctor][:pdf_doc]
	if !(upload.content_type == "file.application/pdf" || upload.content_type == "application/pdf")
	  @message += "The uploaded file is not of the correct format. Please select a PDF file (.pdf) for upload." + upload.content_type
	  @errors="X"
	else
	  filename = params[:id]+ "_document.pdf"
	  path = File.join("public/download/practice_area_documents", filename)
	  path2 = File.join("/download/practice_area_documents", filename)
	  File.open(path, "wb") { |f| f.write(upload.read) }
	  @message += "The file was successfully uploaded."
	  @errors=""
	end
      elsif params[:id] != nil && params[:delete] != nil
	  filename = params[:id]+ "_document.pdf"
	  path = File.join("public/download/practice_area_documents", filename)
	  File.unlink(path)
	  @message += "The file was deleted."
      else
	@message += "Please select a PDF file (.pdf) for upload."
	@errors="X"
      end
  end

end
