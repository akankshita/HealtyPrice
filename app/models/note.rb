class Note < ActiveRecord::Base
  has_many :specialty_services

  validates_presence_of :slug
  validates_presence_of :content

end
