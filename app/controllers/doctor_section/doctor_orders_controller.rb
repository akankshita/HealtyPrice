require 'rubygems'
require 'active_record'

class DoctorSection::DoctorOrdersController < DoctorSection::DashboardController#Admin::AdminController
#Admin::DoctorServicesController
	def index
		docid = params[:docid]
		@docid = docid
		@orders = Order.find_by_sql("SELECT * FROM orders o, doctor_services ds WHERE o.doctor_service_id = ds.id AND submitted = 1 AND ds.doctor_id = " + docid)
		@title = "Orders for this doctor"
		@echo = ""#params[:docid]
	end

  #active_scaffold :orders do |config|
  #  config.list.per_page = 50
  #  config.columns = [:id, :doctor_service_id, :first_name,:last_name, :phone, :number, :pin, :billing_code, :submitted, :created_at, :updated_at]
  #  config.label = 'Orders'
  #  config.theme = :blue
  #end

end
