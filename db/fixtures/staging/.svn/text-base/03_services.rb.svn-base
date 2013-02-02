#list of services
csv_file = File.join(File.dirname(__FILE__), 'services.csv')
services = FasterCSV.read(csv_file, :headers => :first_row)
puts("found " + services.length.to_s + " services")

services.each do |service_item|
  Service.seed(:name) do |s| 
    s.name = service_item[1]
  end
end
