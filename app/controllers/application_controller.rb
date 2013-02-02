# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  include SimpleCaptcha::ControllerHelpers
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details
  filter_parameter_logging :password, :password_confirmation
  helper_method :current_user_session, :current_user
#i comment it
  #before_filter :check_uri

  include SslRequirement

  def ssl_required?
  false
  end

  #def state_abbr(state_code)
  # state_abbr = {  'AL' => 'Alabama',  'AK' => 'Alaska',  'AS' => 'America Samoa',  'AZ' => 'Arizona',  'AR' => 'Arkansas',  'CA' => 'California',  'CO' => 'Colorado',  'CT' => 'Connecticut',  'DE' => 'Delaware',  'DC' => 'District of Columbia',  'FM' => 'Micronesia1',  'FL' => 'Florida',  'GA' => 'Georgia',  'GU' => 'Guam',  'HI' => 'Hawaii',  'ID' => 'Idaho',  'IL' => 'Illinois',  'IN' => 'Indiana',  'IA' => 'Iowa',  'KS' => 'Kansas',  'KY' => 'Kentucky',  'LA' => 'Louisiana',  'ME' => 'Maine',  'MH' => 'Islands1',  'MD' => 'Maryland',  'MA' => 'Massachusetts',  'MI' => 'Michigan',  'MN' => 'Minnesota',  'MS' => 'Mississippi',  'MO' => 'Missouri',  'MT' => 'Montana',  'NE' => 'Nebraska',  'NV' => 'Nevada',  'NH' => 'New Hampshire',  'NJ' => 'New Jersey',  'NM' => 'New Mexico',  'NY' => 'New York',  'NC' => 'North Carolina',  'ND' => 'North Dakota',  'OH' => 'Ohio',  'OK' => 'Oklahoma',  'OR' => 'Oregon',  'PW' => 'Palau',  'PA' => 'Pennsylvania',  'PR' => 'Puerto Rico',  'RI' => 'Rhode Island',  'SC' => 'South Carolina',  'SD' => 'South Dakota',  'TN' => 'Tennessee',  'TX' => 'Texas',  'UT' => 'Utah',  'VT' => 'Vermont',  'VI' => 'Virgin Island',  'VA' => 'Virginia',  'WA' => 'Washington',  'WV' => 'West Virginia',  'WI' => 'Wisconsin',  'WY' => 'Wyoming'}
  # state_abbr[state_code]
  #end

  #def state_code(state_name)
  # state_code = {  'Alabama' => 'AL',  'Alaska' => 'AK',  'America Samoa' => 'AS',  'Arizona' => 'AZ',  'Arkansas' => 'AR',  'California' => 'CA',  'Colorado' => 'CO',  'Connecticut' => 'CT',  'Delaware' => 'DE',  'District of Columbia' => 'DC',  'Micronesia1' => 'FM',  'Florida' => 'FL',  'Georgia' => 'GA',  'Guam' => 'GU',  'Hawaii' => 'HI',  'Idaho' => 'ID',  'Illinois' => 'IL',  'Indiana' => IN'',  'Iowa' => 'IA',  'Kansas' => 'KS',  'Kentucky' => 'KY',  'Louisiana' => 'LA',  'Maine' => 'ME',  'Islands1' => 'MH',  'Maryland' => 'MD',  'Massachusetts' => 'MA',  'Michigan' => 'MI',  'Minnesota' => 'MN',  'Mississippi' => 'MS',  'Missouri' => 'MO',  'Montana' => 'MT',  'Nebraska' => 'NE',  'Nevada' => 'NV',  'New Hampshire' => 'NH',  'New Jersey' => 'NJ',  'New Mexico' => 'NM',  'New York' => 'NY',  'North Carolina' => 'NC',  'North Dakota' => 'ND',  'Ohio' => 'OH',  'Oklahoma' => 'OK',  'Oregon' => 'OR',  'Palau' => 'PW',  'Pennsylvania' => 'PA',  'Puerto Rico' => 'PR',  'Rhode Island' => 'RI',  'South Carolina' => 'SC',  'South Dakota' => 'SD',  'Tennessee' => 'TN',  'Texas' => 'TX',  'Utah' => 'UT',  'Vermont' => 'VT',  'Virgin Island' => 'VI',  'Virginia' => 'VA',  'Washington' => 'WA',  'West Virginia' => 'WV',  'Wisconsin' => 'WI',  'Wyoming' => 'WY'}
  # state_code[state_name]
  #end

private
  def current_user_session
    return @current_user_session if defined?(@current_user_session)
    @current_user_session = UserSession.find
  end

  #def index
  #redirect_to "www.google.com"
  #end

 #  def check_uri
  # #if you are using in local system just coment the www here
 #  redirect_to "http://www." + request.host_with_port + request.request_uri if !/^www/.match(request.host)
  # # here also need to change  use it while using in local system
 #  #redirect_to "https://" + request.host_with_port + request.request_uri  if request.protocol != "https://"
  
 #  end

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

  def require_user
     unless current_user
       store_location
       flash[:notice] = "You must be logged in to access this page"
       redirect_to new_user_session_url
       return false
     end
   end

   def require_no_user
     if current_user
       store_location
       flash[:notice] = "You must be logged out to access this page"
       redirect_to "/"
       return false
     end
   end
   
   def store_location
     session[:return_to] = request.request_uri
   end
   
   def redirect_back_or_default(default)
     redirect_to(session[:return_to] || default)
     session[:return_to] = nil
   end

  def get_config(key)
  config = Specialty.find_by_sql("SELECT config_value FROM configurations WHERE config_name = '"+key+"'")
  if config.size == 0
    "Not Found"
  else
    config[0].config_value
  end
  end

  def save_search_query(from_where, what_searched)
  if !(what_searched == nil || what_searched == "")
    if !((what_searched.include? "http") || (what_searched.include? "www"))
      s_query = SearchQuery.new()
      s_query.search_box = from_where
      s_query.query = what_searched
      s_query.referrer = request.referer.to_s
      s_query.save()
    end
  end
  #session[:prev_search].from_where = from_where
  #session[:prev_search].what_searched = what_searched
  #session[:prev_search].referer = request.referer
  end

end

class JPEG
   attr_reader :width, :height, :bits

   def initialize(file)
     if file.kind_of? IO
       examine(file)
     else
       File.open(file, 'rb') { |io| examine(io) }
     end
   end

   private
   def examine(io)
     raise 'malformed JPEG' unless io.getc == 0xFF && io.getc == 0xD8 # SOI

     class << io
       def readint; (readchar << 8) + readchar; end
       def readframe; read(readint - 2); end
       def readsof; [readint, readchar, readint, readint, readchar]; end
       def next
         c = readchar while c != 0xFF
         c = readchar while c == 0xFF
         c
       end
     end

     while marker = io.next
       case marker
       when 0xC0..0xC3, 0xC5..0xC7, 0xC9..0xCB, 0xCD..0xCF # SOF markers
         length, @bits, @height, @width, components = io.readsof
         raise 'malformed JPEG' unless length == 8 + components * 3
       when 0xD9, 0xDA:  break # EOI, SOS
       when 0xFE:        @comment = io.readframe # COM
       when 0xE1:        io.readframe # APP1, contains EXIF tag
       else              io.readframe # ignore frame
       end
     end
   end
end
