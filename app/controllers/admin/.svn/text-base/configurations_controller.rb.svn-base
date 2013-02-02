class Admin::ConfigurationsController < Admin::AdminController
  active_scaffold :configurations do |config|
    config.list.per_page = 20
    config.columns = [:config_name,:config_value,:description]
    config.list.columns = [:config_name,:config_value]
    config.columns[:config_name].label = 'Configuration Name'
    config.columns[:config_value].label = 'Configuration Value'
    config.columns[:description].label = 'Description'
    config.theme = :blue
    #active_scaffold_config.list.user.label = 'Configuration'
  end
end