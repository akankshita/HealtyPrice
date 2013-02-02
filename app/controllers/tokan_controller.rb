class TokanController < ApplicationController
 layout 'admin'
  def promotional
    @tokan = Tokan.paginate(:all,:order => 'created_at DESC',:page => params[:page], :per_page => 15)
    @service_id =Tokan.find_by_service_id("2")
    @tservice = SpecialtyService.all
  end
  
  def create  
    @promotional = Tokan.create
    string = Tokan.genrate
    @promotional.update_attributes(:discount=> params[:discount],:tokan_name=>string,:date_from=>params[:date_from][:iddate],:date_to=>params[:date_to][:idlastdate],:service_id=>params[:promo][:service_id])
    
    redirect_to tokan_pramotional_path
  end

  def delete
    Tokan.find(params[:id]).destroy
    
    redirect_to tokan_pramotional_path
 end
 
end