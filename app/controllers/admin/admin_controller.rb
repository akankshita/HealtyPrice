class Admin::AdminController < ApplicationController

  include SslRequirement

  layout 'admin'
  before_filter :require_user

#if you are using local host you have to commented this
   def ssl_required?
	   if get_config("SSL") == "true"
	     true
	   else
	    false
	  end
  end

  def index
    redirect_to admin_orders_path()
  end

end