class Doctor < ActiveRecord::Base
  acts_as_mappable :auto_geocode=>{:field=>:full_address}

  acts_as_authentic do |c|
    c.session_class = UserSession
  end

  has_and_belongs_to_many :specialties, :join_table => "doctor_specialties"
  has_many :doctor_services
  has_many :specialty_services, :through => :doctor_services

  has_one :headshot, :conditions => {:photo_type => :headshot}, :class_name => 'DoctorPhoto'
  has_one :clinic_photo, :conditions => {:photo_type => :clinic}, :class_name => 'DoctorPhoto'

#----------------------------------------------
#-------------------------------------


#  validates_uniqueness_of :email
#  validates_format_of :email, :with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
#  validates_presence_of :email
#  validates_presence_of :first_name
#  validates_presence_of :middle_name
#  validates_presence_of :last_name
#  validates_presence_of :date_of_birth
#  validates_presence_of :phone
#  validates_presence_of :fax
#  validates_presence_of :medical_school
#  validates_presence_of :type_of_degree
#  validates_presence_of :graduated_year
#  validates_presence_of :medical_license_state
#  validates_presence_of :license_no
#  validates_presence_of :company, :city,:state,:zipcode, :address, :mailing_address, :mailing_city, :mailing_state,
#                        :mailing_zipcode,:description, :insurance_carrier, :insurance_policy_no, :insurance_expiry_date
  validates_length_of :password, :within => 6..40 ,:on => :create

  def name
    [self.title, self.first_name, self.last_name].join(" ")
  end

  def full_address
    [self.address, self.address2, self.city, ",", self.state, self.zipcode].join(" ")
  end

  def state_code
	if self.state == 'Alabama'
		'AL'
	elsif self.state == 'Alaska'
		'AK'
	elsif self.state == 'America Samoa'
		'AS'
	elsif self.state == 'Arizona'
		'AZ'
	elsif self.state == 'Arkansas'
		'AR'
	elsif self.state == 'California'
		'CA'
	elsif self.state == 'Colorado'
		'CO'
	elsif self.state == 'Connecticut'
		'CT'
	elsif self.state == 'Delaware'
		'DE'
	elsif self.state == 'District of Columbia'
		'DC'
	elsif self.state == 'Micronesia1'
		'FM'
	elsif self.state == 'Florida'
		'FL'
	elsif self.state == 'Georgia'
		'GA'
	elsif self.state == 'Guam'
		'GU'
	elsif self.state == 'Hawaii'
		'HI'
	elsif self.state == 'Idaho'
		'ID'
	elsif self.state == 'Illinois'
		'IL'
	elsif self.state == 'Indiana'
		'IN'
	elsif self.state == 'Iowa'
		'IA'
	elsif self.state == 'Kansas'
		'KS'
	elsif self.state == 'Kentucky'
		'KY'
	elsif self.state == 'Louisiana'
		'LA'
	elsif self.state == 'Maine'
		'ME'
	elsif self.state == 'Islands1'
		'MH'
	elsif self.state == 'Maryland'
		'MD'
	elsif self.state == 'Massachusetts'
		'MA'
	elsif self.state == 'Michigan'
		'MI'
	elsif self.state == 'Minnesota'
		'MN'
	elsif self.state == 'Mississippi'
		'MS'
	elsif self.state == 'Missouri'
		'MO'
	elsif self.state == 'Montana'
		'MT'
	elsif self.state == 'Nebraska'
		'NE'
	elsif self.state == 'Nevada'
		'NV'
	elsif self.state == 'New Hampshire'
		'NH'
	elsif self.state == 'New Jersey'
		'NJ'
	elsif self.state == 'New Mexico'
		'NM'
	elsif self.state == 'New York'
		'NY'
	elsif self.state == 'North Carolina'
		'NC'
	elsif self.state == 'North Dakota'
		'ND'
	elsif self.state == 'Ohio'
		'OH'
	elsif self.state == 'Oklahoma'
		'OK'
	elsif self.state == 'Oregon'
		'OR'
	elsif self.state == 'Palau'
		'PW'
	elsif self.state == 'Pennsylvania'
		'PA'
	elsif self.state == 'Puerto Rico'
		'PR'
	elsif self.state == 'Rhode Island'
		'RI'
	elsif self.state == 'South Carolina'
		'SC'
	elsif self.state == 'South Dakota'
		'SD'
	elsif self.state == 'Tennessee'
		'TN'
	elsif self.state == 'Texas'
		'TX'
	elsif self.state == 'Utah'
		'UT'
	elsif self.state == 'Vermont'
		'VT'
	elsif self.state == 'Virgin Island'
		'VI'
	elsif self.state == 'Virginia'
		'VA'
	elsif self.state == 'Washington'
		'WA'
	elsif self.state == 'West Virginia'
		'WV'
	elsif self.state == 'Wisconsin'
		'WI'
	elsif self.state == 'Wyoming'
		'WY'
	end
  end

   def Hold?
     if onhold == 0
	    ""
    else
	    "Yes"
    end
  end

	def c_date
		self.created_at.strftime("%m/%d/%Y %I:%M%p")
	end

	def m_date
		self.updated_at.strftime("%m/%d/%Y %I:%M%p")
	end

	def modified
		self.updated_at.strftime("%m/%d/%Y %I:%M%p")
	end

	def Actv?
		if enabled == 0
			"No"
		else
			""
		end
	end

	def zip
		zipcode
	end

   def Enabled?
     if enabled == 0
	    "No"
    else
	    ""
    end
  end


end
