module TokanHelper

  def getDoctorNamebyId(did)
    begin
    @doctor =  SpecialtyService.find_by_service_id(did)
    @doctor.service_name
    rescue=>e
    end
  end
  
  def dateformat(date)
    if date
  	  date.strftime("%d-%b-%y")
    end
  end

 
end
