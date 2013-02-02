class SpecialtyServicesController < ApplicationController

  def show
    @if_exists = SpecialtyService.find_by_sql("SELECT COUNT(*) AS Count FROM specialty_services WHERE id = '" + params[:id] + "'")
    if @if_exists[0].Count == "0"
	    render :action => 'not_found'
    else
	    @specialty_service = SpecialtyService.find(params[:id])
    end
  end

  def spanish
    @if_exists = SpecialtyService.find_by_sql("SELECT COUNT(*) AS Count FROM specialty_services WHERE id = '" + params[:id] + "'")
    if @if_exists[0].Count == "0"
	    render :action => 'not_found'
    else
	    @specialty_service = SpecialtyService.find(params[:id])
    end
  end

  def details
    @specialty_service = SpecialtyService.find(params[:id])
  end

  def not_found
    #
  end

end
