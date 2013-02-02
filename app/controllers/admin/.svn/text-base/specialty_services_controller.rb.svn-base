class Admin::SpecialtyServicesController < Admin::AdminController
# tmp_array1 = Array.new
# tmp_array2 = Array.new
# tmp_array = Array.new
#  @specialty = Specialty.find(:all)
#  @specialty.each do |drprice|
#
#
#      tmp_array1 << drprice.id
#      tmp_array2 << drprice.name
#
#  end

  active_scaffold :specialty_services do |config|
    config.list.per_page = 50
    # config.columns = [:specialty_service]
    # columns[:specialty_service].label = "Procedures & Services"
    # config.label = 'Procedures & Services'
    config.theme = :blue
  end

  def enable_for_provider
	#@message = params[:doc_id] + ":" + params[:spec_id] + ":" + params[:row_id]
	@tmp = SpecialtyService.find_by_sql("SELECT COUNT(*) AS count FROM doctor_services WHERE doctor_id = " + params[:doc_id] + " AND specialty_service_id = " + params[:spc_srv_id])
	@message = ""	#+ @tmp[0].count
	if @tmp[0].count == "0"
		sql = "INSERT INTO doctor_services(doctor_id, specialty_service_id) VALUES(" + params[:doc_id] + ", " + params[:spc_srv_id] + ")"
		ActiveRecord::Base.connection.execute(sql)
	else
		@message = "This service is already enabled for this doctor/provider."
	end
	#render (:layout=>false)
	redirect_to "/admin/specialty_services_doc/" + params[:spc_id] + "/" + params[:doc_id]
  end

  def disable_for_provider
	#@message = params[:doc_id] + ":" + params[:spec_id] + ":" + params[:row_id]
	sql = "DELETE FROM doctor_services WHERE specialty_service_id = " + params[:spc_srv_id] + " AND doctor_id = " + params[:doc_id]
	ActiveRecord::Base.connection.execute(sql)
	@sql = sql
	#render (:layout=>false)
	redirect_to "/admin/specialty_services_doc/" + params[:spc_id] + "/" + params[:doc_id]
  end

end