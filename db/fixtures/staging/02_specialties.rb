srand(313432)

#list of specialties
csv_file = File.join(File.dirname(__FILE__), 'specialties.csv')
specialties = FasterCSV.read(csv_file, :headers => :first_row)
puts("found " + specialties.length.to_s + " specialties")

specialties.each do |specialty|  
  Specialty.seed(:name) do |s| 
    s.name = specialty[0]
    s.description = specialty[1]
  end
end
  