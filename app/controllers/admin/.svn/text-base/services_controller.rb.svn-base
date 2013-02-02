class Admin::ServicesController < Admin::AdminController

	def index
		redirect_to "/admin/specialties"
	end

	def list
		redirect_to "/admin/specialties"
	end

	def show
		if params[:_method] == "delete"
			sql = "DELETE FROM specialty_services WHERE id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
			sql = "DELETE FROM doctor_services WHERE specialty_service_id = " + params[:id]
			ActiveRecord::Base.connection.execute(sql)
			redirect_to "/admin/specialties"
		else
			@record = SpecialtyService.find(params[:id])
		end
	end

	def update
		@Error = ""
		if params[:record][:service_name] == ""
			@Error = "Please enter a Procedure or Service Name.<br/>"
		elsif params[:record][:service_description] == ""
			@Error = "Please enter a Procedure or Service Description.<br/>"
		elsif !isNumeric(params[:record][:doctor_price])
			@Error = "Please enter a numericvalue for the Provider Price.<br/>"
		elsif !isNumeric(params[:record][:customer_price])
			@Error = "Please enter a numericvalue for the Customer Price.<br/>"
		elsif !isNumeric(params[:record][:sort_order])
			@Error = "Please enter a numericvalue for the Sort Order.<br/>"
		end
		@record = SpecialtyService.find(params[:record][:id])
		if @Error == ""
			@record.update_attributes(params[:record])
			@record.save()
			redirect_to "/admin/specialty_services/"+params[:specialty_id]
		end
	end

  active_scaffold :specialty_services do |config|
    config.list.per_page = 50
    config.columns = [:specialty_id, :service_name, :service_description, :doctor_price, :customer_price, :sort_order, :note_id]
    config.list.columns = [:service_name, :service_description, :doctor_price, :customer_price]
    config.label = 'Procedures & Services'
    config.theme = :blue
    #config.nested.add_link("Doctors", [:doctors])
  end

=begin
  active_scaffold :services do |config|
    config.list.per_page = 50
    config.columns = [:name,:description]
    config.label = 'Procedures & Services'
    config.theme = :blue
  end
=end

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
