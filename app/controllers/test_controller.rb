class TestController < ActionController::Base

	def index
		if params[:Doctors] != nil
			@output = params[:Doctors]
			while @output[@output.size - 1, 1] == " " || @output[@output.size - 1, 1] == "\n" || @output[@output.size - 1, 1] == "\r"
				@output = @output[0, @output.size - 1]
			end
			while @output[0, 1] == " " || @output[0, 1] == "\n" || @output[0, 1] == "\r"
				@output = @output[1, @output.size - 1]
			end
		end
	end

	def upload
	      @errors=""
	      @id = params[:id]
	      if params[:video] != nil
		upload = params[:video]
		if !(upload.content_type == "video/x-flv" || upload.content_type == "video/x-m4v")
		  @errors += "Please select a Flash Video (.flv) file to upload.<br/>"
		else
		  filename = params[:id]+ "_video.flv"
		  path = File.join("public/images/uploads", filename)
		  File.open(path, "wb") { |f| f.write(upload.read) }
		end
	      end
	end

end
