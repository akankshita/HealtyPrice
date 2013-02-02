class SearchController < ApplicationController
  def services_x
    respond_to do |format|
      format.html {
        @specialty_id  = (params[:specialty_id] != 'all' ? params[:specialty_id] : '').to_s
    		@specialties = [['All Practice Areas','all']] + Specialty.all.collect{|s| [s.name, s.id.to_s]}
    		@query = params[:query]
      }
      format.js {
        specialty_id = (params[:specialty_id] == 'all' ? nil : params[:specialty_id])
        @specialty_services = SpecialtyService.search(params[:query], specialty_id)
        render :partial => 'services_results'
      }
    end
  end

  def services
    respond_to do |format|
      format.html {
        @specialty_id  = (params[:specialty_id] != 'all' ? params[:specialty_id] : '').to_s
    	@query = params[:query]
    	#@specialties = [['All Practice Areas','all']] + Specialty.all.collect{|s| [s.name, s.id.to_s]}
	@specialties = Specialty.find_by_sql("SELECT id, `name` FROM specialties ORDER BY `name`")
	save_search_query("homepage", params[:query])
      }
      format.js {
        specialty_id = (params[:specialty_id] == 'all' ? nil : params[:specialty_id])
	qpart = ""
	query = ""
	query = params[:query] + " ." if params[:query] != nil
	if query == "search ."
		query = ""
	end
	query = query.gsub("%20", " ")
	if query != nil && query != ""
		array1 = query.split(' ')
		for i in (0..array1.size-2)
			qw = array1[i]
			if qpart == ""
				#qpart += "(srv.name LIKE '%"+qw+"%'" + " OR sp.name LIKE '%"+qw+"%')"
				qpart += "(service_name LIKE '%"+qw+"%'" + " OR sp.name LIKE '%"+qw+"%')"
			else
				#qpart += " AND (srv.name LIKE '%"+qw+"%'" + " OR sp.name LIKE '%"+qw+"%')"
				qpart += " AND (service_name LIKE '%"+qw+"%'" + " OR sp.name LIKE '%"+qw+"%')"
			end
		end
	end
	sql = "SELECT ss.id AS id, ss.customer_price AS customer_price, ss.service_name AS srv_name, ss.service_description AS description, sp.name AS sp_name " +
		"FROM specialty_services ss, specialties sp " +
		"WHERE ss.specialty_id = sp.id"
	if params[:specialty_id] == 'all'
		if qpart != ""
			sql += " AND ("+qpart+")"
		end
		selected_specialty = "All"
	else
		sql += " AND specialty_id = " + params[:specialty_id]
		if qpart != ""
			sql += " AND ("+qpart+")"
			#sql += " AND ("+qpart+") OR ("+qpart.gsub("srv.name", "sp.name")+")"
		end
		selected_specialty = Specialty.find_by_sql("SELECT name FROM specialties WHERE id = " + params[:specialty_id])[0].name
	end
	sql += " ORDER BY sp_name, sort_order, srv_name"
	@specialty_services = SpecialtyService.find_by_sql(sql)
	@sql = sql + ":" + query
		# + params[:query]
        render :partial => 'services_results'
	if params[:query] != "search"
		save_search_query("services_procedures", "[" + selected_specialty + "] " + params[:query])
	elsif selected_specialty != "All"
		save_search_query("services_procedures", "[" + selected_specialty + "] All")
	end
      }
    end
  end
  
  def specialties
    @specialties = SpecialtyService.find_by_sql("SELECT COUNT(*) as services_count, s.name, s.description, s.id FROM specialty_services, specialties s WHERE specialty_services.specialty_id = s.id GROUP BY specialty_id ORDER BY s.name")
  end
  
  def doctors
    respond_to do |format|
      format.html {}
      format.js {
	@doctors = Doctor.search(params[:doctor_name],params[:zipcode],params[:city_state],params[:company],params[:spanish])
	render :partial => 'doctors_results'
      }
    end
  end
  
  def search_doctor_name
    @doctor_name_query = params[:query]
    respond_to do |format|
      format.html {
        @submit_search = 'doctor_name'
        render :action => 'doctors'
      }
      format.js {
        if params[:query] == "show_all"
		qpart = "SELECT * FROM doctors "
		if params[:spanish] == "true"
			qpart += "WHERE spanish = 1 "
		end
		qpart += "ORDER BY last_name, first_name, middle_name"
		@doctors = Doctor.find_by_sql(qpart)
	else
		qpart = ""
		query = params[:query] + " ."
		query = query.gsub("%20", " ")
		query = query.gsub("   ", " ")
		query = query.gsub("  ", " ")
		array1 = query.split(' ')
		for i in (0..array1.size-2)
			qw = array1[i]
			if qpart == ""
				qpart += "(first_name LIKE '%"+qw+"%' OR last_name LIKE '%"+qw+"%'"
			else
				qpart += " OR first_name LIKE '%"+qw+"%' OR last_name LIKE '%"+qw+"%'"
			end
		end
		qpart += ")"
		if params[:spanish] == "true"
			qpart += " AND spanish = 1"
		end
		@doctors = Doctor.find(:all, :conditions => qpart)
	end
	@sql = qpart
        render :partial => 'doctors', :layout => false
      }
    end
    tmp_str = params[:query]
    tmp_str = tmp_str + " [Spanish]" if params[:spanish] == "true"
    save_search_query("doctor_provider-name", tmp_str)
  end

  def search_doctors_company
    @company_name_query = params[:query]
    respond_to do |format|
      format.html {
        @submit_search = 'company_name'
        render :action => 'doctors'
      }
      format.js {
##############################################333
		qpart = ""
		query = params[:query] + " ."
		query = query.gsub("%20", " ")
		query = query.gsub("   ", " ")
		query = query.gsub("  ", " ")
		array1 = query.split(' ')
		for i in (0..array1.size-2)
			qw = array1[i]
			if qpart == ""
				qpart += "(company LIKE '%"+qw+"%'"
			else
				qpart += " OR company LIKE '%"+qw+"%'"
			end
		end
		qpart += ")"
		if params[:spanish] == "true"
			qpart += " AND spanish = 1"
		end
		@doctors = Doctor.find(:all, :conditions => qpart)
##############################################333
=begin
	if params[:spanish] == "true"
		@doctors = Doctor.find(:all, :conditions => "company like '%" + @company_name_query + "%' AND spanish = 1")
	else
		@doctors = Doctor.find(:all, :conditions => ['company like ?',"%#{@company_name_query}%"])
	end
=end
        render :partial => 'doctors', :layout => false
      }
    end
    tmp_str = params[:query]
    tmp_str = tmp_str + " [Spanish]" if params[:spanish] == "true"
    save_search_query("doctor_provider-practice", tmp_str)
  end

  def search_doctors_zipcode
    @zipcode = params[:zipcode]
    respond_to do |format|
      format.html {
        @submit_search = 'zipcode'
        render :action => 'doctors'
      }
      format.js {
	if params[:spanish] == "true"
		@doctors = Doctor.find(:all, :origin => @zipcode, :within => 100, :order => 'distance', :conditions => ['spanish = 1'])
	else
		@doctors = Doctor.find(:all, :origin => @zipcode, :within => 100, :order => 'distance')
	end
        render :partial => 'doctors', :layout => false
      }
    end
    tmp_str = params[:zipcode]
    tmp_str = tmp_str + " [Spanish]" if params[:spanish] == "true"
    save_search_query("doctor_provider-zip", tmp_str)
  end
  
  def search_doctors_city_state
    @city = params[:city]
    @state = params[:state]

    respond_to do |format|
      format.html {
        @submit_search = 'city_state'
        render :action => 'doctors'
      }
      format.js {
	if params[:spanish] == "true"
		@doctors = Doctor.find(:all, :origin => "#{@city}, #{@state}", :within => 100, :order => 'distance', :conditions => ['spanish = 1'])
	else
		@doctors = Doctor.find(:all, :origin => "#{@city}, #{@state}", :within => 100, :order => 'distance')
	end
        render :partial => 'doctors', :layout => false
      }
    end
    tmp_str = params[:city] + " " + params[:state]
    tmp_str = tmp_str + " [Spanish]" if params[:spanish] == "true"
    save_search_query("doctor_provider-city_state", tmp_str)
  end

end