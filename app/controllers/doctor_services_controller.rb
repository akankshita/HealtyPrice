class DoctorServicesController < ApplicationController

  def show
    tmp = DoctorService.find_by_sql("SELECT COUNT(*) AS Count FROM doctor_services WHERE id = '" + params[:id] + "'")
    if tmp[0].Count == "0"
	    @Error = "Not Found"
	    render :action => 'notavailable'
    else
	    @doctor_service = DoctorService.find(params[:id])
	    #if @doctor_service.doctor.enabled == 0 || @doctor_service.doctor.onhold == 1
		#    redirect_to '.'
	    #end
	    @specialty_service = @doctor_service.specialty_service
	    #@service = @specialty_service.service
	    @specialty = @specialty_service.specialty
	    @doctor = @doctor_service.doctor
	    if @doctor == nil
		    @Error = "Not Found"
		    render :action => 'notavailable'
	    end
    end
  end

  def notavailable
  end

end