require 'rubygems'
require 'active_record'
include Geokit::Geocoders

class DoctorSection::ProfileController < DoctorSection::DashboardController

	def index
		if current_user == nil
			redirect_to "/user_session/new"
		elsif session[:doctor] == nil
			session[:doctor] = current_user
		end
		##--------------------------------------------------------------------------
		@insurance_carriers = Array.new
		carriers = Specialty.find_by_sql("SELECT insurance_company_name FROM insurance_carriers WHERE doctor_id = " + session[:doctor].id.inspect)
		carriers.each do |carrier|
			@insurance_carriers << carrier.insurance_company_name
		end
		##-------------------------------------------------
		@hospital_affiliations = Array.new
		affiliations = Specialty.find_by_sql("SELECT usage_percentage, hospital FROM hospital_affiliations WHERE doctor_id = " + session[:doctor].id.inspect)
		affiliations.each do |affiliation|
			tmp_array = Array.new
			tmp_array << affiliation.usage_percentage
			tmp_array << affiliation.hospital
			@hospital_affiliations << tmp_array
		end
		@hospital_affiliations << Array.new
		@hospital_affiliations << Array.new
		@hospital_affiliations << Array.new
		##-------------------------------------------------
		@doctor_references = Array.new
		references = Specialty.find_by_sql("SELECT first_name, last_name, phone FROM doctor_references WHERE doctor_id = " + session[:doctor].id.inspect)
		references.each do |reference|
			tmp_array = Array.new
			tmp_array << reference.phone
			tmp_array << reference.first_name
			tmp_array << reference.last_name
			@doctor_references << tmp_array
		end
		@doctor_references << Array.new
		@doctor_references << Array.new
		@doctor_references << Array.new
		@doctor_references << Array.new
		@doctor_references << Array.new
		##--------------------------------------------------------------------------
		@currentTab = "Profile"
		##--------------------------------------------------------------------------
		if params[:doctor] != nil
			tmp_full_address = session[:doctor].full_address
			# Validate
			@error = "<ul>"
			if params[:doctor][:notification_email] == nil || !params[:doctor][:notification_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
				@error += "<li>Please enter a valid Notification email address.</li>"
			else
				session[:doctor].notification_email = params[:doctor][:notification_email]
			end
			if !params[:doctor][:fax].match(/\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
				@error += "<li>Please enter a valid fax number.</li>"
			end
			session[:doctor].fax				= params[:doctor][:fax]
			if params[:doctor][:passwordxxx] != nil || params[:doctor][:verify_passwordxxx] != nil
				if params[:doctor][:passwordxxx] == params[:doctor][:verify_passwordxxx]
					session[:doctor].password = params[:doctor][:passwordxxx]
				else
					@error += "<li>Password Confirmation does not match.</li>"
				end
			end
			session[:doctor].spanish			= params[:doctor][:spanish]!=nil
			session[:doctor].other_languages		= params[:doctor][:other_languages]
			session[:doctor].display_training_to_public	= params[:doctor][:display_training_to_public]!=nil
			session[:doctor].mailing_address		= params[:doctor][:mailing_address]
			session[:doctor].mailing_address2		= params[:doctor][:mailing_address2]
			session[:doctor].mailing_city			= params[:doctor][:mailing_city]
			if !params[:doctor][:mailing_zipcode].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
				@error += "<li>Please enter a valid ZIP in 12345-6789 format (you may enter just the first five digits).</li>"
			end
			session[:doctor].mailing_zipcode		= params[:doctor][:mailing_zipcode]
			session[:doctor].mailing_state		= params[:doctor][:mailing_state]
			if params[:doctor][:website] != nil && params[:doctor][:website] != ""
				@TmpUrl = params[:doctor][:website].gsub("http://", "").gsub("https://", "")
				if !@TmpUrl.match(/^(www).[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix)
					@error += "<li>Please enter your website address in www.yourname.ext format where 'ext' is the domain extension (i.e., com, net, org, biz, etc.).</li>"
				end
				session[:doctor].website		= @TmpUrl
			else
				@TmpUrl = ""
				session[:doctor].website		= @TmpUrl
			end
			@doctor_description = params[:doctor][:description]
			while @doctor_description[@doctor_description.size - 1, 1] == " " || @doctor_description[@doctor_description.size - 1, 1] == "\n" || @doctor_description[@doctor_description.size - 1, 1] == "\r"
				@doctor_description = @doctor_description[0, @doctor_description.size - 1]
			end
			while @doctor_description[0, 1] == " " || @doctor_description[0, 1] == "\n" || @doctor_description[0, 1] == "\r"
				@doctor_description = @doctor_description[1, @doctor_description.size - 1]
			end
			if @doctor_description == "" || @doctor_description == nil
				@error += "<li>Please enter a description of Your Practice.</li>"
				session[:doctor].description			= @doctor_description
			elsif @doctor_description.length > 700
				@error += "<li>You have entered a description longer than 700 characters. Any text after 700 characters will be truncated.</li>"
				session[:doctor].description			= @doctor_description[0, 700].chomp
			else
				session[:doctor].description			= @doctor_description
			end
			if params[:doctor][:payment_method] == nil
				@error += "<li>Please select a payment method.</li>"
			else
				session[:doctor].payment_method = params[:doctor][:payment_method]
			end
			if params[:doctor][:payment_method] == "PayPal"
				if params[:doctor][:paypal_email] == nil || !params[:doctor][:paypal_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@error += "<li>Please enter a valid PayPal email address.</li>"
				else
					session[:doctor].paypal_email = params[:doctor][:paypal_email]
				end
			else
				if params[:doctor][:payee_name] == nil || params[:doctor][:payee_name] == ""
					@error += "<li>Please enter the payee name.</li>"
				end
				session[:doctor].payee_name = params[:doctor][:payee_name]
				#-----------------------------------
				if !params[:doctor][:payee_phone_number].match(/\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
					@error += "<li>Please enter a valid payee phone number.</li>"
				end
				session[:doctor].payee_phone_number = params[:doctor][:payee_phone_number]
				#-----------------------------------
				if params[:doctor][:payee_email_address] == "" || !params[:doctor][:payee_email_address].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@error += "<li>Please enter a valid payee email address.</li>"
				end
				session[:doctor].payee_email_address = params[:doctor][:payee_email_address]
				#-----------------------------------
				if params[:doctor][:payee_address1] == nil || params[:doctor][:payee_address1] == ""
					@error += "<li>Please enter the payee address.</li>"
				end
				session[:doctor].payee_address1 = params[:doctor][:payee_address1]
				#-----------------------------------
				if params[:doctor][:payee_address2] == nil
					@error += "<li>error</li>"
				end
				session[:doctor].payee_address2 = params[:doctor][:payee_address2]
				#-----------------------------------
				if params[:doctor][:payee_city] == nil || params[:doctor][:payee_city] == ""
					@error += "<li>Please enter the city.</li>"
				end
				session[:doctor].payee_city = params[:doctor][:payee_city]
				#-----------------------------------
				if params[:doctor][:payee_state] == nil || params[:doctor][:payee_state] == ""
					@error += "<li>Please enter the state.</li>"
				end
				session[:doctor].payee_state = params[:doctor][:payee_state]
				#-----------------------------------
				if !params[:doctor][:payee_zip].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@error += "<li>Please enter a valid zip code.</li>"
				end
				session[:doctor].payee_zip = params[:doctor][:payee_zip]
				#-----------------------------------
				if params[:doctor][:payee_tax_id_type] == "EIN"
					if !params[:doctor][:payee_tax_id].match(/\b[0-9]{2}-[0-9]{7}\b/)
						@error += "<li>Please enter a valid EIN.</li>"
					end
					session[:doctor].payee_tax_id_type = params[:doctor][:payee_tax_id_type]
				elsif params[:doctor][:payee_tax_id_type] == "SSN"
					if !params[:doctor][:payee_tax_id].match(/\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/)
						@error += "<li>Please enter a valid SSN.</li>"
					end
				session[:doctor].payee_tax_id_type = params[:doctor][:payee_tax_id_type]
				else
					@error += "<li>Please select a tax id type.</li>"
				end
				session[:doctor].payee_tax_id = params[:doctor][:payee_tax_id]
			end
			#--------------------------------------------------------------------------------------------------------
			if params[:doctor][:headshot_photo] == nil
				if params[:doctor][:headshot_photo_missing] == "missing"
					@error += "<li>Please select a photo of yourself to be placed on your profile (it must be a JPEG image with a .jpg file extension).</li>"
				end
			else
				upload = params[:doctor][:headshot_photo]
				if !(upload.content_type == "image/jpe" || upload.content_type == "image/jpeg" || upload.content_type == "image/jpg" || upload.content_type == "image/pjpeg")
					@error += "<li>Please select a photo of yourself to be placed on your profile (it must be a JPEG image with a .jpg file extension). You have selected a(n) " + upload.content_type + " file</li>"
				else
					name =  upload.original_filename
					filename = session[:doctor].id.inspect + "_headshot.jpg"
					path = File.join("public/images/uploads", filename)
					File.open(path, "wb") { |f| f.write(upload.read) }
					filesize = File.size(path)
					if filesize > 307200	#2097152
						File.unlink(path)
						@error += "<li>You have selected image files that exceed the maximum image size of 300KB for your photo. Please reduce the file size of your images and upload them again.</li>"	#The file you have selected is too large. (Larger than 2MB)
					else
						sql = "INSERT INTO doctor_photos(content_type, filename, size, width, height, doctor_id, photo_type) " +
							"VALUES('"+upload.content_type+"', '"+filename+"', "+filesize.inspect+", 150, 75, "+session[:doctor].id.inspect+", 'headshot')"
						ActiveRecord::Base.connection.execute(sql)
					end
				end
			end
			if params[:doctor][:practice_photo] == nil
				if params[:doctor][:practice_photo_missing] == "missing"
					@error += "<li>Please select a photo of your practice to be placed on your profile (it must be a JPEG image with a .jpg file extension).</li>"
				end
			else
				upload = params[:doctor][:practice_photo]
				if !(upload.content_type == "image/jpe" || upload.content_type == "image/jpeg" || upload.content_type == "image/jpg" || upload.content_type == "image/pjpeg")
					@error += "<li>Please select a photo of your practice to be placed on your profile (it must be a JPEG image with a .jpg file extension). You have selected a(n) " + upload.content_type + " file</li>"
				else
					name =  upload.original_filename
					filename = session[:doctor].id.inspect + "_practice.jpg"
					path = File.join("public/images/uploads", filename)
					File.open(path, "wb") { |f| f.write(upload.read) }
					filesize = File.size(path)
					if filesize > 307200	#2097152
						File.unlink(path)
						@error += "<li>You have selected image files that exceed the maximum image size of 300KB for the photo of your practice. Please reduce the file size of your images and upload them again.</li>"	#The file you have selected is too large. (Larger than 2MB)
					else
						sql = "INSERT INTO doctor_photos(content_type, filename, size, width, height, doctor_id, photo_type) " +
							"VALUES('"+upload.content_type+"', '"+filename+"', "+filesize.inspect+", 150, 75, "+session[:doctor].id.inspect+", 'practice')"
						ActiveRecord::Base.connection.execute(sql)
					end
				end
			end
			#--------------------------------------------------------------------------------------------------------
			hospital_affiliations = params[:doctor][:hospital_affiliations]
			sql = "DELETE FROM hospital_affiliations WHERE doctor_id = " + session[:doctor].id.inspect
			ActiveRecord::Base.connection.execute(sql)
			no_of_hospital_affiliations = 0
			@hospital_affiliations = Array.new
			hospital_affiliations.each do |ha|
				tmp_array = Array.new
				ha[1].each do |row|
					tmp_array << row[1]
				end
				tmp_array[0] = tmp_array[0].gsub("%", "")
				@hospital_affiliations << tmp_array
				if tmp_array[1] != ""
					if (tmp_array[0] == tmp_array[0].to_i.inspect) && tmp_array[0].to_i <= 100 && tmp_array[0].to_i > 0
						sql = "INSERT INTO hospital_affiliations(doctor_id, hospital, usage_percentage) " +
							"VALUES(" + session[:doctor].id.inspect + ", '" + tmp_array[1].gsub("'", "''") + "', " + tmp_array[0] + ")"
						ActiveRecord::Base.connection.execute(sql)
						no_of_hospital_affiliations += 1
					else
						@error += "<li>Please enter a valid usage %. (" + tmp_array[1] + " => " + tmp_array[0].to_i.inspect + ")</li>"
					end
				elsif tmp_array[0] != ""
					@error += "<li>Please enter both the hospital name and the usage % or leave both fields blank (however, at least one hospital affiliation is required).</li>"
				end
			end
			if no_of_hospital_affiliations < 1
				@error += "<li>Please enter at least one hospital affiliation.</li>"
			end
			#--------------------------------------------------------------------------------------------------------
			doctor_references = params[:doctor][:doctor_references]
			sql = "DELETE FROM doctor_references WHERE doctor_id = " + session[:doctor].id.inspect
			ActiveRecord::Base.connection.execute(sql)
			no_of_doctor_references = 0
			@doctor_references = Array.new
			doctor_references.each do |dr|
				tmp_array = Array.new
				dr[1].each do |row|
					tmp_array << row[1]
				end
				@doctor_references << tmp_array
				if (tmp_array[0] + tmp_array[1] + tmp_array[2] != "")
					if tmp_array[0] == "" || tmp_array[1] == "" || tmp_array[2] == ""
						@error += "<li>Please enter both the name and phone number for the doctor reference or leave all three fields blank.</li>"
					elsif !tmp_array[0].match(/\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
						@error += "<li>Please enter a valid phone number. (" + tmp_array[0] + ")</li>"
					else
						sql = "INSERT INTO doctor_references(doctor_id, first_name, last_name, phone) " +
							"VALUES(" + session[:doctor].id.inspect + ", '" + tmp_array[1].gsub("'", "''") + "', '" + tmp_array[2].gsub("'", "''") + "', '" + tmp_array[0] + "')"
						ActiveRecord::Base.connection.execute(sql)
						no_of_doctor_references += 1
					end
				end
			end
			#--------------------------------------------------------------------------------------------------------
			if tmp_full_address != session[:doctor].full_address
				location = GoogleGeocoder.geocode(session[:doctor].full_address)
				session[:doctor].lat = location.lat
				session[:doctor].lng = location.lng
			end
			#--------------------------------------------------------------------------------------------------------
			@error += "</ul>"
			@error = @error.gsub("<ul></ul>", "")
			#=======================================
			#if @error == ""
				session[:doctor].save(false)
			#end
			#redirect_to '/doctor_section/profile'
		end
	end

	def save
	end

end