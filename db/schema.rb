# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130126090255) do

  create_table "admins", :force => true do |t|
    t.string   "email",                              :null => false
    t.string   "crypted_password",                   :null => false
    t.string   "password_salt",                      :null => false
    t.string   "persistence_token",                  :null => false
    t.string   "single_access_token",                :null => false
    t.string   "perishable_token",                   :null => false
    t.integer  "login_count",         :default => 0, :null => false
    t.integer  "failed_login_count",  :default => 0, :null => false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "configurations", :force => true do |t|
    t.string "config_name"
    t.string "config_value"
    t.string "description"
  end

  create_table "doctor_payments", :force => true do |t|
    t.date     "created_at",   :null => false
    t.datetime "updated_at",   :null => false
    t.float    "total_amount", :null => false
    t.integer  "doctor_id",    :null => false
    t.text     "notes",        :null => false
  end

  create_table "doctor_photos", :force => true do |t|
    t.integer  "parent_id"
    t.string   "content_type"
    t.string   "filename"
    t.string   "thumbnail"
    t.integer  "size"
    t.integer  "width"
    t.integer  "height"
    t.integer  "doctor_id"
    t.string   "photo_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "doctor_references", :id => false, :force => true do |t|
    t.integer "id",         :null => false
    t.integer "doctor_id",  :null => false
    t.string  "first_name", :null => false
    t.string  "last_name",  :null => false
    t.string  "phone",      :null => false
  end

  create_table "doctor_services", :force => true do |t|
    t.integer  "doctor_id"
    t.integer  "specialty_service_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "doctor_specialties", :id => false, :force => true do |t|
    t.integer  "specialty_id"
    t.integer  "doctor_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "doctors", :force => true do |t|
    t.string   "title"
    t.string   "first_name"
    t.string   "middle_name"
    t.string   "last_name"
    t.string   "date_of_birth",         :limit => 50
    t.string   "address"
    t.string   "address2"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.string   "mailing_address"
    t.string   "mailing_address2"
    t.string   "mailing_city"
    t.string   "mailing_state"
    t.string   "mailing_zipcode"
    t.string   "public_phone"
    t.string   "phone"
    t.string   "fax"
    t.string   "email",                                                      :null => false
    t.string   "company"
    t.string   "tax_id",                :limit => 50
    t.string   "tax_id_type",           :limit => 50,  :default => "SSN"
    t.string   "website"
    t.string   "medical_school"
    t.string   "type_of_degree",        :limit => 50
    t.string   "graduated_year",        :limit => 50
    t.string   "medical_license_state", :limit => 50
    t.string   "license_no",            :limit => 50
    t.string   "medical_license_type",  :limit => 50
    t.integer  "spanish",               :limit => 1,   :default => 0,        :null => false
    t.string   "other_languages"
    t.string   "insurance_carrier"
    t.string   "insurance_policy_no"
    t.string   "insurance_expiry_date"
    t.text     "description"
    t.integer  "show_video",            :limit => 1,   :default => 0,        :null => false
    t.string   "crypted_password",                                           :null => false
    t.string   "password_salt",                                              :null => false
    t.string   "persistence_token",                                          :null => false
    t.string   "single_access_token",                                        :null => false
    t.string   "perishable_token",                                           :null => false
    t.integer  "login_count",                          :default => 0,        :null => false
    t.integer  "failed_login_count",                   :default => 0,        :null => false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string   "current_login_ip"
    t.string   "last_login_ip"
    t.float    "lat"
    t.float    "lng"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "enabled",               :limit => 1,   :default => 0,        :null => false
    t.string   "enabled_note"
    t.datetime "enabled_date"
    t.integer  "onhold",                :limit => 1,   :default => 0,        :null => false
    t.string   "onhold_note",           :limit => 100
    t.datetime "onhold_date"
    t.integer  "signup_step",                          :default => 0,        :null => false
    t.integer  "current_signup_step"
    t.string   "payment_method",        :limit => 40
    t.string   "paypal_email"
    t.string   "user_type",             :limit => 50,  :default => "Doctor", :null => false
    t.text     "video_code"
  end

  create_table "hospital_affiliations", :id => false, :force => true do |t|
    t.integer "id",               :null => false
    t.integer "doctor_id",        :null => false
    t.string  "hospital",         :null => false
    t.integer "usage_percentage", :null => false
  end

  create_table "insurance_carriers", :id => false, :force => true do |t|
    t.integer "id",                     :null => false
    t.integer "doctor_id",              :null => false
    t.string  "insurance_company_name", :null => false
  end

  create_table "orders", :force => true do |t|
    t.integer  "doctor_service_id"
    t.integer  "specialty_service_id",                                  :null => false
    t.integer  "doctor_id",                                             :null => false
    t.string   "first_name"
    t.string   "last_name"
    t.string   "patient_name"
    t.string   "address"
    t.string   "city"
    t.string   "state"
    t.string   "zipcode"
    t.string   "phone"
    t.string   "email"
    t.string   "credit_card"
    t.datetime "expiration"
    t.integer  "ccv"
    t.string   "paymentmethod"
    t.float    "customer_price"
    t.float    "doctor_price"
    t.string   "number"
    t.string   "pin"
    t.string   "billing_code"
    t.boolean  "submitted",                          :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "orderstatus",          :limit => 16, :default => "New", :null => false
    t.integer  "cronstatus",           :limit => 1,  :default => 0,     :null => false
    t.integer  "doctor_payments_id",                 :default => -1,    :null => false
    t.text     "order_notes"
    t.string   "address2"
  end

  add_index "orders", ["first_name"], :name => "first_name"
  add_index "orders", ["first_name"], :name => "first_name_2"
  add_index "orders", ["number"], :name => "number", :unique => true

  create_table "pages", :force => true do |t|
    t.string   "title"
    t.string   "slug"
    t.text     "body"
    t.string   "nav_item"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sessions", :force => true do |t|
    t.string   "session_id", :null => false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], :name => "index_sessions_on_session_id"
  add_index "sessions", ["updated_at"], :name => "index_sessions_on_updated_at"

  create_table "simple_captcha_data", :force => true do |t|
    t.string   "key",        :limit => 40
    t.string   "value",      :limit => 6
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "specialties", :force => true do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "specialty_services", :force => true do |t|
    t.integer  "specialty_id"
    t.integer  "service_id"
    t.string   "service_name"
    t.text     "service_description"
    t.integer  "doctor_price"
    t.integer  "customer_price"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "subscribers", :force => true do |t|
    t.string   "full_name",  :null => false
    t.string   "email",      :null => false
    t.datetime "created_at", :null => false
  end

end
