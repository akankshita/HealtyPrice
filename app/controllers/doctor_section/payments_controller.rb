require 'rubygems'
require 'active_record'

class DoctorSection::PaymentsController < DoctorSection::DashboardController
	layout "doctor", :except=>[:payment]

	def index

	  number_of_records_per_page = 15
	  if current_user == nil
		  redirect_to new_user_session_path
	  end
		#===============================================================
		sql1 = "SELECT id, created_at, total_amount "
		sql = "FROM doctor_payments "	# o, doctor_payments dp
		sql += "WHERE doctor_id = " + current_user.id.inspect + " "
		#----------------------------------------------------------------
		if params[:page] == nil
			redirect_to "/doctor_section/payments/page1"
		end
		if params[:search] != nil && params[:search][:query] != nil
			@title = "Search Results (" + params[:search][:query] + ")"
			if params[:clear] != nil || params[:search][:query] == ""
				session[:query] = nil
			else
				query = params[:search][:query]
				session[:query] = query
			end
		end
		if session[:query] != nil
			@title = "Search Results (" + session[:query] + ")"
			query = session[:query]
			if query.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/)
				query = query.split("/")
				sql += "AND created_at >= DATE('"+query[2]+"-"+query[0]+"-"+query[1]+"') AND created_at < DATE('"+query[2]+"-"+query[0]+"-"+(query[1].to_i+1).inspect+"') "
			else
				query = query.gsub(/[$ ,]/, "")
				sql += "AND (id = '"+query+"' OR total_amount = '"+query+
					"' OR id IN (SELECT doctor_payments_id FROM orders WHERE id = '"+query+"'))"
			end
		end
		sql += "ORDER BY id DESC"
		###### Pagination -
		number_of_records = Order.find_by_sql("SELECT COUNT(*) AS RowCount " + sql)[0].RowCount.to_i
		number_of_pages = (number_of_records.to_f  / number_of_records_per_page).ceil
		@pagination_code = "Page: "
		if params[:page] == nil
			sql_limit = " LIMIT 0, " + number_of_records_per_page.inspect
			(1..number_of_pages).each do |i|
				@pagination_code += "<a href='page"+i.inspect+"'> "+i.inspect+" </a>&nbsp;"
			end
		else
			current_page = params[:page].gsub("page", "").to_i
			@Error = "You are viewing a page out of range." if current_page > number_of_pages
			sql_limit = " LIMIT " + ((current_page - 1) * number_of_records_per_page).inspect + ", " + number_of_records_per_page.inspect
			@pagination_code += "<a href='page"+(current_page-1).inspect+"'> Prev </a>&nbsp;"		if current_page > 1
			if current_page < 3
				from = 1
				to = 5
			elsif current_page > number_of_pages - 3
				from = number_of_pages - 4
				to = number_of_pages
			else
				from = current_page - 2
				to = current_page + 2
			end
			to = number_of_pages 	if to > number_of_pages
			from = 1 				if from < 1
			@pagination_code += "<a href='page1'> 1 </a>... &nbsp;"		if current_page > 6
			(from..to).each do |i|
				if i == current_page
					@pagination_code += "<b> "+i.inspect+" </b>&nbsp;"
				else
					@pagination_code += "<a href='page"+i.inspect+"'> "+i.inspect+" </a>&nbsp;"
				end
			end
			@pagination_code += " ... <a href='page"+number_of_pages.inspect+"'> "+number_of_pages.inspect+" </a>&nbsp;"	if current_page < number_of_pages - 5
			@pagination_code += "<a href='page"+(current_page+1).inspect+"'> Next </a>&nbsp;"						if current_page < number_of_pages
		end
		@orders = Order.find_by_sql(sql1 + sql + sql_limit)
		@sql = sql1 + sql + sql_limit
		@pagination_code = "" if @pagination_code == "Page:<b> 1 </b>&nbsp;"
		###### Pagination -
		@currentTab = "Dashboard"
	end

	def payment
		@orders = Order.find_by_sql("SELECT o.id, o.number, o.first_name, o.last_name, o.created_at, o.doctor_price, service_name AS service, spc.name AS specialty " +
							    "FROM orders o, doctor_services ds, doctors d, specialty_services ss, specialties spc " +
							    "WHERE o.doctor_service_id = ds.id " +
								"AND ds.doctor_id = d.id " +
								"AND ss.id = ds.specialty_service_id " +
								"AND spc.id = ss.specialty_id " +
								"AND doctor_payments_id = " + params[:id])
		@currentTab = "Dashboard"
	end

  #active_scaffold :orders do |config|
  #  config.list.per_page = 50
  #  config.columns = [:id, :doctor_service_id, :first_name,:last_name, :phone, :number, :pin, :billing_code, :submitted, :created_at, :updated_at]
  #  config.label = 'Orders'
  #  config.theme = :blue
  #end

end
