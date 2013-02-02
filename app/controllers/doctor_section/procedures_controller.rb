require 'rubygems'
require 'active_record'

class DoctorSection::ProceduresController < DoctorSection::DashboardController
	def index
		#===================================================================================
		if params[:save_specialties] != nil
			ActiveRecord::Base.connection.execute("DELETE FROM doctor_specialties WHERE doctor_id = " + current_user.id.inspect)
			params[:doctor].each do |speciality|
				if speciality[0][0, 3] == "chk"
					specialityid = speciality[0].gsub("chk", "")
					# Doctor Cannot change these#######################
					#sql = "INSERT INTO doctor_specialties(specialty_id, doctor_id) " +
					#	"VALUES(" + specialityid + ", " + current_user.id.inspect + ")"
					#ActiveRecord::Base.connection.execute(sql)
					#######################################
				end
			end
			# Doctor Cannot change these#######################
			#ActiveRecord::Base.connection.execute("DELETE FROM doctor_services " +
			#			"WHERE doctor_id = " + current_user.id.inspect + " AND specialty_service_id NOT IN " +
			#				"(SELECT ss.id FROM specialty_services ss, doctor_specialties ds " +
			#				"WHERE ss.specialty_id = ds.specialty_id AND ds.doctor_id = " + current_user.id.inspect + ")")
			#######################################
		end
		#===================================================================================
		if params[:save_services] != nil
			sqlpart = ""
			@error = ""
			cannot_remove = "<ul>"
			params[:doctor].each do |service|
				if service[0][0, 3] == "chk"
					serviceid = service[0].gsub("chk", "")
					# Doctor Cannot change these#######################
					tmp = Specialty.find_by_sql("SELECT COUNT(*) AS Cou FROM doctor_services " +
										"WHERE specialty_service_id = " + serviceid +
										" AND doctor_id = " + current_user.id.inspect)
					#######################################
					if tmp[0].Cou == "0"
						# Doctor Cannot change these#######################
						sql = "INSERT INTO doctor_services(specialty_service_id, doctor_id) " +
							"VALUES(" + serviceid + ", " + current_user.id.inspect + ")"
						ActiveRecord::Base.connection.execute(sql)
						#######################################
					end
					if sqlpart == ""
						sqlpart += "specialty_service_id = " + serviceid
					else
						sqlpart += " OR specialty_service_id = " + serviceid
					end
				end
			end
			#--------------------------------------
			# Doctor Cannot change these#######################
			ActiveRecord::Base.connection.execute("DELETE FROM doctor_services WHERE doctor_id = " + current_user.id.inspect + " AND NOT (" + sqlpart + ")")
			session[:doctor] = current_user
			session[:doctor].save(false)
		end
		#===================================================================================
		if current_user == nil
			 redirect_to new_user_session_path
		else
			@specialties = Specialty.find_by_sql("SELECT id, name, description FROM specialties ORDER BY name")
			@selected_specialties = Specialty.find_by_sql("SELECT id, name, description FROM specialties, doctor_specialties " +
										"WHERE specialties.id = doctor_specialties.specialty_id " +
										"AND doctor_id = " + current_user.id.inspect + 
										" ORDER BY name")
			@services = Specialty.find_by_sql("SELECT specialty_services.id AS specialty_service_id, specialty_services.specialty_id, service_id, service_name, service_description, doctor_price " +
										"FROM specialty_services, doctor_specialties " +
										"WHERE specialty_services.specialty_id = doctor_specialties.specialty_id " +
										"AND doctor_specialties.doctor_id = " + current_user.id.inspect +
										" ORDER BY sort_order, service_name")
			sel_services = Specialty.find_by_sql("SELECT specialty_service_id FROM doctor_services WHERE doctor_id = " + current_user.id.inspect)
			@selected_services = Array.new
			sel_services.each do |sel_srv|
				@selected_services << sel_srv.specialty_service_id
			end
			@currentTab = "Procedures"
		end
	end
end