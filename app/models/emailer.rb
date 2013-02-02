class Emailer < ActionMailer::Base
  
  def email(subject, recipient, from, message)
    @subject = subject
    @recipients = recipient
    @from =  from
    @sent_on = Time.now
  	@body["message"] = message
    @headers = {}
  end


  def new_order_customer(recipient, full_name, order_number, billing_code, pin, doctor, order)
    @subject = "Your HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from = "customersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["billing_code"] = billing_code
  	@body["pin"] = pin
  	@body["doctor"] = doctor
  	@body["order"] = order
    @headers = {}
  end

  def new_order_provider(recipient, full_name, order_number, patient_name, procedure, order)
    @subject = "New HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["patient_name"] = patient_name
  	@body["procedure"] = procedure
  	@body["order"] = order
    @headers = {}
  end

  def new_order_admin(recipient, full_name, order_number, patient_name, procedure, order, doctor)
    @subject = "New HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["patient_name"] = patient_name
  	@body["procedure"] = procedure
  	@body["order"] = order
  	@body["doctor"] = doctor
    @headers = {}
  end



  def new_order_customer_addon(recipient, full_name, order_number, billing_code, pin, doctor, order)
    @subject = "Your HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from = "customersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["billing_code"] = billing_code
  	@body["pin"] = pin
  	@body["doctor"] = doctor
  	@body["order"] = order
    @headers = {}
  end

  def new_order_provider_addon(recipient, full_name, order_number, patient_name, procedure, order)
    @subject = "New HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["patient_name"] = patient_name
  	@body["procedure"] = procedure
  	@body["order"] = order
    @headers = {}
  end

  def new_order_admin_addon(recipient, full_name, order_number, patient_name, procedure, order, doctor)
    @subject = "New HealthyPrice Order (#"+order_number+")"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["patient_name"] = patient_name
  	@body["procedure"] = procedure
  	@body["order"] = order
  	@body["doctor"] = doctor
    @headers = {}
  end



  def order_cancel_customer(recipient, full_name, order_number, billing_code, pin)
    @subject = "HealthyPrice Order #"+order_number+" Has Been Cancelled"
    @recipients = recipient
    @from = "customersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["billing_code"] = billing_code
  	@body["pin"] = pin
    @headers = {}
  end

  def order_cancel_provider(recipient, full_name, order_number, patient_name, procedure)
    @subject = "HealthyPrice Order #"+order_number+" Has Been Cancelled"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["order_number"] = order_number
  	@body["patient_name"] = patient_name
  	@body["procedure"] = procedure
    @headers = {}
  end



  def web_contact_form(first_name, last_name, from_email, phone, recipient, subject, inquiry)
      @subject = "HealthyPrice Contact Form - " + subject
      @recipients = recipient
      @from = from_email
      #'customersupport@healthyprice.com'
      @sent_on = Time.now
	@body["name"] = first_name + ' ' + last_name
	@body["from_email"] = from_email
	@body["phone"] = phone
   	@body["subjectx"] = subject
   	@body["subjectcat"] = recipient
   	@body["inquiry"] = inquiry
      @headers = {}
   end



  def contact(recipient, subject, message, sent_at = Time.now)
    @subject = subject
    @recipients = recipient
    @from = "customersupport@healthyprice.com"
    @sent_on = sent_at
    @body["title"] = 'Cancelling The Order'
  	@body["email"] = 'Healthyprice@gmail.com'
   	@body["message"] = message
    @headers = {}
  end

  def new_account_email(recipient, full_name, provider_id, user_id, password)
    @subject = "Welcome to HealthyPrice!"
    @recipients = recipient
    @from = "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["provider_id"] = provider_id
  	@body["user_id"] = user_id
  	@body["password"] = password
    @headers = {}
  end

  def signup_complete_email(recipient, full_name, provider_id)
    @subject = "Your HealthyPrice Application"
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = Time.now
  	@body["full_name"] = full_name
  	@body["provider_id"] = provider_id
    @headers = {}
  end



  def doctor_contact(recipient, subject, message, sent_at = Time.now)
    @subject = subject
    @recipients = recipient
    @from =  "providersupport@healthyprice.com"
    @sent_on = sent_at
    @body["title"] = 'From: HealthyPrice (customer-service@healthyprice.com) <br>
                        Subject: '+ subject + '<br>
                        Date :'+ "#{sent_at}"
    @body["email"] = 'Healthyprice@gmail.com'
    @body["message"] = message
    @headers = {}
  end

  def admin_account_status(recipient, subject, message, sent_at = Time.now)
    @subject = subject
    @recipients = recipient
    @from = "providersupport@healthyprice.com"
    @sent_on = sent_at
    @body["title"] = 'HealthyPrice'
  	@body["email"] = 'Healthyprice@gmail.com'
   	@body["message"] = message
    @headers = {}
  end

  def admin_account_onhold(recipient, subject, message, sent_at = Time.now)
    @subject = subject
    @recipients = recipient
    @from = "providersupport@healthyprice.com"
    @sent_on = sent_at
    @body["title"] = 'HealthyPrice'
  	@body["email"] = 'Healthyprice@gmail.com'
   	@body["message"] = message
    @headers = {}
  end

end
