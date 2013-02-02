class UserSessionAdmin < Authlogic::Session::Base
  authenticate_with Admin

end
