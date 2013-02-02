class Admin::SpecialtiesController < Admin::AdminController

  active_scaffold :specialties do |config|
    config.columns = [:name ,:description]
    config.columns[:description].form_ui = :textarea
    config.list.columns = [:name ,:description]
    config.list.per_page = 50
    config.label = 'Practice Areas'
    #config.nested.add_link("Procedures &amp; Services", [:specialty_services])
    #config.nested.add_link("Doctors", [:doctors])
    config.theme = :blue
  end

  def disable_for_provider
	#@message = params[:doc_id] + ":" + params[:spec_id] + ":" + params[:row_id]
	sql = "DELETE FROM doctor_specialties WHERE specialty_id = " + params[:spec_id] + " AND doctor_id = " + params[:doc_id]
	ActiveRecord::Base.connection.execute(sql)
	sql = "DELETE FROM doctor_services WHERE doctor_id = " + params[:doc_id] + " AND specialty_service_id IN (SELECT id FROM specialty_services WHERE specialty_id = " + params[:spec_id] + ")"
	ActiveRecord::Base.connection.execute(sql)
	#render (:layout=>false)
	redirect_to "/admin/doctors/" + params[:doc_id] + "/nested?&associations=specialties"
  end

  def enable_specialty_for_doctor
	sql = "INSERT INTO doctor_specialties(specialty_id, doctor_id) " +
		"VALUES(" + params[:associated_id] + ", " + params[:doctor_id] + ")"
	ActiveRecord::Base.connection.execute(sql)
	redirect_to "/admin/doctors/" + params[:doctor_id] + "/nested?&associations=specialties"
  end

end