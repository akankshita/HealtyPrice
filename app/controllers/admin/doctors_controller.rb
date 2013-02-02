class Admin::DoctorsController < Admin::AdminController
  active_scaffold :doctors do |config|
    config.columns = [:title, :first_name,:middle_name, :last_name,:email,:date_of_birth,:fax,:tax_id,:tax_id_type,
                      :company,:description, :address,:address2, :city, :state, :zipcode, :phone, :website , :Hold?, :Enabled?,
                      :password, :password_confirmation,:public_phone, :medical_school,:type_of_degree, :medical_license_state,
                      :license_no,:medical_license_type,:spanish,:other_languages,
                      :mailing_address,:mailing_address2,:mailing_city,:mailing_state,:mailing_zipcode
                      ]
    config.list.columns = [:id, :name, :company, :city, :state, :zip, :phone, :Hold?, :Actv?, :modified]
    config.nested.add_link("Practice Areas", [:specialties])
    #config.nested.add_link("Services", [:doctor_services])
    #config.columns[:onholds].label = 'Hold?'
    #config.columns[:enabled].label = 'Enabled?'
    #config.actions.swap :search, :field_search
    config.label ='Providers'
    #config.columns[:onhold].form_ui = :checkbox
    config.columns[:description].form_ui = :textarea
    config.columns[:password].form_ui = :password
    config.columns[:password_confirmation].form_ui = :password
    config.columns[:password].description = "(if not changing password, leave both fields blank)"
    config.columns[:date_of_birth].description = "(mm/dd/yyyy)"
    config.columns[:graduated_year].description = "(yyyy)"
    config.columns[:medical_license_type].description = "(Optional)"
    config.columns[:other_languages].description = "(Optional)"
    config.columns[:spanish].description = "(other than English)"
    config.columns[:zipcode].description = "(12345-6789)"
    config.columns[:mailing_zipcode].description = "(12345-6789)"
    config.columns[:fax].description = "(123-123-1234 x1)"
    #config.columns[:onhold].options = [['1', '1'], ['0', '0']]
    #config.columns[:enabled].form_ui = :checkbox
    config.columns[:title].form_ui = :select
    config.columns[:title].options = [['Dr','Dr'], ['Mr','Mr'], ['Mrs','Mrs'], ['Ms','Ms'], ['<blank>','<blank>']]
    config.columns[:enabled].options = [['1', '1'], ['0', '0']]
    config.columns[:spanish].form_ui = :checkbox
    config.columns[:spanish].options = [['1', '1'], ['0', '0']]
    config.columns[:tax_id_type].form_ui = :radio
    #config.columns[:tax_id_type].options = [['1', '1'], ['0', '0']]

#    config.update.columns.add_subgroup "Personal Information" do |Personal_group|
#      Personal_group.add :title, :first_name, :middle_name,:last_name,:email,:date_of_birth,
#                         :phone,:public_phone,:fax,:tax_id,:tax_id_type
#    end
#
#    config.update.columns.add_subgroup "Qualifications" do |Qualifications_group|
#      Qualifications_group.add :medical_school, :type_of_degree, :graduated_year,:medical_license_state,:license_no,
#                               :medical_license_type,:spanish,:other_languages
#    end
#
#    config.update.columns.add_subgroup "Your Practice" do |Practice_group|
#      Practice_group.add :company, :address, :address2,:city,:state,:zipcode,
#                         :mailing_address,:mailing_address2,:mailing_city,:mailing_state,
#                         :mailing_zipcode,:website,:description
#    end
#
#    config.update.columns.add_subgroup "Account Status" do |name_group|
#      name_group.add :onhold, :enabled
#    end
#
#    config.update.columns.add_subgroup "Password Change" do |pass_group|
#      pass_group.add :password, :password_confirmation
#    end

    config.list.per_page = 20
    config.theme = :blue
    config.list.sorting = [:id => 'DESC']
    #config.list.sorting = [:name => 'DESC']

    config.search.columns << :id

  end

  #def delete
	#params[:id]
  #end

  def delete_doctor
=begin
	if params[:_method] == "delete"
	end
=end
	sql = "DELETE FROM doctor_specialties WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM doctor_services WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM doctor_photos WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM doctor_references WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM hospital_affiliations WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM insurance_carriers WHERE doctor_id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	sql = "DELETE FROM doctors WHERE id = " + params[:id]
	ActiveRecord::Base.connection.execute(sql)
	# =====
	redirect_to "/admin/doctors"
  end

# def update
#    p params[:id]
#    @doctor= Doctor.new(params[:person])
#    render :text=>params[:id]
#  end

end