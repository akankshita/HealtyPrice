class Admin::OrdersController < Admin::AdminController
  #render :active_scaffold => 'list', :constraints => { :submitted => 1 }
  #before_filter :load_listing
  #protect_from_forgery :except => [:autocomplete_foo]

  #  active_scaffold "admin/Order" do |config|
  #    config.actions.add :list_filter
  #  end
  active_scaffold :orders do |config|
    #config.actions.add :pracarea

    # config.actions.add :list_filter
    # config.list_filter.columns = [:orderstatus]
    #    config.actions.add :list_filter
    #     config.list_filter.add(:association, :orderstatus, {:label => "Districts"})
    #.add(:date, :filter_name, {:label => "Filter Label", :other_key => "options"})
    config.actions.exclude :create ,:delete
    #config.actions.swap :search, :live_search
    config.list.per_page = 20
    config.columns = [:orderstatus,:order_notes,:pay_ref_id,:patient_name,:provider,:procedure,:pracarea,:str_date]
    #config.columns[:first_name].label = 'Patient'
    config.columns[:id].label = 'Order #'
    config.columns[:orderstatus].label = 'Status'
    config.columns[:str_date].label = 'Date'
    config.columns[:pay_ref_id].label = 'Payment'
    config.columns[:patient_name].label = 'Patient'
    config.columns[:pracarea].label = 'Practice Area'
    config.columns[:procedure].label = 'Procedure'
    config.columns[:provider].label = 'Provider'
    #config.columns[:provider].width = "200px"
    config.list.columns = [:id,:orderstatus, :str_date,:provider,:patient_name,:procedure,:pracarea,:pay_ref_id]
    #config.columns[:status].inplace_edit = true
    #   config.columns[:notes].options = { :autocomplete => "on", :size => 10}
    config.columns[:orderstatus].form_ui = :select
    config.columns[:orderstatus].options = [['New', 'New'], ['Pending', 'Pending'] ,['Unresolved', 'Unresolved'] ,['Closed', 'Closed']]
    #config.list.sorting = [{:submitted => '1'}]
    #config.columns[:status].inplace_edit = true
    config.list.sorting = [:id => 'DESC']

    config.search.columns << :id
    config.search.columns << :doctor_payments_id
    #config.search.columns << :pracarea
    #config.search.columns << :procedure
    #config.search.columns << :created_at

    #config.search.columns = {:id,:orderstatus,:str_date,:provider,:patient_name,:procedure,:pracarea,:pay_ref_id}
    # config.search.columns << :doctors
    # config.columns[:doctors].search_sql = "doctors.id"
    #
    #    config.columns[:orderstatus].search_sql = "orderstatus"
    #config.search.columns << :provider

    config.update.columns.add_subgroup "Order Details" do |Details_group|
      Details_group.add :customer_price, :created_at
    end

    config.update.columns.add_subgroup "Order" do |order_group|
      order_group.add :orderstatus, :order_notes, :pay_ref_id
    end

    config.update.columns.add_subgroup "Patient Information" do |Patient_group|
      Patient_group.add :patient_name, :phone, :email
    end

    config.label = 'Orders'
    config.theme = :blue
    #render :active_scaffold => 'orders', :constraints => { :submitted => 1 }
  end

  def conditions_for_collection
    ['submitted IN (?)', ['1']]
  end
  def update
    p params[:id]
    #@doctor= Doctor.new(params[:person])
    @order = Order.new(params[:doctor])
    @record = Order.find(params[:id])
    if @record.update_attributes(params[:doctor])
      render :action => 'on_update'
    else
      render :text=>"nooo"
    end
  end

  #  def export_csv
  #    # find_page is how the List module gets its data. see Actions::List#do_list.
  #    records = find_page().items
  #    return if records.size == 0
  #    # Note this code is very generic.  We could move this method and the
  #    # action_link configuration into the ApplicationController and reuse it
  #    # for all our models.
  #    data = ""
  #    cls = records[0].class
  #    data << cls.csv_header << "\r\n"
  #    records.each do |inst|
  #      data << inst.to_csv << "\r\n"
  #    end
  #    send_data data, :type => 'text/csv', :filename => cls.name.pluralize + '.csv'
  #  end
  #   def load_listing
  #    begin
  #      @listing = Orders.find(active_scaffold_session_storage[:orders][:submitted=>1])
  #    rescue
  #      @listing = Orders.new
  #    end
  #  end
  #render :active_scaffold => 'list', :constraints => { :submitted => 1 }

end
