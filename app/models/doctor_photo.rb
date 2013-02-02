class DoctorPhoto < ActiveRecord::Base
  #belongs_to :doctor
  
  #has_attachment :content_type => :image, 
  #               :max_size => 2.megabytes,
  #               :resize_to => 'x400',
  #               :processor => 'Rmagick',
  #               :storage => :file_system,
  #               :path_prefix => 'public/system/doctor_photos',                 
  #               :thumbnails => { :mini => 'x100'}

  #validates_as_attachment

  def self.save(upload)	#, name
    name =  upload.original_filename
    directory = "public/images/uploads"
    # create the file path
    path = File.join(directory, name)
    # write the file
    File.open(path, "wb") { |f| f.write(upload.read) }
  end

end
