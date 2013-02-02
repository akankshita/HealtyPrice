class Admin::ProvidersController < Admin::AdminController

	def index
		@sql = "SELECT * " +
				"FROM doctors d " +
				"WHERE user_type = 'Doctor' " +
				"ORDER BY id DESC"
		@doctors = Doctor.find_by_sql(@sql)
	end

	def provider_specialities
		@sql = "SELECT s.id, s.name, s.description " +
				"FROM doctors d, doctor_specialties ds, specialties s " +
				"WHERE d.id = ds.doctor_id AND ds.specialty_id = s.id " +
				"AND d.id = " + params[:doc_id] + " "
				"ORDER BY s.id DESC"
		@provider_specialities = Specialty.find_by_sql(@sql)
		@all_specialities = Specialty.find(:all)
		@doc_name = Doctor.find(params[:doc_id]).name
		render (:layout=>false)
	end

	def provider_services
		@sql = "SELECT * " +
				"FROM specialty_services, doctor_services " +
				"WHERE specialty_services.id = doctor_services.specialty_service_id" +
				" AND doctor_services.doctor_id = " + params[:doc_id] +
				" AND specialty_id = " + params[:spc_id] +
				" ORDER BY sort_order, service_name"
		@sql2 = "SELECT * " +
				"FROM specialty_services " +
				"WHERE specialty_id = " + params[:spc_id] +
				" ORDER BY service_name"
		@all_specialty_services = SpecialtyService.find_by_sql(@sql2)
		@specialty_services = SpecialtyService.find_by_sql(@sql)
		@paname = Doctor.find_by_sql("SELECT `name` AS specialty_name FROM specialties WHERE id = " + params[:spc_id])
		@doc_name = Doctor.find(params[:doc_id]).name
		render (:layout=>false)
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
	end

end
