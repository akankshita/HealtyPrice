require 'action_controller'
require 'action_controller/test_process.rb'

srand(2851928)

#list of real addresses
csv_file = File.join(File.dirname(__FILE__), 'addresses.csv')
addresses = FasterCSV.read(csv_file, :headers => :first_row)
puts("found " + addresses.length.to_s + " addresses")

#photos
clinic_photos = Dir[File.join(RAILS_ROOT, "db/fixtures", RAILS_ENV, 'photos/clinic/*.jpg')] 
puts("found " + clinic_photos.length.to_s + " clinic_photos")
headshots = Dir[File.join(RAILS_ROOT, "db/fixtures", RAILS_ENV, 'photos/headshots/*.jpg')] 
puts("found " + headshots.length.to_s + " headshots")
mimetype = "image/jpeg"

(1..100).each do |i|
  begin
    Doctor.seed(:id) do |s| 
    
      last_name = Faker::Name.last_name
      address = addresses[rand(addresses.length)]
        
      s.id = i
      s.password = 'secret'    
      s.password_confirmation = 'secret'
      s.first_name = Faker::Name.first_name
      s.last_name = last_name
      s.title = "Dr."
      s.email = Faker::Internet.email
      s.address = address['Location']
      s.city = address['Place'].gsub(/ ?\(.*\)$/,'')
      s.state = "California"
      s.zipcode = address['Zipcode']
      s.company = last_name + " " + Faker::Address.city + " Clinic"
      s.website = "http://" + Faker::Internet.domain_name
      s.phone = Faker::PhoneNumber.phone_number
      s.lat = address['Latitude']
      s.lng = address['Longitude']
      
      clinic_photo = DoctorPhoto.new(:uploaded_data => ActionController::TestUploadedFile.new(clinic_photos.rand, mimetype), :photo_type => :clinic)
      clinic_photo.save!
      
      s.clinic_photo = clinic_photo
      
      headshot = DoctorPhoto.new(:uploaded_data => ActionController::TestUploadedFile.new(headshots.rand, mimetype), :photo_type => :headshot)
      headshot.save!
      s.headshot = headshot
      
    end
  rescue
    puts("ERROR: " + $!)
  end
end


# <b>Description:</b> This method simply ensures that the random number generated is greater than zero (ie. positive 'p'-rand)
def prand(i)
  1 + rand(i-1)
end

# assign practice areas
specialties = Specialty.all
Doctor.all.each do |d|
  # up 2 practice areas for each Dr.
  specialties_clone = specialties.clone
  (0..rand(2)).each do 
    d.specialties << specialties_clone.delete(specialties_clone.rand)
  end
end


#assign practice area services
Doctor.all.each do |d|
  d.specialties.each do |ds|
    ds.specialty_services.each do |ss|
      d.specialty_services << ss if rand(4)<3
    end    
  end
end