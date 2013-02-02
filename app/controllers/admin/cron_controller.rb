#require 'rubygems'
#require 'active_record'

class Admin::CronController < ActionController::Base
#ApplicationController	#ActionController::Base	#Admin::AdminController
#layout 'admin'

	def expiring_orders_notification
		@expiring_orders = Order.find_by_sql("SELECT * FROM orders WHERE orderstatus = 'New' AND cronstatus = 0 AND created_at < ADDDATE(CURDATE(), -30)")
	end

end