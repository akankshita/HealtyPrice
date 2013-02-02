class Page < ActiveRecord::Base

  validates_presence_of :title
  validates_presence_of :slug
  validates_presence_of :body

  def self.find_by_filename(slug)
    safe_filename = slug.downcase.gsub(/ /,'_').gsub(/[^a-z0-9_]/,'')
    path = File.join(RAILS_ROOT, "db/fixtures", RAILS_ENV, "pages/#{safe_filename}.html")
    begin
      content = File.read(path)
      h3_regex = /<h3>(.*)<\/h3>/
      h3 = content.match(h3_regex)
      title = (h3.nil? ? slug : h3[1])
      content.gsub!(h3_regex,'') unless h3.nil?
      page = Page.new(:title => title, :body => content, :slug => safe_filename)
      page.nav_item = page_fixtures_nav_item_for(safe_filename)
      page.save if RAILS_ENV == "production"
      page
    rescue
      nil
    end
  end
  
  def self.find_by_slug_or_filename(slug)
    page = self.find_by_slug(slug)
    if page.nil?
      page = self.find_by_filename(slug)
    end
    page
  end
  
  def self.page_fixtures_nav_item_for(filename)
    json = File.read(File.join(RAILS_ROOT, "db/fixtures", RAILS_ENV, "pages/nav_items.json"))
    nav_items = ActiveSupport::JSON.decode(json)
    nav_items[filename]
  end
end
