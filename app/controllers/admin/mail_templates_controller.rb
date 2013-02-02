class Admin::MailTemplatesController < Admin::AdminController#ApplicationController
  layout 'admin'
  before_filter :require_user
#<%  %>

	def index
		#@path = Dir.pwd + '/app/views/emailer/'
		@path = Dir.pwd + '/public/mail_templates/'
		@contains = Dir.new(@path).entries
	end

	def update
		#@path = Dir.pwd + '/app/views/emailer/'
		@path = Dir.pwd + '/public/mail_templates/'
		File.open(@path + params[:file_name] + ".html.erb", 'w') do |f2|
		  f2.puts params[:file_content]
	  end
	  #render :action => :index
	  redirect_to "/admin/mail_templates"
	end

	def create_new
		#@path = Dir.pwd + '/app/views/emailer/'
		@path = Dir.pwd + '/public/mail_templates/'
		File.open(@path + params[:file_name] + ".html.erb", 'w') do |f2|
		  f2.puts params[:file_content]
	  end
	  #render :action => :index
	  redirect_to "/admin/mail_templates"
	end

	def new_template
	end

end
