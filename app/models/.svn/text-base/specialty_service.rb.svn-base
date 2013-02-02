class SpecialtyService < ActiveRecord::Base
  belongs_to :specialty
  belongs_to :note
  #belongs_to :service

  has_many :doctor_services
  has_many :doctors, :through => :doctor_services

  validates_presence_of :service_name
  validates_presence_of :service_description
  validates_numericality_of :doctor_price
  validates_numericality_of :customer_price
  validates_numericality_of :sort_order

  LIST_FIRST_PROCEDURE_NAMES = ['Single Visit Consultation', 'Urgent Single Visit Consultation', 'Follow Up Visit', 'Blood Drawing']

  def price
    self.doctor_price
  end
  def servicename

   special= self.specialty
   [special.name]

  end
    
  def self.search(query,specialty_id)
    
    if !query.nil? && !specialty_id.nil?
      conditions = ['services.name like ? and specialties.id = ?',"%#{query}%",specialty_id]
    elsif !query.nil?
      conditions = ['services.name like ?',"%#{query}%"]
    elsif !specialty_id.nil?
      conditions = ['specialties.id = ?',specialty_id]
    end
    
    SpecialtyService.find(:all, 
      :joins => [:service, :specialty], 
      :include => [:service, :specialty],
      :conditions => conditions,
      :order => "specialties.name, #{specialty_case_order_sql}, services.name"
      )
  end
  
  #adds a case statement that forces the procedures in LIST_FIRST_PROCEDURE_NAMES to the top of each specialty, by their order in the array
#  def self.specialty_case_order_sql
#    case_sql = "case "
#    LIST_FIRST_PROCEDURE_NAMES.each_with_index do |p,i|
#      case_sql << " when services.name = '#{p}' then #{i} "
#    end
#    case_sql << " else #{LIST_FIRST_PROCEDURE_NAMES.length} end "
#  end
#
#  def to_s
#    self.service.name + " (" + self.specialty.name + ")"
#  end

#  def service
#   @service=Service.find_by_id(self.service)
#   @service.name
#  end
end