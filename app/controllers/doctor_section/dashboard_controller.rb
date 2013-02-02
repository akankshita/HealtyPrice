require 'active_record'

class DoctorSection::DashboardController < ApplicationController

  include SslRequirement

  layout 'doctor'
  before_filter :require_user

#if local comented this
   def ssl_required?
	 if get_config("SSL") == "true"
	 	true
	 else
	 	false
	 end
   end

  def index
	  #@Echo = current_user.signup_step.inspect + " : " + current_user.enabled.inspect
	  if params[:billing_code] != nil
		orders = Order.find_by_sql("SELECT * FROM orders WHERE billing_code = '" + params[:billing_code] +"'")
		if orders.size == 0
			@error = "<ul><li>The billing code you entered could not be found.</li></ul>"
			session[:billing_code] = nil
		else
			session[:billing_code] = params[:billing_code]
			redirect_to "/doctor_section/order/" + orders[0].id.inspect
		end
	  end
	  #==========================================================================
	  if session[:doctor] == nil || session[:doctor] != current_user
		  session[:doctor] = current_user
	  end
	  #@error = current_user.enabled.inspect + ":" + current_user.signup_step.inspect
	  if current_user == nil
		  redirect_to new_user_session_path
	  #elsif session[:doctor].closed == 1
		#  redirect_to '/doctor_section/closed'
	  elsif current_user.enabled == 0	#current_user.signup_step < 9 && 
		if current_user.signup_step == 8
			redirect_to '/doctor_section/signup/pending'
		elsif current_user.signup_step == 9
			redirect_to '/doctor_section/closed'
		elsif current_user.signup_step == 1
			session[:doctor] = current_user
			redirect_to '/doctor_section/signup/step2'
		else
			session[:doctor] = current_user
			redirect_to '/doctor_section/signup/step' + current_user.current_signup_step.inspect
		end
	  else
		  #==========================================================================
		  sql = "SELECT SUM(o.doctor_price) AS Sum "
		  sql += "FROM orders o, doctor_services ds, doctors d, specialty_services ss "
		  sql += "WHERE ds.id = o.doctor_service_id "
		  sql += "AND d.id = ds.doctor_id "
		  sql += "AND ss.id = ds.specialty_service_id "
		  sql += "AND (orderstatus = 'Fulfilled' OR orderstatus = 'Closed') "
		  sql += "AND o.created_at > " + Time.utc(Time.now.year).to_f.inspect + " "
		  #sql += "AND o.created_at < " + Time.now.to_f.inspect + " "
		  sql += "AND d.id = " + current_user.id.inspect
		  @Earnings = Order.find_by_sql(sql)
		  if @Earnings[0].Sum == nil
			@Earnings = Time.now.year.inspect + ": $0"
		  else
			@Earnings = Time.now.year.inspect + ": $"+@Earnings[0].Sum
		  end
		  #@x = sql
		  #==========================================================================
		  #	SELECT doctor_price, o.first_name, o.last_name, d.title AS DTitle, d.first_name AS DFName, d.last_name AS DLName
		  #	FROM orders o, doctor_services ds, doctors d, specialty_services ss
		  #	WHERE ds.id = o.doctor_service_id
		  #	AND d.id = ds.doctor_id
		  #	AND ss.id = ds.specialty_service_id
		  #==========================================================================
		  sql = "SELECT o.id, o.doctor_price, service_name AS Srv_Name, spc.name AS Spc_Name, o.created_at "
		  sql += "FROM orders o, doctor_services ds, doctors d, specialty_services ss, specialties spc "
		  sql += "WHERE ds.id = o.doctor_service_id "
		  sql += "AND d.id = ds.doctor_id "
		  sql += "AND ss.id = ds.specialty_service_id "
		  sql += "AND ss.specialty_id = spc.id "
		  sql += "AND (orderstatus = 'New' OR orderstatus = 'Pending') "
		  sql += "AND d.id = " + current_user.id.inspect
		  sql += " ORDER BY o.id DESC LIMIT 0, 15"
		  @orders = Order.find_by_sql(sql)
		  sql2 = "SELECT COUNT(*) AS count FROM orders o, doctor_services ds " +
				"WHERE ds.id = o.doctor_service_id AND ds.doctor_id = " + current_user.id.inspect
		  if @orders.size < Order.find_by_sql(sql2)[0].count.to_i
			@show_more_link = "true"
		  else
			@show_more_link = "false"
		  end
		  #@sql = sql
		  #==========================================================================
		  @selected_specialties = Specialty.find_by_sql("SELECT id, name FROM specialties, doctor_specialties " +
										"WHERE specialties.id = doctor_specialties.specialty_id " +
										"AND doctor_id = " + current_user.id.inspect + 
										" ORDER BY name")
		  @currentTab = "Dashboard"
	  end
  end

  def admin
    #redirect_to admin_doctors_path()
  end

	def procedures
		if current_user == nil
			 redirect_to new_user_session_path
		else
			sql = "SELECT s.id, s.name AS specialty, s.description "
			sql += "FROM specialties s, doctor_specialties ds "
			sql += "WHERE s.id = ds.specialty_id AND ds.doctor_id = " + current_user.id.inspect
			@specialities = Order.find_by_sql(sql)
			sql = "SELECT s.id, s.name AS specialty, s.description "
			sql += "FROM specialties s "
			sql += "WHERE s.id NOT IN (SELECT specialty_id FROM doctor_specialties WHERE doctor_id = " + current_user.id.inspect + ")"
			@specialitiesToBeAdded = Doctor.find_by_sql(sql)
			sql = "SELECT s.id, s.name AS service, s.description "
			sql += "FROM services s, doctor_services ds "
			sql += "WHERE s.id = ds.specialty_service_id AND ds.doctor_id = " + current_user.id.inspect
			@services = Order.find_by_sql(sql)
			@currentTab = "Procedures"
		end
		@currentTab = "Procedures"
	end

	def profile
		if current_user == nil
			redirect_to "/user_session/new"
		elsif session[:doctor] == nil || session[:doctor] != current_user
			session[:doctor] = current_user
		end
		##--------------------------------------------------------------------------
		@insurance_carriers = Array.new
		carriers = Service.find_by_sql("SELECT insurance_company_name FROM insurance_carriers WHERE doctor_id = " + session[:doctor].id.inspect)
		carriers.each do |carrier|
			@insurance_carriers << carrier.insurance_company_name
		end
		##-------------------------------------------------
		@hospital_affiliations = Array.new
		affiliations = Service.find_by_sql("SELECT usage_percentage, hospital FROM hospital_affiliations WHERE doctor_id = " + session[:doctor].id.inspect)
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
		references = Service.find_by_sql("SELECT first_name, last_name, phone FROM doctor_references WHERE doctor_id = " + session[:doctor].id.inspect)
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
		##--------------------------------------------------------------------------
		@currentTab = "Profile"
		##--------------------------------------------------------------------------
		if params[:doctor] != nil
			# Validate
			@error = "<ul>"
			if !params[:doctor][:fax].match(/\(?[0-9]{3}\)?[-. ]?[0-9]{3}[-. ]?[0-9]{4}/)
				@error += "<li>Please enter a valid fax number.</li>"
			end
			session[:doctor].fax				= params[:doctor][:fax]
			if params[:doctor][:password] != nil || params[:doctor][:verify_password] != nil
				if params[:doctor][:password] == params[:doctor][:verify_password]
					doc = session[:doctor].clone
					doc.password = params[:doctor][:password]
					doc.save
					#@doc = Doctor.find(session[:doctor].id)
					#@sel_doc = @doc[0]
					#@sel_doc.password = params[:doctor][:password]
					#@result = @sel_doc.save
					#if !@result
					#	@error += "<li>There occured an error!</li>"
					#else
					#	@error += "<li>Password Changed!</li>"
					#end
				else
					@error += "<li>Password Confirmation does not match.</li>"
				end
			end
			session[:doctor].spanish			= params[:doctor][:spanish]!=nil
			session[:doctor].other_languages		= params[:doctor][:other_languages]
			session[:doctor].mailing_address		= params[:doctor][:mailing_address]
			session[:doctor].mailing_address2		= params[:doctor][:mailing_address2]
			session[:doctor].mailing_city			= params[:doctor][:mailing_city]
			if !params[:doctor][:mailing_zipcode].match(/\b[0-9]{5}(?:-[0-9]{4})?\b/)
				@error += "<li>Please enter a valid ZIP in 12345-6789 format (you may enter just the first five digits).</li>"
			end
			session[:doctor].mailing_zipcode		= params[:doctor][:mailing_zipcode]
			session[:doctor].mailing_state		= params[:doctor][:mailing_state]
			if !params[:doctor][:website].match(/^(http|https):\/\/[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix)
				@error += "<li>Please enter your website address in http://www.yourname.ext format where 'ext' is the domain extension (i.e., com, net, org, biz, etc.).</li>"
			end
			session[:doctor].website			= params[:doctor][:website]
			session[:doctor].description			= params[:doctor][:description]
			if params[:doctor][:headshot_photo] != nil
				upload = params[:doctor][:headshot_photo]
				if upload.content_type != "image/pjpeg"
					@error += "<li>Please select a JPEG image file to upload. You have selected a(n) " + upload.content_type + " file</li>"
				else
					name =  upload.original_filename
					filename = session[:doctor].id.inspect + "_headshot.jpg"
					path = File.join("public/images/uploads", filename)
					File.open(path, "wb") { |f| f.write(upload.read) }
					filesize = File.size(path)
					if filesize > 2097152
						File.unlink(path)
						@error += "<li>The file you have selected is too large. (Larger than 2MB)</li>"
					else
						sql = "INSERT INTO doctor_photos(content_type, filename, size, width, height, doctor_id, photo_type) " +
							"VALUES('"+upload.content_type+"', '"+filename+"', "+filesize.inspect+", 150, 75, "+session[:doctor].id.inspect+", 'headshot')"
						ActiveRecord::Base.connection.execute(sql)
					end
				end
			end
			if params[:doctor][:practice_photo] != nil
				upload = params[:doctor][:practice_photo]
				if upload.content_type != "image/pjpeg"
					@error += "<li>Please select a JPEG image file to upload. You have selected a(n) " + upload.content_type + " file</li>"
				else
					name =  upload.original_filename
					filename = session[:doctor].id.inspect + "_practice.jpg"
					path = File.join("public/images/uploads", filename)
					File.open(path, "wb") { |f| f.write(upload.read) }
					filesize = File.size(path)
					if filesize > 2097152
						File.unlink(path)
						@error += "<li>The file you have selected is too large. (Larger than 2MB)</li>"
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
							"VALUES(" + session[:doctor].id.inspect + ", '" + tmp_array[1] + "', " + tmp_array[0] + ")"
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
							"VALUES(" + session[:doctor].id.inspect + ", '" + tmp_array[1] + "', '" + tmp_array[2] + "', '" + tmp_array[0] + "')"
						ActiveRecord::Base.connection.execute(sql)
						no_of_doctor_references += 1
					end
				end
			end
			#--------------------------------------------------------------------------------------------------------
			@error += "</ul>"
			@error = @error.gsub("<ul></ul>", "")
			#=======================================
			if @error == ""
				session[:doctor].save(false)
			end
			#redirect_to '/doctor_section/profile'
		end
		@currentTab = "Profile"
	end

	def account_status
		if current_user == nil
			 redirect_to new_user_session_path
		elsif session[:doctor] == nil || session[:doctor] != current_user
			session[:doctor] = current_user
		end
		if params[:doctor] != nil
			@error = "<ul>"
			if params[:doctor][:onhold] != nil
				if session[:doctor].onhold == 1 && (session[:doctor].onhold_note != nil && session[:doctor].onhold_note.index('Provider') == nil)
					@error += "<li>You cannot reinstate your account as it was placed on hold by HealthyPrice.<br/>" +
						"Please <a href='mailto:providersupport@healthyprice.com' target='_blank'>contact us</a> if you wish to release this hold.</li>"
				else
					session[:doctor].onhold = params[:doctor][:onhold].to_i
					last_onhold_date = session[:doctor].onhold_date
					session[:doctor].onhold_date = Time.new
					if params[:doctor][:onhold] == "1"
						session[:doctor].onhold_note = 'This account was placed on-hold by Provider'	# on ' + session[:doctor].onhold_date.strftime("%a, %b %d, %Y at %I:%M%p")
						#==========================================================
						recipient = session[:doctor].email
						subject = "HealthyPrice Account Placed On Hold"
						message ="Dear " + session[:doctor].name + ",<br/>" +
							"<br/>You have placed your HealthyPrice account on hold as of " + session[:doctor].onhold_date.strftime("%m/%d/%Y") + ".<br/>" +
							"<br/>Your provider profile will no longer be visible on HealthyPrice and you will not receive new orders." + "<br/>" +
							"<br/>You may remove your account from hold by <a style='text-decoration:none;' href='http://www.healthyprice.com/login'>logging in to your HealthyPrice account</a>.<br/>" +
							"<br/>Please note that you must continue to service orders that have already been placed.<br/>" +
							"<br/>If you did not request this change, <a style='text-decoration:none;' href='http://www.healthyprice.com/page/contact_us'>please contact HealthyPrice</a>."
						Emailer.deliver_admin_account_onhold(recipient, subject, message)
						#==========================================================
					else
						session[:doctor].onhold_note = 'Provider released a hold on this account'
						#==========================================================
						recipient = session[:doctor].email
						subject = "HealthyPrice Account Hold Removed"	#"HealthyPrice Account Reinstate"
						message ="Dear " + session[:doctor].name + ",<br/>" +
							"<br/>You have released the hold that you placed on your account as of " + session[:doctor].onhold_date.strftime("%m/%d/%Y") + ".<br/>" +
							"<br/>Your provider profile will once again be visible on HealthyPrice and you will be able to receive new orders.<br/>" +
							"<br/>If you did not request this change, <a style='text-decoration:none;' href='http://www.healthyprice.com/page/contact_us'>please contact HealthyPrice</a>."
							#"<br/><i>[You had your account on hold since " + last_onhold_date.strftime("%m/%d/%Y") + "]</i>"
						Emailer.deliver_admin_account_onhold(recipient, subject, message)
						#==========================================================
					end
					result = session[:doctor].save(false)
					#@error += result.inspect + ":" + session[:doctor].onhold.inspect
				end
			elsif params[:doctor][:closed] == "1"
				sql = "SELECT COUNT(*) AS number_of_orders "
				sql += "FROM orders o, doctor_services ds, doctors d, specialty_services ss "
				sql += "WHERE ds.id = o.doctor_service_id "
				sql += "AND d.id = ds.doctor_id "
				sql += "AND ss.id = ds.specialty_service_id "
				sql += "AND (orderstatus <> 'Fulfilled' AND orderstatus <> 'Closed') "
				sql += "AND d.id = " + current_user.id.inspect
				orders = Order.find_by_sql(sql)
				if orders[0].number_of_orders == "0"
					#session[:doctor].enabled = 0
					#result = session[:doctor].save(false)
					#@error += result.inspect
					#==========================================================
					session[:doctor].enabled_note = "This account was disabled by Provider"
					session[:doctor].enabled_date = Time.new
					session[:doctor].save(false)
					#==========================================================
					ActiveRecord::Base.connection.execute("UPDATE doctors SET enabled = 0 WHERE id = " + session[:doctor].id.inspect)
					#==========================================================
					recipient = session[:doctor].email
					subject = "Your HealthyPrice Account Has Been Closed"
					message ="Dear " + session[:doctor].title + " " + session[:doctor].first_name + " " + session[:doctor].last_name + ",<br/>" +
						"<br/>As requested by you, we have closed your HealthyPrice account (Provider ID:" + session[:doctor].id.inspect + ").<br/>" +
						"<br/>If you did not request this change, <a style='text-decoration:none;' href='http://www.healthyprice.com/page/contact_us'>please contact HealthyPrice</a>.<br/>" +
						"<br/>Thank you for being part of HealthyPrice."
					Emailer.deliver_admin_account_onhold(recipient, subject, message)
					#==========================================================
					redirect_to '/doctor_section/closed'
					#@error += message
				else
					@error += "<li>" + "Your account cannot be closed as you have " + orders[0].number_of_orders + " unresolved orders. Please place your account on hold and resolve all outstanding orders." + "</li>"
				end
			end
			@error += "</ul>"
			@error = @error.gsub("<ul></ul>", "")
		end
		@currentTab = "Dashboard"
	end

	def dashboard
		index
		render :action => 'index'
	end

	def closed
	end

end