class DoctorService < ActiveRecord::Base
  belongs_to :doctor
  belongs_to :specialty_service


#  def service
#    doctor = self.specialty_service.service
#    [doctor.name]
#  end





end