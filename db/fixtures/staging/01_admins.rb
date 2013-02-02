Admin.seed(:email) do |s| 
  s.email = 'gal@steinitz.com'
  s.password = 'secret'    
  s.password_confirmation = 'secret'
end

Admin.seed(:email) do |s| 
  s.email = 'chris@woodward.fm'
  s.password = 'pr1ce_'    
  s.password_confirmation = 'pr1ce_'
end
