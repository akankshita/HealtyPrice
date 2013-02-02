# <b>Description:</b> This method simply ensures that the random number generated is greater than zero (ie. positive 'p'-rand)
def prand(i)
  1 + rand(i-1)
end

#list of services
csv_file = File.join(File.dirname(__FILE__), 'services.csv')
specialty_services = FasterCSV.read(csv_file, :headers => :first_row)
puts("found " + specialty_services.length.to_s + " services")

idv = 0
specialty_services.each do |ss|
  specialty = Specialty.find_by_name(ss[0])
  service_row = Service.find_by_name(ss[1])
  customer_price = ss[2]
  doctor_price = ss[3]
  if (!service_row.nil? && !specialty.nil? && !customer_price.nil? && !doctor_price.nil?)
    idv = idv+1
    SpecialtyService.seed(:id) do |s| 
      s.id = idv
      s.service_id = service_row.id
      s.specialty_id = specialty.id
      s.doctor_price = doctor_price
      s.customer_price = customer_price
    end
  end
end

