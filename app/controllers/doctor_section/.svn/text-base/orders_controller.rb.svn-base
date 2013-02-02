require 'rubygems'
require 'active_record'

class DoctorSection::OrdersController < DoctorSection::DashboardController
	def index
	  number_of_records_per_page = 15
	  if current_user == nil
		  redirect_to new_user_session_path
	  end
		if params[:page] == nil
			redirect_to "/doctor_section/orders/index/page1"
		end
		action = params[:doaction]
		checkboxes = params[:CheckedBoxes]
		chks = []
		if checkboxes != nil
			checkboxes.each(':'){|chk|
				chks << chk.chop
				sql = "UPDATE orders SET orderstatus = '" + action + "' WHERE id = " + chk.chop
				ActiveRecord::Base.connection.execute(sql)
			}
		end
		@title = "All Orders"
		#===============================================================
		sql1 = "SELECT o.id, o.number, o.first_name, o.last_name, o.created_at, o.phone, o.email, o.orderstatus, service_name AS service, spc.name AS specialty, o.doctor_payments_id "
		sql = "FROM orders o, doctors d, specialty_services ss, specialties spc "
		sql += "WHERE o.doctor_id = d.id AND ss.id = o.specialty_service_id AND spc.id = ss.specialty_id AND submitted = 1 "
		sql += "AND d.id = " + current_user.id.inspect + " "
		#sql1 = "SELECT o.id, o.number, o.first_name, o.last_name, o.created_at, o.phone, o.email, o.orderstatus, s.name AS service, spc.name AS specialty, o.doctor_payments_id "
		#sql = "FROM orders o, doctor_services ds, doctors d, specialty_services ss, services s, specialties spc "
		#sql += "WHERE o.doctor_service_id = ds.id AND ds.doctor_id = d.id AND ss.id = ds.specialty_service_id AND s.id = ss.service_id AND spc.id = ss.specialty_id AND submitted = 1 "
		#sql = sql.gsub("ds.doctor_id = d.id", "ds.doctor_id = d.id AND d.id = " + current_user.id.inspect)
		#----------------------------------------------------------------
		if params[:context] != nil
			context = params[:context]
			if context == "all"
				@title = "All Orders"
				sql += "ORDER BY o.created_at DESC"
			elsif context == "new"
				@title = "New Orders"
				sql += "AND orderstatus = 'New' ORDER BY o.created_at DESC"
			elsif context == "pending"
				@title = "Pending Orders"
				sql += "AND orderstatus = 'Pending' ORDER BY o.created_at DESC"
			elsif context == "fulfilled"
				@title = "Fulfilled Orders"
				sql += "AND orderstatus = 'Fulfilled' ORDER BY o.created_at DESC"
			elsif context == "paid"
				@title = "Paid Orders"
				sql += "AND orderstatus = 'Paid' ORDER BY o.created_at DESC"
			elsif context == "unresolved"
				@title = "Unresolved Orders"
				sql += "AND orderstatus = 'Unresolved' ORDER BY o.created_at DESC"
			elsif context == "cancelled"
				@title = "Cancelled Orders"
				sql += "AND orderstatus = 'Cancelled' ORDER BY o.created_at DESC"
			elsif context == "closed"
				@title = "Closed Orders"
				sql += "AND orderstatus = 'Closed' ORDER BY o.created_at DESC"
			end
		elsif params[:practice_area] != nil
			if params[:practice_area] == "all"
				redirect_to "/doctor_section/orders/context/all/page1"
			else
				@title = Specialty.find_by_sql("SELECT name FROM specialties WHERE id = " + params[:practice_area])[0].name	#"Selected Practice Area"
				#sql += "ORDER BY orderstatus"
				sql = sql.gsub("ds.doctor_id = d.id", "ds.doctor_id = d.id AND specialty_id = " + params[:practice_area])
				sql += "ORDER BY o.created_at DESC"
			end
		else
			if params[:search] != nil && params[:search][:query] != nil
				@title = "Search Results (" + params[:search][:query] + ")"
				if params[:clear] != nil || params[:search][:query] == nil || params[:search][:query] == ""
					session[:query] = nil
				else
					query = params[:search][:query]
					session[:query] = query
				end
				#if params[:page] == nil
				#	redirect_to "/doctor_section/orders/index/page1"
				#end
			end
			if session[:query] != nil
				@title = "Search Results (" + session[:query] + ")"
				query = session[:query]
				if query.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)[0-9]{2}/)
					query = query.split("/")
					sql += "AND o.created_at >= DATE('"+query[2]+"-"+query[0]+"-"+query[1]+"') AND o.created_at < DATE('"+query[2]+"-"+query[0]+"-"+(query[1].to_i+1).inspect+"') "
				elsif query.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.][0-9]{2}/)
					query = query.split("/")
					sql += "AND o.created_at >= DATE('20"+query[2]+"-"+query[0]+"-"+query[1]+"') AND o.created_at < DATE('20"+query[2]+"-"+query[0]+"-"+(query[1].to_i+1).inspect+"') "
				else
					sql += "AND (o.first_name LIKE '%"+query+
						  "%' OR o.last_name LIKE '%"+query+
							"%' OR o.phone LIKE '%"+query+
							"%' OR o.email LIKE '%"+query+
						       "%' OR o.number LIKE '%"+query+
					"%' OR o.doctor_payments_id LIKE '%"+query+"%') "
				end
				#sql += "ORDER BY o.created_at DESC"
			end
			sql += "ORDER BY o.created_at DESC"
		end
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
		@pagination_code = "" if @pagination_code == "Page: <b> 1 </b>&nbsp;"
		@pagination_code = "" if @pagination_code == "Page: "
		###### Pagination -
		@practice_areas = Specialty.find_by_sql("SELECT id, name FROM doctor_specialties, specialties " +
									"WHERE doctor_specialties.specialty_id = specialties.id AND doctor_id = " + current_user.id.inspect)
		@currentTab = "Orders"
	end

	def order
		orders = Order.find_by_sql("SELECT * FROM orders WHERE id = " + params[:id])
		if orders.size == 0
			redirect_to "/doctor_section/orders/context/all/page1"
		else
			@order = orders[0]
			#session[:billing_code] = nil
		end
		#----------------------------------------------------------
		if orders.size > 0 && @order.doctor.id != current_user.id
			@currentTab = "Orders"
			render :action => 'unauthorized_order'
		end
		#----------------------------------------------------------
		if params[:complete_order] != nil
			if @order.billing_code == params[:billing_code]
				@order.orderstatus = "Pending"
				@order.order_notes = "" if @order.order_notes == nil
				@order.order_notes += "Your office marked this order as fulfilled on "+Time.new.strftime("%b %d, %Y").inspect+"."
				@order.save
			else
				@error = "<ul><li>The billing code entered is not valid. Please enter the valid billing code.</li></ul>"
			end
		elsif params[:order_no_show] != nil
			#@error = "Your office marked this order a no-show on "+Time.new.strftime("%b %d, %Y")+"."
			@order.orderstatus = "Pending"
			@order.order_notes = "" if @order.order_notes == nil
			@order.order_notes += "Your office marked this order a no-show on "+Time.new.strftime("%b %d, %Y").inspect+"."
			@order.save
		end
		#----------------------------------------------------------
		@currentTab = "Orders"
	end

	def unauthorized_order
	end

  #active_scaffold :orders do |config|
  #  config.list.per_page = 50
  #  config.columns = [:id, :doctor_service_id, :first_name,:last_name, :phone, :number, :pin, :billing_code, :submitted, :created_at, :updated_at]
  #  config.label = 'Orders'
  #  config.theme = :blue
  #end

end
