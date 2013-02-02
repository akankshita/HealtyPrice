class UserSession < Authlogic::Session::Base
  authenticate_with Doctor

end
