lorem = "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum/p>"

['HSA Information','About Us','Are you a business?','Terms & Conditions','FAQ','Contact','Get Info & Join'].each do |title|
  Page.seed(:title) do |s| 
    s.title = title
    slug = title.gsub(/ /,'_').gsub(/[^A-Za-z0-9_]/,'').downcase
    s.slug = slug
    s.body = lorem * 10
    s.nav_item = slug.gsub(/_/,'')
  end
end