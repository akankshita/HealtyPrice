class Admin::PagesController < Admin::AdminController
  active_scaffold :pages do |config|
    config.list.per_page = 50
    config.columns = [:title,:slug,:body]
    config.list.columns = [:title,:slug]
    config.theme = :blue
  end
end