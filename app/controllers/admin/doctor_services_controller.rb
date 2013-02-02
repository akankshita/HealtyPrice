class Admin::DoctorServicesController < Admin::AdminController
  active_scaffold :doctor_services do |config|
    config.list.per_page = 50
    config.columns = [:specialty_service]
    columns[:specialty_service].label = "Procedures & Services"
    config.label = 'Procedures & Services'
    config.theme = :blue
  end
end