class Specialty < ActiveRecord::Base

  has_many :specialty_services
  has_and_belongs_to_many :doctors, :join_table => "doctor_specialties"
  #has_many :services, :through => :specialty_services

  validates_presence_of :name
  validates_presence_of :description

end
