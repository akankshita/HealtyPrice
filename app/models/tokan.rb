class Tokan < ActiveRecord::Base
  attr_accessible :tokan_name,  :date_from,:discount,:date_to,:service_id,:date_to
  validates_uniqueness_of :tokan_name
  validates_presence_of :tokan_name, :service_id, :date_to,:date_from,:discount ,:date_to, :message => "can't be empty"
  validates_numericality_of :discount


  def self.genrate
    o =  [('a'..'z'),('A'..'Z'),('1'..'9')].map{|i| i.to_a}.flatten;
    string = (0..5).map{ o[rand(o.length)]  }.join;
  end

end
