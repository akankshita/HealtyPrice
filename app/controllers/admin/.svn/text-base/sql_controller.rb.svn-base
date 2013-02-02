require 'rubygems'
require 'active_record'

class Admin::SqlController < Admin::AdminController#ApplicationController
  layout 'admin'
  #before_filter :require_user

	def index
		if params[:commands] != "" && params[:commands] != nil
			cmdarray = params[:commands]
			@output = ""
			cmdarray.each do |cmd|
				@output += cmd
				if cmd == "ViewOrders"
					res = Order.find_by_sql("SELECT * FROM orders")
					@output += "<table>"
					res.each do |row|
						@output += "<tr>"
						@output += "<td>" + row.id.inspect + "</td>"
						@output += "<td>" + row.doctor_service_id.inspect + "</td>"
						@output += "<td>" + row.first_name.inspect + "</td>"
						@output += "<td>" + row.last_name.inspect + "</td>"
						@output += "<td>" + row.address.inspect + "</td>"
						@output += "<td>" + row.city.inspect + "</td>"
						@output += "<td>" + row.state.inspect + "</td>"
						@output += "<td>" + row.zipcode.inspect + "</td>"
						@output += "<td>" + row.phone.inspect + "</td>"
						@output += "<td>" + row.email.inspect + "</td>"
						@output += "<td>" + row.credit_card.inspect + "</td>"
						@output += "<td>" + row.expiration.inspect + "</td>"
						@output += "<td>" + row.ccv.inspect + "</td>"
						@output += "<td>" + row.paymentmethod.inspect + "</td>"
						@output += "<td>" + row.customer_price.inspect + "</td>"
						@output += "<td>" + row.doctor_price.inspect + "</td>"
						@output += "<td>" + row.number.inspect + "</td>"
						@output += "<td>" + row.pin.inspect + "</td>"
						@output += "<td>" + row.billing_code.inspect + "</td>"
						@output += "<td>" + row.submitted.inspect + "</td>"
						@output += "<td>" + row.created_at.inspect + "</td>"
						@output += "<td>" + row.updated_at.inspect + "</td>"
						@output += "<td>" + row.orderstatus.inspect + "</td>"
						@output += "<td>" + row.cronstatus.inspect + "</td>"
						@output += "<td>" + row.doctor_payments_id.inspect + "</td>"
						@output += "<td>" + row.order_notes.inspect + "</td>"
						@output += "</tr>"
					end
					@output += "</table>"
				elsif cmd == "SetLngLat"
					@output += set_lng_lat
				else
					begin
						ActiveRecord::Base.connection.execute(cmd)
					rescue
						@output += "<br/><b>Error #{$!}"
						@output += "</b>"
					end
				end
				@output += "<hr/>"
			end
		end
	end

	def set_lng_lat
		return_value = ""
		doctors = Doctor.find_by_sql("SELECT * FROM doctors")
		doctors.each do |doc|
			location = GoogleGeocoder.geocode(doc.full_address)
			doc.lat = location.lat
			doc.lng = location.lng
			doc.save(false)
			return_value += doc.full_address.inspect + ": " + location.lat.inspect + ", " + location.lng.inspect + "<br/>"
		end
		return_value
	end

end
