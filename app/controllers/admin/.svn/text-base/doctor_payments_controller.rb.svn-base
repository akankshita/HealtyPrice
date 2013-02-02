include Geokit::Geocoders

class Admin::DoctorPaymentsController < Admin::AdminController

	def details_update
		@record = Doctor.find(params[:id])
		tmp_full_address = @record.full_address

		if params[:delete_video] != nil
			filename = params[:id]+"_video.flv"
			path = File.join("public/images/uploads", filename)
			File.delete(path)
		end
		if params[:show_video] != nil
			sql = "UPDATE doctors SET video_code='Show' WHERE id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
		else
			sql = "UPDATE doctors SET video_code='Hide' WHERE id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
		end


		### Validation Begin
		@errors = ""

		check_duplicate_email = Doctor.find_by_sql("SELECT COUNT(*) as count FROM doctors WHERE id <> " + params[:id] + " AND email = '" + params[:doctor_payment][:email] + "'")
		if params[:doctor_payment][:email]=="" || !params[:doctor_payment][:email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
			@errors += "Please Enter Valid Email. <br/>"
		elsif check_duplicate_email[0].count != "0"
			@errors += "The email address you entered has been registered with another HealthyPrice account. Please enter a unique email address.<br/>"
		else
			@record.email = params[:doctor_payment][:email]
		end
		#--------------------------------------------------------------------------
		if params[:doctor_payment][:password] == ""
			#--
		elsif params[:doctor_payment][:password]!=params[:doctor_payment][:password_confirmation]
			@errors += "Password confirmation does not match. <br/>"
		elsif !params[:doctor_payment][:password].index(/[0-9]/) || !params[:doctor_payment][:password].index(/[a-z]/) || params[:doctor_payment][:password].size < 6
			@errors += "Please enter a valid password. The password must be 6 characters or more in length and contain both letters and numbers.<br/>"
		else
			@record.password = params[:doctor_payment][:password]
		end
		#--------------------------------------------------------------------------
		if params[:doctor_payment][:first_name]==""
			@errors += "The First Name Should not be Blank. <br/>"
		else
			@record.first_name = params[:doctor_payment][:first_name]
		end
		#--------------------------------------------------------------------------
		if params[:doctor_payment][:last_name]==""
			@errors += "The Last Name Should not be Blank. <br/>"
		else
			@record.last_name = params[:doctor_payment][:last_name]
		end
		#--------------------------------------------------------------------------
		#@record.enabled = params[:doctor_payment][:enabled]
		@phone_regex = /\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/
		@record.spanish = params[:doctor_payment][:spanish]!=nil
		@record.use_public_phone_number_in_emails = params[:doctor_payment][:use_public_phone_number_in_emails]!=nil
		@record.display_training_to_public = params[:doctor_payment][:display_training_to_public]!=nil
		@record.other_languages = params[:doctor_payment][:other_languages]
		@record.residency_training = params[:doctor_payment][:residency_training]
		@record.fellowship_training = params[:doctor_payment][:fellowship_training]
		@record.medical_license_type = params[:doctor_payment][:medical_license_type]
		@record.middle_name = params[:doctor_payment][:middle_name]
		@record.title = params[:doctor_payment][:title]
		if params[:doctor_payment][:enabled] == "1"
				if params[:doctor_payment][:notification_email] == "" || !params[:doctor_payment][:notification_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@errors += "Please Enter Valid Notification Email. <br/>"
				else
					@record.notification_email = params[:doctor_payment][:notification_email]
				end
				if !params[:doctor_payment][:date_of_birth].match(/\b(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}\b/)
					@errors += "Please enter a valid date of birth in mm/dd/yyyy format. <br/>"
				else
					@record.date_of_birth = params[:doctor_payment][:date_of_birth]
				end
				if params[:doctor_payment][:phone].match(@phone_regex) == nil
					@errors += "Please enter a valid phone number. <br/>"
				else
					@record.phone = params[:doctor_payment][:phone]
				end
				if params[:doctor_payment][:fax].match(@phone_regex) == nil
					@errors += "Please enter a valid fax Number. <br/>"
				else
					@record.fax = params[:doctor_payment][:fax]
				end
				if params[:doctor_payment][:use_public_phone_number_in_emails] == nil
					if params[:doctor_payment][:public_phone] != "" && params[:doctor_payment][:public_phone].match(@phone_regex) == nil
						@errors += "Please enter a valid public phone number. <br/>"
					else
						@record.public_phone = params[:doctor_payment][:public_phone]
					end
				else
					if params[:doctor_payment][:public_phone].match(@phone_regex) == nil
						@errors += "Please enter a valid public phone number. <br/>"
					else
						@record.public_phone = params[:doctor_payment][:public_phone]
					end
				end
				if params[:doctor_payment][:tax_id_type] == nil
					@errors += "Please select a Tax id Type. <br/>"
				else
					@record.tax_id_type = params[:doctor_payment][:tax_id_type]
					if params[:doctor_payment][:tax_id_type] == "SSN"
						if params[:doctor_payment][:tax_id].match(/\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/) == nil
							@errors += "Please enter a valid SSN. <br/>"
						else
							@record.tax_id = params[:doctor_payment][:tax_id]
						end
					elsif params[:doctor_payment][:tax_id_type] == "EIN"
						if params[:doctor_payment][:tax_id].match(/\b[0-9]{2}-[0-9]{7}\b/) == nil
							@errors += "Please enter a valid EIN. <br/>"
						else
							@record.tax_id = params[:doctor_payment][:tax_id]
						end
					end
				end
				if params[:doctor_payment][:medical_school]==""
					@errors += "Please enter the name of your medical school. <br/>"
				else
					@record.medical_school = params[:doctor_payment][:medical_school]
				end
				if params[:doctor_payment][:type_of_degree]==""
					@errors += "Please enter the type of medical degree. <br/>"
				else
					@record.type_of_degree = params[:doctor_payment][:type_of_degree]
				end
				if params[:doctor_payment][:graduated_year]=="" || !isNumeric(params[:doctor_payment][:graduated_year])
					@errors += "Please enter the year you graduated from medical school. <br/>"
				else
					@record.graduated_year = params[:doctor_payment][:graduated_year]
				end
				if params[:doctor_payment][:medical_license_state]==""
					@errors += "Please select the state that issued your medical license. <br/>"
				else
					@record.medical_license_state = params[:doctor_payment][:medical_license_state]
				end
				if params[:doctor_payment][:license_no]==""
					@errors += "Please enter your medical license number. <br/>"
				else
					@record.license_no = params[:doctor_payment][:license_no]
				end
				if params[:doctor_payment][:company]==""
					@errors += "Please enter the name of your practice. <br/>"
				else
					@record.company = params[:doctor_payment][:company]
				end
				if params[:doctor_payment][:address]==""
					@errors += "Please enter the street address of your practice. <br/>"
				else
					@record.address = params[:doctor_payment][:address]
					@record.address2 = params[:doctor_payment][:address2]
				end
				if params[:doctor_payment][:city]==""
					@errors += "Please enter the city where your practice is located. <br/>"
				else
					@record.city = params[:doctor_payment][:city]
				end
				if params[:doctor_payment][:state]==""
					@errors += "Please enter the state where your practice is located. <br/>"
				else
					@record.state = params[:doctor_payment][:state]
				end
				if !params[:doctor_payment][:zipcode].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@errors += "Please enter a valid ZIP in 12345-6789 format (you may enter just the first five digits). <br/>"
				else
					@record.zipcode = params[:doctor_payment][:zipcode]
				end
				if params[:doctor_payment][:mailing_address]==""
					@errors += "Please enter the mailing street address. <br/>"
				else
					@record.mailing_address = params[:doctor_payment][:mailing_address]
					@record.mailing_address2 = params[:doctor_payment][:mailing_address2]
				end
				if params[:doctor_payment][:mailing_city]==""
					@errors += "Please enter the mailing address city. <br/>"
				else
					@record.mailing_city = params[:doctor_payment][:mailing_city]
				end
				if params[:doctor_payment][:mailing_state]==""
					@errors += "Please enter the mailing address state. <br/>"
				else
					@record.mailing_state = params[:doctor_payment][:mailing_state]
				end
				if !params[:doctor_payment][:mailing_zipcode].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@errors += "Please enter a valid ZIP in 12345-6789 format (you may enter just the first five digits). <br/>"
				else
					@record.mailing_zipcode = params[:doctor_payment][:mailing_zipcode]
				end
				if params[:doctor_payment][:description] == nil
					@doctor_description = ""
				else
					@doctor_description = params[:doctor_payment][:description]
					while @doctor_description[@doctor_description.size - 1, 1] == " " || @doctor_description[@doctor_description.size - 1, 1] == "\n" || @doctor_description[@doctor_description.size - 1, 1] == "\r"
						@doctor_description = @doctor_description[0, @doctor_description.size - 1]
					end
					while @doctor_description[0, 1] == " " || @doctor_description[0, 1] == "\n" || @doctor_description[0, 1] == "\r"
						@doctor_description = @doctor_description[1, @doctor_description.size - 1]
					end
				end
				if @doctor_description == ""
					@errors += "Please enter a description of your practice.<br/>"
				elsif @doctor_description.size > 700
					@errors += "You have entered a description longer than 700 characters. Any text after 700 characters will be truncated. <br/>"
					@doctor_description = @doctor_description[0, 700]
				else
					@record.description = params[:doctor_payment][:description]
				end
				if params[:doctor_payment][:website]!=""
					if  params[:doctor_payment][:website] != "" && !(params[:doctor_payment][:website].match(/^(http|https):\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix) || params[:doctor_payment][:website].match(/^(www).[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix))
						@errors += "Please enter your website address in www.yourname.ext format where 'ext' is the domain extension (i.e., com, net, org, biz, etc.). <br/>"
					else
						@record.website = params[:doctor_payment][:website]
					end
				end
				if !params[:doctor_payment][:insurance_expiry_date].match(/\b(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}\b/)
					@errors += "Please enter a valid malpractice insurance expiration date in mm/dd/yyyy format.<br/>"
				else
					@record.insurance_expiry_date = params[:doctor_payment][:insurance_expiry_date]
				end
				if params[:doctor_payment][:insurance_policy_no]==""
					@errors += "Please enter your Malpractice Insurance Policy Number.<br/>"
				else
					@record.insurance_policy_no = params[:doctor_payment][:insurance_policy_no]
				end
				if params[:doctor_payment][:insurance_carrier]==""
					@errors += "Please enter your Malpractice Insurance Carrier.<br/>"
				else
					@record.insurance_carrier = params[:doctor_payment][:insurance_carrier]
				end
				if params[:doctor_payment][:payment_method] == nil || params[:doctor_payment][:payment_method] == ""
					@errors += "Please select your Payment Method.<br/>"
				else
					@record.payment_method = params[:doctor_payment][:payment_method]
					if params[:doctor_payment][:payment_method] == "PayPal"
						if !params[:doctor_payment][:paypal_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
							@errors += "Please enter your valid PayPal Email address.<br/>"
						else
							@record.paypal_email = params[:doctor_payment][:paypal_email]
						end
					end
				end
				#-----------------------------------------
				if params[:doctor_payment][:payee_name] == nil || params[:doctor_payment][:payee_name] == ""
					@errors += "Please enter the payee name.<br/>"
				else
					@record.payee_name = params[:doctor_payment][:payee_name]
				end
				#-----------------------------------
				if !params[:doctor_payment][:payee_phone_number].match(@phone_regex)
					@errors += "Please enter a valid payee phone number.<br/>"
				else
					@record.payee_phone_number = params[:doctor_payment][:payee_phone_number]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_email_address] == "" || !params[:doctor_payment][:payee_email_address].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@errors += "Please enter a valid payee email address.<br/>"
				else
					@record.payee_email_address = params[:doctor_payment][:payee_email_address]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_address1] == nil || params[:doctor_payment][:payee_address1] == ""
					@errors += "Please enter the payee address.<br/>"
				else
					@record.payee_address1 = params[:doctor_payment][:payee_address1]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_address2] == nil
					@errors += "error<br/>"
				else
					@record.payee_address2 = params[:doctor_payment][:payee_address2]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_city] == nil || params[:doctor_payment][:payee_city] == ""
					@errors += "Please enter the city.<br/>"
				else
					@record.payee_city = params[:doctor_payment][:payee_city]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_state] == nil || params[:doctor_payment][:payee_state] == ""
					@errors += "Please enter the state.<br/>"
				else
					@record.payee_state = params[:doctor_payment][:payee_state]
				end
				#-----------------------------------
				if !params[:doctor_payment][:payee_zip].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@errors += "Please enter a valid zip code.<br/>"
				else
					@record.payee_zip = params[:doctor_payment][:payee_zip]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_tax_id_type] == nil
					@errors += "Please select a tax id type.<br/>"
				else
					@record.payee_tax_id_type = params[:doctor_payment][:payee_tax_id_type]
					@record.payee_tax_id = params[:doctor_payment][:payee_tax_id]
					if params[:doctor_payment][:payee_tax_id_type] == "EIN"
						if !params[:doctor_payment][:payee_tax_id].match(/\b[0-9]{2}-[0-9]{7}\b/)
							@errors += "Please enter a valid EIN.<br/>"
						end
					elsif params[:doctor_payment][:payee_tax_id_type] == "SSN"
						if !params[:doctor_payment][:payee_tax_id].match(/\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/)
							@errors += "Please enter a valid SSN.<br/>"
						end
					end
				end
				if @errors == ""
					@record.signup_step = 9
					@record.current_signup_step = 8
				end
		else
				if params[:doctor_payment][:notification_email] != "" && params[:doctor_payment][:notification_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@record.notification_email = params[:doctor_payment][:notification_email]
				end
				if params[:doctor_payment][:date_of_birth] != "" && params[:doctor_payment][:date_of_birth].match(/\b(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}\b/)
					@record.date_of_birth = params[:doctor_payment][:date_of_birth]
				end
				if params[:doctor_payment][:phone] != "" && params[:doctor_payment][:phone].match(@phone_regex) != nil
					@record.phone = params[:doctor_payment][:phone]
				end
				if params[:doctor_payment][:fax] != "" && params[:doctor_payment][:fax].match(@phone_regex) != nil
					@record.fax = params[:doctor_payment][:fax]
				end
				if params[:doctor_payment][:public_phone] != "" && params[:doctor_payment][:public_phone].match(@phone_regex) != nil
					@record.public_phone = params[:doctor_payment][:public_phone]
				end
				if params[:doctor_payment][:tax_id_type] == "SSN"
					@record.tax_id_type = params[:doctor_payment][:tax_id_type]
					if params[:doctor_payment][:tax_id].match(/\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/)
						@record.tax_id = params[:doctor_payment][:tax_id]
					end
				elsif params[:doctor_payment][:tax_id_type] == "EIN"
					@record.tax_id_type = params[:doctor_payment][:tax_id_type]
					if params[:doctor_payment][:tax_id].match(/\b[0-9]{2}-[0-9]{7}\b/)
						@record.tax_id = params[:doctor_payment][:tax_id]
					end
				end
				if params[:doctor_payment][:medical_school]!=""
					@record.medical_school = params[:doctor_payment][:medical_school]
				end
				if params[:doctor_payment][:type_of_degree]!=""
					@record.type_of_degree = params[:doctor_payment][:type_of_degree]
				end
				if params[:doctor_payment][:graduated_year] != "" && isNumeric(params[:doctor_payment][:graduated_year])
					@record.graduated_year = params[:doctor_payment][:graduated_year]
				end
				if params[:doctor_payment][:medical_license_state]!=""
					@record.medical_license_state = params[:doctor_payment][:medical_license_state]
				end
				if params[:doctor_payment][:license_no]!=""
					@record.license_no = params[:doctor_payment][:license_no]
				end
				if params[:doctor_payment][:company]!=""
					@record.company = params[:doctor_payment][:company]
				end
				if params[:doctor_payment][:address]!=""
					@record.address = params[:doctor_payment][:address]
					@record.address2 = params[:doctor_payment][:address2]
				end
				if params[:doctor_payment][:city]!=""
					@record.city = params[:doctor_payment][:city]
				end
				if params[:doctor_payment][:state]!=""
					@record.state = params[:doctor_payment][:state]
				end
				if params[:doctor_payment][:zipcode].match(/^\d{5}(-\d{4})?$/)
					@record.zipcode = params[:doctor_payment][:zipcode]
				end
				if params[:doctor_payment][:mailing_address]!=""
					@record.mailing_address = params[:doctor_payment][:mailing_address]
					@record.mailing_address2 = params[:doctor_payment][:mailing_address2]
				end
				if params[:doctor_payment][:mailing_city]!=""
					@record.mailing_city = params[:doctor_payment][:mailing_city]
				end
				if params[:doctor_payment][:mailing_state]!=""
					@record.mailing_state = params[:doctor_payment][:mailing_state]
				end
				if params[:doctor_payment][:mailing_zipcode].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@record.mailing_zipcode = params[:doctor_payment][:mailing_zipcode]
				end
				if params[:doctor_payment][:description] == nil
					@doctor_description = ""
				else
					@doctor_description = params[:doctor_payment][:description]
					while @doctor_description[@doctor_description.size - 1, 1] == " " || @doctor_description[@doctor_description.size - 1, 1] == "\n" || @doctor_description[@doctor_description.size - 1, 1] == "\r"
						@doctor_description = @doctor_description[0, @doctor_description.size - 1]
					end
					while @doctor_description[0, 1] == " " || @doctor_description[0, 1] == "\n" || @doctor_description[0, 1] == "\r"
						@doctor_description = @doctor_description[1, @doctor_description.size - 1]
					end
				end
				if @doctor_description.size > 700
					@errors += "You have entered a description longer than 700 characters. Any text after 700 characters will be truncated. <br/>"
					@doctor_description = @doctor_description[0, 700]
				else
					@record.description = params[:doctor_payment][:description]
				end
				if params[:doctor_payment][:website] != "" && (params[:doctor_payment][:website].match(/^(http|https):\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix) || params[:doctor_payment][:website].match(/^(www).[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix))
					@record.website = params[:doctor_payment][:website]
				end
				if params[:doctor_payment][:insurance_expiry_date].match(/\b(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}\b/)
					@record.insurance_expiry_date = params[:doctor_payment][:insurance_expiry_date]
				end
				if params[:doctor_payment][:insurance_policy_no]!=""
					@record.insurance_policy_no = params[:doctor_payment][:insurance_policy_no]
				end
				if params[:doctor_payment][:insurance_carrier]!=""
					@record.insurance_carrier = params[:doctor_payment][:insurance_carrier]
				end
				if params[:doctor_payment][:payment_method] != nil && params[:doctor_payment][:payment_method] != ""
					@record.payment_method = params[:doctor_payment][:payment_method]
					if params[:doctor_payment][:payment_method] == "PayPal"
						if params[:doctor_payment][:paypal_email].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
							@record.paypal_email = params[:doctor_payment][:paypal_email]
						end
					end
				end
				#-----------------------------------------
				if params[:doctor_payment][:payee_name] != nil && params[:doctor_payment][:payee_name] != ""
					@record.payee_name = params[:doctor_payment][:payee_name]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_phone_number].match(@phone_regex)
					@record.payee_phone_number = params[:doctor_payment][:payee_phone_number]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_email_address] != "" && params[:doctor_payment][:payee_email_address].match(/^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i)
					@record.payee_email_address = params[:doctor_payment][:payee_email_address]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_address1] != nil && params[:doctor_payment][:payee_address1] != ""
					@record.payee_address1 = params[:doctor_payment][:payee_address1]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_address2] != nil
					@record.payee_address2 = params[:doctor_payment][:payee_address2]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_city] != nil && params[:doctor_payment][:payee_city] != ""
					@record.payee_city = params[:doctor_payment][:payee_city]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_state] != nil && params[:doctor_payment][:payee_state] != ""
					@record.payee_state = params[:doctor_payment][:payee_state]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_zip].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
					@record.payee_zip = params[:doctor_payment][:payee_zip]
				end
				#-----------------------------------
				if params[:doctor_payment][:payee_tax_id_type] != nil
					@record.payee_tax_id_type = params[:doctor_payment][:payee_tax_id_type]
					if params[:doctor_payment][:payee_tax_id_type] == "EIN"
						if params[:doctor_payment][:payee_tax_id].match(/\b[0-9]{2}-[0-9]{7}\b/)
							@record.payee_tax_id = params[:doctor_payment][:payee_tax_id]
						end
					elsif params[:doctor_payment][:payee_tax_id_type] == "SSN"
						if params[:doctor_payment][:payee_tax_id].match(/\b[0-9]{3}-[0-9]{2}-[0-9]{4}\b/)
							@record.payee_tax_id = params[:doctor_payment][:payee_tax_id]
						end
					end
				end
		end

		insurance_carriers = params[:doctor][:insurance_carriers]
		no_of_insurance_carriers = 0
		@insurance_carriers = Array.new
		insurance_carriers.each do |ic|
			if ic[1] != ""
				@insurance_carriers << ic[1]
				no_of_insurance_carriers += 1
			end
		end
		if no_of_insurance_carriers < 2
			@errors += "At least two Insurance company names are required. <br/>" if params[:doctor_payment][:enabled] == 1
		else
			sql = "DELETE FROM insurance_carriers WHERE doctor_id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
			no_of_in_ca = 0
			insurance_carriers.each do |ic|
				if ic[1] != ""
					sql = "INSERT INTO insurance_carriers(doctor_id, insurance_company_name) " + "VALUES(" + params[:id] + ", '" + ic[1].gsub("'", "''") + "')"
					ActiveRecord::Base.connection.execute(sql)
					no_of_in_ca += 1
				end
			end
		end

		hospital_affiliations = params[:doctor][:hospital_affiliations]
		no_of_hospital_affiliations = 0
		foo = 0
		@hospital_affiliations = Array.new
		hospital_affiliations.each do |ha|
			if ha[1]['hospital'] != ""
				ha.each do |has|
					@hospital_affiliations << has[1]
					foo +=1
				end
				no_of_hospital_affiliations += 1
			end
		end
		if no_of_hospital_affiliations < 2
			@errors += "At least One Hospital Affiliation is required. <br/>" if params[:doctor_payment][:enabled] == 1
		else
			sql = "DELETE FROM hospital_affiliations WHERE doctor_id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
			no_of_hos_aff = 0
			@hospital_aff = Array.new
			hospital_affiliations.each do |ha|
				tmp_array = Array.new
				ha[1].each do |row|
					tmp_array << row[1]
				end
				tmp_array[0] = tmp_array[0].gsub("%", "")
				@hospital_aff<< tmp_array
				if tmp_array[1] != ""
					if (tmp_array[0] == tmp_array[0].to_i.inspect) && tmp_array[0].to_i <= 100 && tmp_array[0].to_i > 0
						sql = "INSERT INTO hospital_affiliations(doctor_id, hospital, usage_percentage) " +
							"VALUES(" + params[:id] + ", '" + tmp_array[1].gsub("'", "''") + "', " + tmp_array[0] + ")"
						ActiveRecord::Base.connection.execute(sql)
						no_of_hos_aff += 1
					end
				end
			end
		end

		doctor_references = params[:doctor][:doctor_references]
		sql = "DELETE FROM doctor_references WHERE doctor_id = " + params[:id]
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
					@errors += "Please enter both the name and phone number for the doctor reference or leave all three fields blank. <br/>" if params[:doctor_payment][:enabled] == 1
				elsif !tmp_array[0].match(/\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
					@errors += "Please enter a valid phone number. <br/>" if params[:doctor_payment][:enabled] == 1
				else
					sql = "INSERT INTO doctor_references(doctor_id, first_name, last_name, phone) " +
						"VALUES(" + params[:id] + ", '" + tmp_array[1].gsub("'", "''") + "', '" + tmp_array[2].gsub("'", "''") + "', '" + tmp_array[0] + "')"
					ActiveRecord::Base.connection.execute(sql)
					no_of_doctor_references += 1
				end
			end
		end

		#doctor_references : insurance_carriers : hospital_affiliations
		### Validation Ends

		#@order = Doctor.new(params[:doctor_payment])
		if tmp_full_address != @record.full_address
			location = GoogleGeocoder.geocode(@record.full_address)
			@record.lat = location.lat
			@record.lng = location.lng
		end

		if @record.onhold==1 && params[:doctor_payment][:onhold]==nil
			@record.onhold_note = "HealthyPrice released a hold on this account"
			@record.onhold_date = Date.today
		end
		if @record.onhold==0 && params[:doctor_payment][:onhold]=="1"
			@record.onhold_note = "This account was placed on-hold by HealthyPrice"
			@record.onhold_date = Date.today
		end
		if @record.enabled==1 && params[:doctor_payment][:enabled]==nil
			@record.enabled_note = "This account was disabled by HealthyPrice"
			@record.enabled_date = Date.today
		end
		if @record.enabled==0 && params[:doctor_payment][:enabled]=="1"
			@record.enabled_note = "HealthyPrice enabled this account"
			@record.enabled_date = Date.today
		end

		if params[:doctor_payment][:spanish]==nil
			params[:doctor_payment][:spanish]=0
		end
		if params[:doctor_payment][:onhold]==nil
			params[:doctor_payment][:onhold]=0
		end
		if params[:doctor_payment][:enabled]==nil
			params[:doctor_payment][:enabled]=0
		end

		@record.onhold = params[:doctor_payment][:onhold]
		@record.enabled = params[:doctor_payment][:enabled]

		session['onhold_status']=@record.onhold
		session['enabled_status']=@record.enabled
		session['signup_step']=@record.signup_step


#@record.update_attributes(params[:doctor_payment])
#@record.update_attributes(params[:doctor_payment])
		@record.save(false)
		#@record.update_attributes(params[:doctor_payment])

		#Upload Begin
		if params[:doctor][:headshot_photo] != nil
			upload = params[:doctor][:headshot_photo]
			if !(upload.content_type == "image/jpe" || upload.content_type == "image/jpeg" || upload.content_type == "image/jpg" || upload.content_type == "image/pjpeg")
				@errors += "Please select a photo of yourself to be placed on your profile (it must be a JPEG image with a .jpg file extension). <br/>"
			else
				name =  upload.original_filename
				filename = params[:id] + "_headshot.jpg"
				path = File.join("public/images/uploads", filename)
				File.open(path, "wb") { |f| f.write(upload.read) }
				filesize = File.size(path)
				if filesize > 307200	#2097152
					File.unlink(path)
					@errors += "You have selected image files that exceed the maximum image size of 300KB for your photo. Please reduce the file size of your images and upload them again.<br/>"
				else
					sql = "INSERT INTO doctor_photos(content_type, filename, size, width, height, doctor_id, photo_type) " +
						"VALUES('"+upload.content_type+"', '"+filename+"', "+filesize.inspect+", 150, 75, "+params[:id].inspect+", 'headshot')"
					ActiveRecord::Base.connection.execute(sql)
				end
			end
		end

		if params[:doctor][:practice_photo] != nil
			upload = params[:doctor][:practice_photo]
			if !(upload.content_type == "image/jpe" || upload.content_type == "image/jpeg" || upload.content_type == "image/jpg" || upload.content_type == "image/pjpeg")
				@errors += "Please select a photo of your practice to be placed on your profile (it must be a JPEG image with a .jpg file extension). <br/>"
			else
				name =  upload.original_filename
				filename = params[:id]+ "_practice.jpg"
				path = File.join("public/images/uploads", filename)
				File.open(path, "wb") { |f| f.write(upload.read) }
				filesize = File.size(path)
				if filesize > 307200	#2097152
					File.unlink(path)
					@errors += "You have selected image files that exceed the maximum image size of 300KB for the photo of your practice. Please reduce the file size of your images and upload them again.<br/>"
				else
					sql = "INSERT INTO doctor_photos(content_type, filename, size, width, height, doctor_id, photo_type) " +
						"VALUES('"+upload.content_type+"', '"+filename+"', "+filesize.inspect+", 150, 75, "+params[:id].inspect+", 'practice')"
					ActiveRecord::Base.connection.execute(sql)
				end
			end
		end
		#Upload End

		#send mail
		if session['onhold_status']==1 && params[:doctor_payment][:onhold]==0
			recipient = @record.notification_email
			subject = "HealthyPrice Account Hold Removed"
			message ="Dear " << @record.title + " " << @record.first_name + " " +@record.last_name << ",<br><br> The hold that was placed on your account has been released by HealthyPrice as of " << " " + Date.today.strftime("%m/%d/%Y") << ".<br/><br/> Your provider profile will once again be visible on HealthyPrice and you will be able to receive new orders. <br/><br/>If you did not request this change, <a style='text-decoration:none;' href='http://www.healthyprice.com/page/contact_us'> please contact HealthyPrice. </a>"
			Emailer.deliver_admin_account_status(recipient, subject, message)
		end
		if session['onhold_status']==0 && params[:doctor_payment][:onhold]=="1"
			recipient = @record.notification_email
			subject = "HealthyPrice Account Placed On Hold"
			message ="Dear "  << @record.title + " " << @record.first_name + " " +@record.last_name << ",<br><br> HealthyPrice has placed your provider account on hold as of " << " " + Date.today.strftime("%m/%d/%Y") << ".<br/> <br/>Your provider profile will no longer be visible on HealthyPrice and you will not receive new orders. Please note that you must continue to service orders that have already been placed.<br/> <br/> If you did not request this change, <a style='text-decoration:none;' href='http://www.healthyprice.com/page/contact_us'> please contact HealthyPrice. </a>"
			Emailer.deliver_admin_account_onhold(recipient, subject, message)
		end
		if session['enabled_status']==1 && params[:doctor_payment][:enabled]==0
			recipient = @record.notification_email
			subject = "Your HealthyPrice Account Has Been Disabled"
			message ="Dear " << @record.title + " " << @record.first_name + " " +@record.last_name << ",<br><br> Your HealthyPrice account has been Disabled. "
			Emailer.deliver_admin_account_status(recipient, subject, message)
		end
		if session['enabled_status']==0 && params[:doctor_payment][:enabled]=="1" && session['signup_step'] ==9
			recipient = @record.notification_email
			subject = "Your HealthyPrice Account Has Been Activated"
			message ="Dear " << @record.title + " " << @record.first_name + " " +@record.last_name << ",<br><br> Your HealthyPrice account has been activated. <br/><br/>You may now <a style='text-decoration:none;' href='http://www.healthyprice.com/login'> login to your account. </a>"
			Emailer.deliver_admin_account_status(recipient, subject, message)
		end
		if session['enabled_status']==0 && params[:doctor_payment][:enabled]=="1" && session['signup_step'] ==8
			recipient = @record.notification_email
			subject = "Your HealthyPrice Account Has Been Approved! "
			message ="Dear " << @record.title + " " << @record.first_name + " " +@record.last_name << ",<br><br> Congratulations, your application submitted to HealthyPrice has been approved! <br/><br/>To complete activation of your HealthyPrice account and begin receiving orders, please  <a style='text-decoration:none;' href='http://www.healthyprice.com/login'> login to your HealthyPrice account.</a>"
			Emailer.deliver_admin_account_status(recipient, subject, message)
		end
		#send mail

		if @errors == ""
			redirect_to '/admin/doctors'
		else
			session['errors'] = @errors
			redirect_to "/admin/doctors/edit_details/" + params[:id]
		end
	end
#end...


  def payments
    @payment_records = DoctorPayment.find(:all, :order => "id DESC")
    @payment_records = @payment_records.paginate :page => params[:page],:per_page => 20
  end

	def upload
	      @errors=""
	      @message=""
	      @id = params[:id]
	      if params[:doctor][:video_code] != nil
		upload = params[:doctor][:video_code]
		if !(upload.content_type == "video/x-flv" || upload.content_type == "video/x-m4v")
		  @message += "The uploaded file is not of the correct format. Please upload a Flash video (.flv) file."
		  @errors="X"
		else
		  filename = params[:id]+ "_video.flv"
		  path = File.join("public/images/uploads", filename)
		  path2 = File.join("/images/uploads", filename)
		  File.open(path, "wb") { |f| f.write(upload.read) }
		  @message += "<a href='"+path2+"'>https://www.healthyprice.com"+path2+"</a>"
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

  def new_payment
    @error = params[:error]
    @all_doctors = Doctor.find(:all ,:conditions=>["enabled=?",1],:order =>" last_name asc, first_name asc" )
  end

  def pending_orders
    #render :text=>params['doctor']['id']
    if params['doctor']['id'] == "-1"
	    @error = "Please select a provider from the list to find pending orders."
	    @all_doctors = Doctor.find(:all ,:conditions=>["enabled=?",1],:order =>" last_name asc, first_name asc" )
	    render :action => 'new_payment'
    else
	    @constraints = Order.find_by_sql("SELECT o.id,o.doctor_service_id,o.created_at,o.first_name, o.last_name,o.doctor_price " +
					"FROM orders o, doctor_services ds " +
					"WHERE o.doctor_service_id = ds.id " +
					"And (o.orderstatus='Pending' OR o.orderstatus='pending') " +
					"AND o.submitted='1' " +
					"AND ds.doctor_id = " + params['doctor']['id'])
	    @doctor_details = Doctor.find_by_id(params['doctor']['id'])
	    @docname = @doctor_details.first_name << " " << @doctor_details.last_name
	    @docid = params['doctor']['id']
    end
  end


  def search
    if params[:clear] != nil && params[:search][:query]!=nil
      redirect_to :action=>"payments"
    else
      session[:querytext]= params[:search][:query]
      if params[:search][:query].length == 8 && params[:search][:query]["/"] == -1
        #@search_text=params[:search][:query]
        @pay_reff = Order.find_by_id(params[:search][:query])
        params[:search][:query]=@pay_reff.doctor_payments_id
        #@payment_records = DoctorPayment.find(:all ,:conditions=>["id=?" ,@pay_reff.doctor_payments_id])
        #@payment_records = @payment_records.paginate :page => params[:page],:per_page => 100
        #render :action=>"payments"  and return false
        #else
      end
      @search_text=session[:querytext]
      if @search_text.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/)
        query = @search_text.split("/")
        @payment_records = DoctorPayment.find(:all ,:conditions=>["created_at >= DATE(?) AND created_at < DATE(?)", query[2]+"-"+query[0]+"-"+query[1], query[2]+"-"+query[0]+"-"+(query[1].to_i+1).inspect])
      elsif @search_text.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.][0-9]{2}/)
        query = @search_text.split("/")
        @payment_records = DoctorPayment.find(:all ,:conditions=>["created_at >= DATE(?) AND created_at < DATE(?)", "20"+query[2]+"-"+query[0]+"-"+query[1], "20"+query[2]+"-"+query[0]+"-"+(query[1].to_i+1).inspect])
      else
        @payment_records = DoctorPayment.find(:all ,:conditions=>["id=? or doctor_id=? or total_amount=?" ,params[:search][:query],session[:querytext],session[:querytext]])
      end
      @payment_records = @payment_records.paginate :page => params[:page],:per_page => 100
      render :action=>"payments"
    end
  end

  def add_payments
	#xox=xcx
	#==============================================
	@error=""
	@date1 = params[:docpayments][:date]
	if !@date1.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/)
		@error += "Please enter a valid date in mm/dd/yyyy format."
	end
	addpay = DoctorPayment.new(params[:docpay])
	addpay.total_amount = params[:pay_total].gsub(",", "")
	addpay.save
	@reff_id = DoctorPayment.find(:first, :order=> "id DESC")
	@doctor_details = Doctor.find_by_id(params[:docpay][:doctor_id])
	if params[:order] == nil
		@error += "You must select at least one pending order to make a payment for."
	else
		params[:order].each do |order|
			@id = order[0].gsub("chk", "")
			@sel_order = Order.find_by_id_and_submitted(@id, 1)
			@doctor_service = DoctorService.find_by_id(@sel_order.doctor_service_id)
			@sel_order.update_attribute(:doctor_payments_id, @reff_id.id)
			@sel_order.update_attribute(:orderstatus, "Closed")
			#
			@doctor_pay_amount = params[:pay]["amt"+@id].gsub(",", "")
			if params[:no_show] == nil
				@no_show = 0
			else
				@no_show = (params[:no_show]["chk"+@id] == "on")? 1 : 0 ;
			end
			@sel_order.update_attribute(:doctor_pay_amount , @doctor_pay_amount)
			@sel_order.update_attribute(:no_show, @no_show)
			#xox=xcx
		end
		recipient = @doctor_details.email
		subject = "You have a payment from HealthyPrice (Payment Reference #  " + @reff_id.id.inspect +  ")"
		message = " Dear " << @doctor_details.name << ",<br><br>"
		message += "We have begun processing a new payment to you. <br><br>"
		message += "Payment Reference#: " << @reff_id.id.inspect  << " <br><br>"
		message += "Please <a style='text-decoration:none;' href='http://www.healthyprice.com/login'> login to your HealthyPrice account </a> to review the details of this payment. You will receive the payment pursuant to the terms of your payment arrangements. <br/>"
		Emailer.deliver_admin_account_status(recipient, subject, message)
	end
	#==============================================
=begin
	params[:docpay][:total_amount] = @order_doc_price.doctor_price
	params[:docpay][:created_at] = @date1
	if @doctor_id.doctor_id == params[:docpay][:doctor_id].to_i       
		if @order_doc_price.doctor_payments_id !=-1 && @order_doc_price.orderstatus!="Pending" 
			@error +="The order you entered is already in a payment."       
		elsif @order_doc_price.doctor_payments_id ==-1 && @order_doc_price.orderstatus!="Pending"
			@error +="The order you entered is not in 'Pending' status. Only orders with a status of 'Pending' may be included in a payment."
		else
			addpay.save
			@reff_id = DoctorPayment.find(:first, :order=> "id desc")
			@doctor_details = Doctor.find_by_id(params[:docpay][:doctor_id])
			@order_doc_price.update_attribute(:doctor_payments_id,@reff_id.id)
			@order_doc_price.update_attribute(:orderstatus,"Closed")
		end
	else
		@error +="The order you entered is for a different provider. It cannot be included to this provider." 
	end
=end
	if @error ==""
		redirect_to :action=>"edit_details", :id=>@reff_id.id
	else
		redirect_to :action=>"new_payment" , :error=>@error
	end
  end

  def show_details
    @payment_show = Order.find_all_by_doctor_payments_id(params[:id])
    @payreffid= params[:id]
  end

  def show_one_order
    @show_order = Order.find_by_id(params[:id])
  end

  def remove_payments
    @change_order = Order.find_by_id(params[:id])
    session['order_doc_reff'] = @change_order.doctor_payments_id
    @doc_payment_id = DoctorPayment.find_by_id(@change_order.doctor_payments_id)
    @doctor_details = Doctor.find_by_id(@doc_payment_id.doctor_id)
    #---------------------------------------
    @change_order_doctor_payments_id_to_s = @change_order.doctor_payments_id.to_s
    @change_order.update_attribute(:doctor_payments_id, "-1")
    @change_order.update_attribute(:orderstatus, "Pending")
    @tot_amount = Order.find_by_sql("SELECT SUM(doctor_price) as sum FROM orders WHERE doctor_payments_id= " + @change_order_doctor_payments_id_to_s)
    @doc_payment_id.update_attribute(:total_amount, @tot_amount[0].sum)

    if @doctor_details!=nil
      recipient = @doctor_details.email
      subject = "HealthyPrice payment adjustment (Payment Reference # " << "#{session['order_doc_reff']}" <<  ") "
      message ="  Dear " << @doctor_details.name << ",<br><br>
                   We have adjusted a previous payment that was made to you. <br><br>
                   Payment Reference#: " << "#{session['order_doc_reff']}"  << " <br><br>
                   Please <a style='text-decoration:none;' href='http://www.healthyprice.com/login'> login to your HealthyPrice account </a> to review the details of the payment adjustment."
      Emailer.deliver_admin_account_status(recipient, subject, message)
      redirect_to :action=>"edit_details", :id=>session['order_doc_reff']
    else
      redirect_to :action=>"edit_details", :id=>session['order_doc_reff']
    end

  end

  def edit_details
    @error=params['error']
    @payment_edit = Order.find_all_by_doctor_payments_id(params[:id])
    @doctor_payments_id = params[:id]
    @doctor_payment = DoctorPayment.find_by_id(params[:id])
    @doctor_id = @doctor_payment.doctor_id
  end

  def add_orders
    @services_id = Order.find_by_id(params[:orders][:order_no])
    #render :text=>"@services_id.inspect"
    @error=""
    if @services_id == nil
      @error="Please enter a valid order number." 
    else
      @ref_no = params[:orders][:hide_no]
      @doctor_id = DoctorService.find_by_id(@services_id.doctor_service_id)
      if @doctor_id.doctor_id==params[:orders][:doc_no].to_i
        if @services_id.doctor_payments_id==-1 && @services_id.orderstatus=="Pending"  && @services_id.submitted==1
          session[:notes]= @services_id.order_notes
          @services_id.update_attribute(:doctor_payments_id,@ref_no)
          @services_id.update_attribute(:orderstatus,"Closed")
          @services_id.update_attribute(:doctor_pay_amount , @services_id.doctor_price)
          @services_id.update_attribute(:no_show , 0)
          @services_id.update_attribute(:order_notes,"#{session[:notes]}" << " <br> A payment of " << " #{@services_id.doctor_price}"  << " was paid out on " << Date.today.strftime("%m/%d/%Y"))
          @tot_amount = Order.find_by_sql("SELECT SUM(doctor_price) as sum FROM orders WHERE doctor_payments_id= " + @ref_no+ "")
          @doc_payment_id = DoctorPayment.find_by_id(@ref_no)
          @doc_payment_id.update_attribute(:total_amount, @tot_amount[0].sum)
          @doctor_details = Doctor.find_by_id(params[:orders][:doc_no])
          recipient = @doctor_details.email
          subject = "HealthyPrice payment adjustment (Payment Reference # " << "#{@ref_no}"  <<  ") "
          message ="  Dear " << @doctor_details.name << ",<br>
                  <br> We have adjusted a previous payment that was made to you. <br><br>
                   Payment Reference#: " << "#{@ref_no}"  << " <br><br>
                   Please <a style='text-decoration:none;' href='http://www.healthyprice.com/login'> login to your HealthyPrice account </a> to review the details of the payment adjustment."


          Emailer.deliver_admin_account_status(recipient, subject, message)
          
         # redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no]  and return false
        elsif @services_id.doctor_payments_id==-1 && @services_id.orderstatus!="Pending"
          #redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no] ,
        @error="The order you entered is not in “Pending” status. Only orders with a status of 'Pending' may be included in a payment."
        elsif  params[:orders][:hide_no]==@services_id.doctor_payments_id.to_s
          #redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no] ,
            @error="The order you entered is already included in this payment." 
        elsif @services_id.doctor_payments_id!=-1 && @services_id.orderstatus!="Pending"
          #redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no] ,
            @error="The order you entered is included in another payment. It cannot be included in this payment (each order may only be included in one payment)"  
        end
      else
        #redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no] ,
          @error="The order you entered
                           is for a different provider.
                           It cannot be included in this payment (each payment may only contain orders
                           for one provider)."
      end
    end
    if @error==""
      redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no]
    else
      redirect_to :action=>"edit_details", :id=>params[:orders][:hide_no],:error=>@error
    end
  end

  def update_details1
    @update_order = Order.find_all_by_doctor_payments_id(params[:id])
    @update_order.each do |order|
      @order = Order.find_by_id(order.id)
    end
    render :text=> params[:doctor_payment][:notes]

  end

  def update_details
	  #dgfsdfg=sdfgsdf
    @update_order = DoctorPayment.find_by_id(params[:id])
    @note = params[:doctor_payment][:notes]
    @update_order.update_attribute(:notes,@note)
    @total_amount = params[:doctor_payment][:total_amount]
    @update_order.update_attribute(:total_amount,@total_amount)
    if params[:doctor_payment][:changed_amounts] != "not_changed"
	    @changed_amounts = params[:doctor_payment][:changed_amounts].split("|")
	    @changed_amounts.each do |order|
		@order_row = order.split(":")
		@sql = "UPDATE orders SET doctor_pay_amount = "+@order_row[1]+", no_show = "+@order_row[2]+" WHERE id = "+@order_row[0]
		ActiveRecord::Base.connection.execute(@sql)
	    end
    end
    #DoctorPayment.find_by_doctor_pay_ref_id(params[:id]).update_attributes(:notes=> @note,:doctor_id=>1 )
    redirect_to :controller=> 'admin/doctor_payments' ,:action=>'payments'

  end

  def details
    @error=params['error']
    #@doc_payment=params['doctor_payment']
    
     #render :text=>@doc_payment
#     if params['doctor_payment']!=nil && params['doctor']!=nil
#       render :text=>params['doctor_payment']['first_name']
#     end
    @orders = Doctor.find_by_id(params[:id])
    @insurance_carriers = Array.new
    carriers = Doctor.find_by_sql("SELECT insurance_company_name FROM insurance_carriers WHERE doctor_id = " + params[:id])
    carriers.each do |carrier|
      @insurance_carriers << carrier.insurance_company_name
    end
    @hospital_affiliations = Array.new
    affiliations = Doctor.find_by_sql("SELECT usage_percentage, hospital FROM hospital_affiliations WHERE doctor_id = " + params[:id])
    affiliations.each do |affiliation|
      tmp_array = Array.new
      tmp_array << affiliation.usage_percentage
      tmp_array << affiliation.hospital
      @hospital_affiliations << tmp_array
    end
    @hospital_affiliations << Array.new
    @hospital_affiliations << Array.new
    @hospital_affiliations << Array.new
    @doctor_references = Array.new
    references = Doctor.find_by_sql("SELECT first_name, last_name, phone FROM doctor_references WHERE doctor_id = " + params[:id])
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
    if session['errors'] != nil
	@error = session['errors']
	session['errors'] = nil
    end
  end

  def update_doctor_details
    render :text=> params[:id]
  end

	def isNumeric(s)
		begin
			Float(s)
		rescue
			false # not numeric
		else
			true # numeric
		end
	end

end
