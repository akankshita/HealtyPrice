class AutoFillController < ActionController::Base

	def search
		#render :text => params[:query] + ":" + params[:context]
		if params[:query] == ""
		elsif params[:context] == "test"
			sql = "SELECT 'Test 1' AS Text1 UNION SELECT 'Test 1' AS Text2 UNION SELECT 'Test 1' AS Text3"
			@List = Order.find_by_sql(sql)
		elsif params[:context] == "Doctors"
			sql = "SELECT CONCAT(first_name, ' ', last_name) AS Text1 FROM doctors " +
			"WHERE enabled = 1 AND onhold = 0 AND (first_name LIKE '"+params[:query]+"%' OR last_name LIKE '"+params[:query]+"%')"
			@List = Order.find_by_sql(sql)
		elsif params[:context] == "services-queryXOX"
			#sql = "SELECT `name` AS Text1 FROM specialties WHERE `name` LIKE '"+params[:query]+"%' UNION SELECT `name` AS Text1 FROM services WHERE `name` LIKE '"+params[:query]+"%'"
			sql = "SELECT DISTINCT `name` AS Text1 FROM specialties WHERE `name` LIKE '"+params[:query]+"%'"	#" AND LENGTH(`name`) < 21"
			sql += " UNION "
			sql += "SELECT DISTINCT `name` AS Text1 FROM services WHERE `name` LIKE '"+params[:query]+"%'"	#" AND LENGTH(`name`) < 21"
			@List = Order.find_by_sql(sql)
		elsif params[:context] == "services-query"
			#CONCAT(SUBSTRING(service_name, 1, 35), '... (', specialties.`name`, ')') AS Text1
			sql = "SELECT DISTINCT service_name AS Text0, specialties.`name` AS Text1, service_name AS Text2 FROM specialties, specialty_services " +
				"WHERE specialties.id = specialty_services.specialty_id " +
				"AND (service_name LIKE '%"+params[:query]+"%' OR specialties.`name` LIKE '%"+params[:query]+"%') ORDER BY Text1"
			@List = Order.find_by_sql(sql)
			#@Sql = sql
			render :action => "services_query"
		elsif params[:context] == "doctor_name"
			sql = "SELECT CONCAT(first_name, ' ', last_name) AS Text1 FROM doctors WHERE user_type <> 'Admin' AND enabled = 1 AND onhold = 0 AND (first_name LIKE '"+params[:query]+"%' OR last_name LIKE '"+params[:query]+"%')"
			@List = Order.find_by_sql(sql)
		elsif params[:context] == "company"
			sql = "SELECT company AS Text1 FROM doctors WHERE user_type <> 'Admin' AND enabled = 1 AND onhold = 0 AND company LIKE '"+params[:query]+"%'"
			@List = Order.find_by_sql(sql)
		end
	end

	def services_query
	end

end
