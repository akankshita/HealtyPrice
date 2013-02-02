class PagesController < ActionController::Base

  layout 'pages'
  helper :all
  helper_method :current_user_session, :current_user

  def show
    @page = Page.find_by_slug_or_filename(params[:slug])
    if !@page.nil?
      respond_to do |format| 
        format.html {
          render :layout => false if (request.xhr?) 
        }
        format.js { render :layout => false }
      end
    else
      render :status => '404', :file => 'public/404.html'
    end
  end

=begin
  def terms_and_conditions_popup
    @page = Page.find_by_slug_or_filename("terms__conditions")
    if !@page.nil?
      respond_to do |format| 
        format.html {
          render :layout => false if (request.xhr?) 
        }
        format.js { render :layout => false }
      end
    else
      render :status => '404', :file => 'public/404.html'
    end
  end
=end

private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  def current_user
    return @current_user if defined?(@current_user)
    if current_user_session != nil
	if current_user_session.doctor != nil
		@current_user = current_user_session && current_user_session.doctor
	else
		@current_user = current_user_session && current_user_session.admin
	end
    end
    #return @current_user
  end

end