class Admin::NotesController < Admin::AdminController
  active_scaffold :notes do |config|
    config.list.per_page = 50
    config.columns = [:slug, :content]
    config.list.columns = [:id, :slug]
    config.theme = :blue
  end
end