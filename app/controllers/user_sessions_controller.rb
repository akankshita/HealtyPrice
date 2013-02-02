class UserSessionsController < Admin::AdminController	#ApplicationController
  before_filter :require_no_user, :only => [:new, :create]
  before_filter :require_user, :only => :destroy
  layout 'application'
  
  def new
    #current_user_session.destroy if current_user_session != nil
    @user_session = UserSession.new
    #@user_session.title = "Undefined"
  end
  
  def create
   
    @user_session = UserSession.new(params[:user_session])
    if @user_session.save
      @usertitle = Doctor.find_by_email(params[:user_session][:email])
      #flash[:notice] = "Login successful!"
      #redirect_back_or_default doctor_section_root_url
      if @usertitle.user_type == "Admin"
	      redirect_to "/admin"
      else
	      redirect_to "/doctor_section"
      end
    else
      #flash[:notice] = "Wrong Username or Password!"
      @error = "<ul><li>Incorrect email address or password!</li></ul>"
      render :action => :new
    end
  end
  
#  def admin
#    #current_user_session.destroy if current_user_session != nil
#    @user_session = UserSessionAdmin.new
#  end
#  
#  def create_admin
#    @user_session = UserSessionAdmin.new(params[:user_session])
#    if @user_session.save
#      #flash[:notice] = "Login successful!"
#      redirect_back_or_default admin_root_url
#    else
#      #flash[:notice] = "Wrong Username or Password!"
#      @error = "<ul><li>Wrong Username or Password!</li></ul>"
#      render :action => :admin
#    end
#  end
  
  def destroy
    current_user_session.destroy
    session[:doctor] = nil
    session[:order_credit_card_override] = nil
    session[:order_cvv_override] = nil
    session[:pay_cc] = nil
    session[:order] = nil
    #flash[:notice] = "Logout successful!"
    #redirect_back_or_default new_user_session_url
    redirect_to '/login'
  end
end