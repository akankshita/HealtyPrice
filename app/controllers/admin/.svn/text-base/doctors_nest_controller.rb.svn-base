class Admin::DoctorsNestController < Admin::AdminController

	layout 'blank'

	def index
		@sql = "SELECT * " +
				"FROM doctors d, doctor_specialties dspc, specialties spc " +
				"WHERE dspc.doctor_id = d.id" +
				" AND spc.id = dspc.specialty_id" +
				" AND spc.id = " + params[:id]
		@doctors = Doctor.find_by_sql(@sql)
	end

	def doctors
		@sql = "SELECT * " +
				"FROM doctors d, doctor_services dsrv, doctor_specialties dspc, specialty_services ss " +
				"WHERE dsrv.doctor_id = d.id" +
				" AND dspc.doctor_id = d.id" +
				" AND ss.specialty_id = dspc.specialty_id" +
				" AND ss.id = dsrv.specialty_service_id" +
				" AND ss.id = " + params[:id]
		@sql = "SELECT * " +
				"FROM doctors d, doctor_specialties dspc " +
				"WHERE dspc.doctor_id = d.id" +
				" AND dspc.specialty_id = " + params[:id]
		@doctors = Doctor.find_by_sql(@sql)
		@specialty_name = Specialty.find(params[:id]).name
	end

	def doctors_fs
		@sql = "SELECT * " +
				"FROM doctors d, doctor_services dsrv " +
				"WHERE dsrv.doctor_id = d.id" +
				" AND dsrv.specialty_service_id = " + params[:id]
		@doctors = Doctor.find_by_sql(@sql)
		@specialty_name = Specialty.find(params[:spc_id]).name
		@service_name = SpecialtyService.find(params[:id]).service_name
	end

	def specialty_services
		@sql = "SELECT * " +
				"FROM specialty_services " +
				"WHERE specialty_id = " + params[:id] +
				" ORDER BY sort_order, service_name"
		@specialty_services = SpecialtyService.find_by_sql(@sql)
		@paname = Doctor.find_by_sql("SELECT `name` AS specialty_name FROM specialties WHERE id = " + params[:id])
		@sql2 = "SELECT * " +
				"FROM specialty_services " +
				"WHERE specialty_id = " + params[:id] +
				" ORDER BY service_name"
		@all_specialty_services = SpecialtyService.find_by_sql(@sql2)
		render :layout => "admin"
	end

	def specialty_services_doc
		@sql = "SELECT * " +
				"FROM specialty_services, doctor_services " +
				"WHERE specialty_services.id = doctor_services.specialty_service_id" +
				" AND doctor_services.doctor_id = " + params[:doc_id] +
				" AND specialty_id = " + params[:id] +
				" ORDER BY sort_order, service_name"
		@specialty_services = SpecialtyService.find_by_sql(@sql)
		@paname = Doctor.find_by_sql("SELECT `name` AS specialty_name FROM specialties WHERE id = " + params[:id])
		@sql2 = "SELECT * " +
				"FROM specialty_services " +
				"WHERE specialty_id = " + params[:id] +
				" AND id NOT IN (SELECT specialty_service_id FROM doctor_services WHERE doctor_id = " + params[:doc_id] + ")" +
				" ORDER BY service_name"
		@all_specialty_services = SpecialtyService.find_by_sql(@sql2)
		@doc_name = Doctor.find(params[:doc_id]).name
		render :layout => "admin"
	end

	def add_service
		@error = ""
		if params[:service_name] == "" || params[:service_name] == nil
			@error += "Please enter a Procedure or Service Name.<br/>"
		end
		if params[:service_description] == "" || params[:service_description] == nil
			@error += "Please enter a Procedure or Service Description.<br/>"
		end
		if !isNumeric(params[:provider_price])
			@error += "Please enter a numerical value for the Provider Price.<br/>"
		end
		if !isNumeric(params[:customer_price])
			@error += "Please enter a numerical value for the Customer Price.<br/>"
		end
		if !isNumeric(params[:sort_order])
			@error += "Please enter a numerical value for the Sort Order.<br/>"
		end
		if @error == ""
			sql = "INSERT INTO specialty_services(sort_order, specialty_id, service_id, service_name, service_description, doctor_price, customer_price, note_id) " +
				"VALUES("+params[:sort_order]+", "+params[:specialty_id]+", -1, '"+params[:service_name]+"', '"+params[:service_description].gsub("'", "''")+"', "+params[:provider_price]+", "+params[:customer_price]+", "+params[:display_note]+")"
			ActiveRecord::Base.connection.execute(sql)
			redirect_to '/admin/specialty_services/'+params[:specialty_id]
		else
			render :layout => "admin"
		end
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

=begin
				"SELECT * " +
				"FROM specialty_services ss, doctor_services ds " +
				"WHERE ss.id = ds.specialty_service_id " +
				"AND ds.doctor_id = " + params[:doc_id] + 
				" ORDER BY sort_order, ss.service_name"
=end
