class DoctorsController < ApplicationController

  def show
    @if_exists = Doctor.find_by_sql("SELECT COUNT(*) AS Count FROM doctors WHERE id = '" + params[:id] + "'")
    if @if_exists[0].Count == "0"
	    render :action => 'not_found'
    else
	    @doctor = Doctor.find(params[:id])
	    if @doctor.onhold == 1 || @doctor.enabled == 0
		    redirect_to "/"
	    else
		    @references = Doctor.find_by_sql("SELECT first_name, last_name FROM doctor_references WHERE doctor_id = '" + params[:id] + "'")
		    @specialties_sql = "SELECT id, name AS s_name " +
						"FROM specialties, doctor_specialties " +
						"WHERE specialties.id = doctor_specialties.specialty_id " +
						"AND doctor_id = '" + params[:id] + "'" + 
						" ORDER BY s_name"
		    @specialties = Doctor.find_by_sql(@specialties_sql)
		    @services = Doctor.find_by_sql("SELECT ss.specialty_id, ss.service_name, ss.service_description, ss.customer_price, ds.id AS ds_id, sort_order " +
								"FROM specialty_services ss, doctor_services ds " +
								"WHERE ss.id = ds.specialty_service_id " +
								"AND ds.doctor_id = '" + params[:id] + "'" + 
								" ORDER BY sort_order, ss.service_name")
		    #if @doctor.enabled == 0 || @doctor.onhold == 1
			    #redirect_to '.'
		    #else
			    respond_to do |format|
			      format.html {}
			      format.js {
				render :partial => 'show', :layout => false
			      }
			    end
		    #end
	    end
    end
  end

  def not_found
    #
  end

end
