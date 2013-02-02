
var Routing = {

	get_path: function (segments, options, overrides) {
		var extras = null;

		for (var property in overrides) {
			if (options[property] != null) {
				options[property] = overrides[property];
			}
			else {
				extras = extras ? extras : {};
				extras[property] = overrides[property]
			}
		}

		for (var prop in options) {
			//perform replace for optional props, example (format=json):
			// "/avatar/new(.:format)?" ==> "/avatar/new.json"  
			segments = segments.replace(new RegExp("\\(([^:]*):" + prop + '\\)\\?'),(options[prop] ? '$1' : '') + options[prop])
			//perform standard replace for required props, example: (id=1)
			// "/avatar/:id/edit" ==> "/avatar/1/edit"  
			segments = segments.replace(":"+prop, options[prop]);
		}

		var query="";
		if (extras) {
			query += "?"
			for (var extra in extras) {
				query += extra + "=" + extras[extra] + "&";
			}
			query = query.substring(0, query.length-1);
		}

		var path = segments;
		while (path[path.length - 1] == "/") {
			path = path.substring(0, path.length - 1);
		}
		return path + query;
	},

	get_url: function (segments, options, overrides) {
		return Routing.host + Routing.get_path(segments, options, overrides);
	},

	search_doctors_name_url: function (overrides) {
		return Routing.host + Routing.search_doctors_name_path(overrides)
	},

        search_doctors_name_path: function (overrides) {
                var options = {
                        query: '',
			controller: 'search',
			action: 'search_doctor_name'
                };
                return Routing.get_path("/search/doctors/name/:query/", options, overrides);
        },

	nested_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.nested_admin_specialty_path(overrides)
	},

        nested_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'nested'
                };
                return Routing.get_path("/admin/specialties/:id/nested(.:format)?", options, overrides);
        },

	doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.doctor_section_specialties_path(overrides)
	},

        doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'index'
                };
                return Routing.get_path("/doctor_section/specialties(.:format)?", options, overrides);
        },

	admin_admins_url: function (overrides) {
		return Routing.host + Routing.admin_admins_path(overrides)
	},

        admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'index'
                };
                return Routing.get_path("/admin/admins(.:format)?", options, overrides);
        },

	render_field_admin_service_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_service_path(overrides)
	},

        render_field_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/services/:id/render_field(.:format)?", options, overrides);
        },

	update_column_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_doctor_path(overrides)
	},

        update_column_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'update_column'
                };
                return Routing.get_path("/admin/doctors/:id/update_column(.:format)?", options, overrides);
        },

	search_doctors_url: function (overrides) {
		return Routing.host + Routing.search_doctors_path(overrides)
	},

        search_doctors_path: function (overrides) {
                var options = {
                        controller: 'search',
			action: 'doctors'
                };
                return Routing.get_path("/search/doctors/", options, overrides);
        },

	path_url: function (overrides) {
		return Routing.host + Routing.path_path(overrides)
	},

        path_path: function (overrides) {
                var options = {
                        controller: 'user_sessions',
			action: 'admin'
                };
                return Routing.get_path("/user_session/admin/", options, overrides);
        },

	update_table_admin_admins_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_admins_path(overrides)
	},

        update_table_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'update_table'
                };
                return Routing.get_path("/admin/admins/update_table(.:format)?", options, overrides);
        },

	edit_associated_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_specialty_path(overrides)
	},

        edit_associated_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/specialties/:id/edit_associated(.:format)?", options, overrides);
        },

	update_table_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.update_table_doctor_section_specialties_path(overrides)
	},

        update_table_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'update_table'
                };
                return Routing.get_path("/doctor_section/specialties/update_table(.:format)?", options, overrides);
        },

	row_admin_service_url: function (overrides) {
		return Routing.host + Routing.row_admin_service_path(overrides)
	},

        row_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'row'
                };
                return Routing.get_path("/admin/services/:id/row(.:format)?", options, overrides);
        },

	new_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.new_admin_doctor_path(overrides)
	},

        new_admin_doctor_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'new'
                };
                return Routing.get_path("/admin/doctors/new(.:format)?", options, overrides);
        },

	search_specialties_url: function (overrides) {
		return Routing.host + Routing.search_specialties_path(overrides)
	},

        search_specialties_path: function (overrides) {
                var options = {
                        controller: 'search',
			action: 'specialties'
                };
                return Routing.get_path("/search/practice_areas/", options, overrides);
        },

	edit_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.edit_admin_specialty_path(overrides)
	},

        edit_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'edit'
                };
                return Routing.get_path("/admin/specialties/:id/edit(.:format)?", options, overrides);
        },

	list_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.list_doctor_section_specialties_path(overrides)
	},

        list_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'list'
                };
                return Routing.get_path("/doctor_section/specialties/list(.:format)?", options, overrides);
        },

	list_admin_admins_url: function (overrides) {
		return Routing.host + Routing.list_admin_admins_path(overrides)
	},

        list_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'list'
                };
                return Routing.get_path("/admin/admins/list(.:format)?", options, overrides);
        },

	nested_admin_service_url: function (overrides) {
		return Routing.host + Routing.nested_admin_service_path(overrides)
	},

        nested_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'nested'
                };
                return Routing.get_path("/admin/services/:id/nested(.:format)?", options, overrides);
        },

	admin_doctors_url: function (overrides) {
		return Routing.host + Routing.admin_doctors_path(overrides)
	},

        admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'index'
                };
                return Routing.get_path("/admin/doctors(.:format)?", options, overrides);
        },

	show_search_admin_admins_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_admins_path(overrides)
	},

        show_search_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'show_search'
                };
                return Routing.get_path("/admin/admins/show_search(.:format)?", options, overrides);
        },

	order_new_url: function (overrides) {
		return Routing.host + Routing.order_new_path(overrides)
	},

        order_new_path: function (overrides) {
                var options = {
                        doctor_service_id: '',
			controller: 'orders',
			action: 'new'
                };
                return Routing.get_path("/orders/new/:doctor_service_id/", options, overrides);
        },

	update_column_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_specialty_path(overrides)
	},

        update_column_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'update_column'
                };
                return Routing.get_path("/admin/specialties/:id/update_column(.:format)?", options, overrides);
        },

	show_search_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.show_search_doctor_section_specialties_path(overrides)
	},

        show_search_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'show_search'
                };
                return Routing.get_path("/doctor_section/specialties/show_search(.:format)?", options, overrides);
        },

	edit_associated_admin_service_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_service_path(overrides)
	},

        edit_associated_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/services/:id/edit_associated(.:format)?", options, overrides);
        },

	update_table_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_doctors_path(overrides)
	},

        update_table_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'update_table'
                };
                return Routing.get_path("/admin/doctors/update_table(.:format)?", options, overrides);
        },

	new_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.new_admin_specialty_path(overrides)
	},

        new_admin_specialty_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'new'
                };
                return Routing.get_path("/admin/specialties/new(.:format)?", options, overrides);
        },

	render_field_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_specialties_path(overrides)
	},

        render_field_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/specialties/render_field(.:format)?", options, overrides);
        },

	render_field_admin_admins_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_admins_path(overrides)
	},

        render_field_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'render_field'
                };
                return Routing.get_path("/admin/admins/render_field(.:format)?", options, overrides);
        },

	service_url: function (overrides) {
		return Routing.host + Routing.service_path(overrides)
	},

        service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'services',
			action: 'show'
                };
                return Routing.get_path("/services/:id(.:format)?", options, overrides);
        },

	list_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.list_admin_doctors_path(overrides)
	},

        list_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'list'
                };
                return Routing.get_path("/admin/doctors/list(.:format)?", options, overrides);
        },

	doctor_section_root_url: function (overrides) {
		return Routing.host + Routing.doctor_section_root_path(overrides)
	},

        doctor_section_root_path: function (overrides) {
                var options = {
                        controller: 'doctor_section/dashboard',
			action: 'index'
                };
                return Routing.get_path("/doctor_section/", options, overrides);
        },

	edit_admin_service_url: function (overrides) {
		return Routing.host + Routing.edit_admin_service_path(overrides)
	},

        edit_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'edit'
                };
                return Routing.get_path("/admin/services/:id/edit(.:format)?", options, overrides);
        },

	admin_specialties_url: function (overrides) {
		return Routing.host + Routing.admin_specialties_path(overrides)
	},

        admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'index'
                };
                return Routing.get_path("/admin/specialties(.:format)?", options, overrides);
        },

	new_existing_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.new_existing_doctor_section_specialties_path(overrides)
	},

        new_existing_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'new_existing'
                };
                return Routing.get_path("/doctor_section/specialties/new_existing(.:format)?", options, overrides);
        },

	new_existing_admin_admins_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_admins_path(overrides)
	},

        new_existing_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/admins/new_existing(.:format)?", options, overrides);
        },

	update_column_admin_service_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_service_path(overrides)
	},

        update_column_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'update_column'
                };
                return Routing.get_path("/admin/services/:id/update_column(.:format)?", options, overrides);
        },

	show_search_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_doctors_path(overrides)
	},

        show_search_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'show_search'
                };
                return Routing.get_path("/admin/doctors/show_search(.:format)?", options, overrides);
        },

	doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.doctor_section_doctor_service_path(overrides)
	},

        doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'show'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id(.:format)?", options, overrides);
        },

	update_table_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_specialties_path(overrides)
	},

        update_table_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'update_table'
                };
                return Routing.get_path("/admin/specialties/update_table(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_specialties_path(overrides)
	},

        edit_associated_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/specialties/edit_associated(.:format)?", options, overrides);
        },

	edit_associated_admin_admins_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_admins_path(overrides)
	},

        edit_associated_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/admins/edit_associated(.:format)?", options, overrides);
        },

	render_field_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_doctors_path(overrides)
	},

        render_field_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'render_field'
                };
                return Routing.get_path("/admin/doctors/render_field(.:format)?", options, overrides);
        },

	destroy_existing_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_doctor_section_doctor_service_path(overrides)
	},

        destroy_existing_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'destroy_existing'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/destroy_existing(.:format)?", options, overrides);
        },

	new_admin_service_url: function (overrides) {
		return Routing.host + Routing.new_admin_service_path(overrides)
	},

        new_admin_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'new'
                };
                return Routing.get_path("/admin/services/new(.:format)?", options, overrides);
        },

	list_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.list_admin_specialties_path(overrides)
	},

        list_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'list'
                };
                return Routing.get_path("/admin/specialties/list(.:format)?", options, overrides);
        },

	add_existing_doctor_section_specialties_url: function (overrides) {
		return Routing.host + Routing.add_existing_doctor_section_specialties_path(overrides)
	},

        add_existing_doctor_section_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'add_existing'
                };
                return Routing.get_path("/doctor_section/specialties/add_existing(.:format)?", options, overrides);
        },

	add_existing_admin_admins_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_admins_path(overrides)
	},

        add_existing_admin_admins_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/admins/add_existing(.:format)?", options, overrides);
        },

	admin_services_url: function (overrides) {
		return Routing.host + Routing.admin_services_path(overrides)
	},

        admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'index'
                };
                return Routing.get_path("/admin/services(.:format)?", options, overrides);
        },

	admin_url: function (overrides) {
		return Routing.host + Routing.admin_path(overrides)
	},

        admin_path: function (overrides) {
                var options = {
                        controller: 'admin/sql',
			action: 'index'
                };
                return Routing.get_path("/admin/sql/", options, overrides);
        },

	new_existing_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_doctors_path(overrides)
	},

        new_existing_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/doctors/new_existing(.:format)?", options, overrides);
        },

	add_association_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.add_association_doctor_section_doctor_service_path(overrides)
	},

        add_association_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'add_association'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/add_association(.:format)?", options, overrides);
        },

	show_search_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_specialties_path(overrides)
	},

        show_search_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'show_search'
                };
                return Routing.get_path("/admin/specialties/show_search(.:format)?", options, overrides);
        },

	doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.doctor_section_service_path(overrides)
	},

        doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'show'
                };
                return Routing.get_path("/doctor_section/services/:id(.:format)?", options, overrides);
        },

	admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.admin_doctor_service_path(overrides)
	},

        admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'show'
                };
                return Routing.get_path("/admin/doctor_services/:id(.:format)?", options, overrides);
        },

	render_field_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_doctor_service_path(overrides)
	},

        render_field_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/render_field(.:format)?", options, overrides);
        },

	edit_order_url: function (overrides) {
		return Routing.host + Routing.edit_order_path(overrides)
	},

        edit_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'orders',
			action: 'edit'
                };
                return Routing.get_path("/orders/:id/edit(.:format)?", options, overrides);
        },

	update_table_admin_services_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_services_path(overrides)
	},

        update_table_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'update_table'
                };
                return Routing.get_path("/admin/services/update_table(.:format)?", options, overrides);
        },

	edit_associated_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_doctors_path(overrides)
	},

        edit_associated_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/doctors/edit_associated(.:format)?", options, overrides);
        },

	render_field_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_specialties_path(overrides)
	},

        render_field_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'render_field'
                };
                return Routing.get_path("/admin/specialties/render_field(.:format)?", options, overrides);
        },

	destroy_existing_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_doctor_section_service_path(overrides)
	},

        destroy_existing_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'destroy_existing'
                };
                return Routing.get_path("/doctor_section/services/:id/destroy_existing(.:format)?", options, overrides);
        },

	destroy_existing_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_doctor_service_path(overrides)
	},

        destroy_existing_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/doctor_services/:id/destroy_existing(.:format)?", options, overrides);
        },

	list_admin_services_url: function (overrides) {
		return Routing.host + Routing.list_admin_services_path(overrides)
	},

        list_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'list'
                };
                return Routing.get_path("/admin/services/list(.:format)?", options, overrides);
        },

	add_existing_admin_doctors_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_doctors_path(overrides)
	},

        add_existing_admin_doctors_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctors',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/doctors/add_existing(.:format)?", options, overrides);
        },

	row_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.row_doctor_section_doctor_service_path(overrides)
	},

        row_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'row'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/row(.:format)?", options, overrides);
        },

	cancel_orders_url: function (overrides) {
		return Routing.host + Routing.cancel_orders_path(overrides)
	},

        cancel_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'cancel'
                };
                return Routing.get_path("/orders/cancel(.:format)?", options, overrides);
        },

	js_routes_url: function (overrides) {
		return Routing.host + Routing.js_routes_path(overrides)
	},

        js_routes_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'named_routes',
			action: 'generate'
                };
                return Routing.get_path("/js_routes(.:format)?", options, overrides);
        },

	new_existing_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_specialties_path(overrides)
	},

        new_existing_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/specialties/new_existing(.:format)?", options, overrides);
        },

	add_association_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.add_association_doctor_section_service_path(overrides)
	},

        add_association_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'add_association'
                };
                return Routing.get_path("/doctor_section/services/:id/add_association(.:format)?", options, overrides);
        },

	add_association_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_doctor_service_path(overrides)
	},

        add_association_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'add_association'
                };
                return Routing.get_path("/admin/doctor_services/:id/add_association(.:format)?", options, overrides);
        },

	submit_orders_url: function (overrides) {
		return Routing.host + Routing.submit_orders_path(overrides)
	},

        submit_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'submit'
                };
                return Routing.get_path("/orders/submit(.:format)?", options, overrides);
        },

	show_search_admin_services_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_services_path(overrides)
	},

        show_search_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'show_search'
                };
                return Routing.get_path("/admin/services/show_search(.:format)?", options, overrides);
        },

	admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.admin_specialty_service_path(overrides)
	},

        admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'show'
                };
                return Routing.get_path("/admin/specialty_services/:id(.:format)?", options, overrides);
        },

	nested_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.nested_doctor_section_doctor_service_path(overrides)
	},

        nested_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'nested'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/nested(.:format)?", options, overrides);
        },

	doctor_url: function (overrides) {
		return Routing.host + Routing.doctor_path(overrides)
	},

        doctor_path: function (overrides) {
                var options = {
                        step: '',
			controller: 'doctors',
			action: 'index'
                };
                return Routing.get_path("/doctors/", options, overrides);
        },

	edit_associated_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_specialties_path(overrides)
	},

        edit_associated_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/specialties/edit_associated(.:format)?", options, overrides);
        },

	render_field_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_service_path(overrides)
	},

        render_field_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/services/:id/render_field(.:format)?", options, overrides);
        },

	render_field_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_doctor_service_path(overrides)
	},

        render_field_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/doctor_services/:id/render_field(.:format)?", options, overrides);
        },

	render_field_admin_services_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_services_path(overrides)
	},

        render_field_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/services/render_field(.:format)?", options, overrides);
        },

	destroy_existing_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_specialty_service_path(overrides)
	},

        destroy_existing_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/specialty_services/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_doctor_service_path(overrides)
	},

        edit_associated_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/edit_associated(.:format)?", options, overrides);
        },

	error_orders_url: function (overrides) {
		return Routing.host + Routing.error_orders_path(overrides)
	},

        error_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'error'
                };
                return Routing.get_path("/orders/error(.:format)?", options, overrides);
        },

	row_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.row_doctor_section_service_path(overrides)
	},

        row_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'row'
                };
                return Routing.get_path("/doctor_section/services/:id/row(.:format)?", options, overrides);
        },

	row_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.row_admin_doctor_service_path(overrides)
	},

        row_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'row'
                };
                return Routing.get_path("/admin/doctor_services/:id/row(.:format)?", options, overrides);
        },

	add_existing_admin_specialties_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_specialties_path(overrides)
	},

        add_existing_admin_specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialties',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/specialties/add_existing(.:format)?", options, overrides);
        },

	lookup_orders_url: function (overrides) {
		return Routing.host + Routing.lookup_orders_path(overrides)
	},

        lookup_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'lookup'
                };
                return Routing.get_path("/orders/lookup(.:format)?", options, overrides);
        },

	new_existing_admin_services_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_services_path(overrides)
	},

        new_existing_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/services/new_existing(.:format)?", options, overrides);
        },

	add_association_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_specialty_service_path(overrides)
	},

        add_association_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'add_association'
                };
                return Routing.get_path("/admin/specialty_services/:id/add_association(.:format)?", options, overrides);
        },

	edit_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.edit_doctor_section_doctor_service_path(overrides)
	},

        edit_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'edit'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/edit(.:format)?", options, overrides);
        },

	admin_page_url: function (overrides) {
		return Routing.host + Routing.admin_page_path(overrides)
	},

        admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'show'
                };
                return Routing.get_path("/admin/pages/:id(.:format)?", options, overrides);
        },

	nested_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.nested_doctor_section_service_path(overrides)
	},

        nested_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'nested'
                };
                return Routing.get_path("/doctor_section/services/:id/nested(.:format)?", options, overrides);
        },

	nested_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.nested_admin_doctor_service_path(overrides)
	},

        nested_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'nested'
                };
                return Routing.get_path("/admin/doctor_services/:id/nested(.:format)?", options, overrides);
        },

	edit_associated_admin_services_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_services_path(overrides)
	},

        edit_associated_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/services/edit_associated(.:format)?", options, overrides);
        },

	render_field_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_specialty_service_path(overrides)
	},

        render_field_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/specialty_services/:id/render_field(.:format)?", options, overrides);
        },

	update_column_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.update_column_doctor_section_doctor_service_path(overrides)
	},

        update_column_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/doctor_services',
			action: 'update_column'
                };
                return Routing.get_path("/doctor_section/doctor_services/:id/update_column(.:format)?", options, overrides);
        },

	thank_you_orders_url: function (overrides) {
		return Routing.host + Routing.thank_you_orders_path(overrides)
	},

        thank_you_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'thank_you'
                };
                return Routing.get_path("/orders/thank_you(.:format)?", options, overrides);
        },

	edit_associated_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_doctor_service_path(overrides)
	},

        edit_associated_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/doctor_services/:id/edit_associated(.:format)?", options, overrides);
        },

	destroy_existing_admin_page_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_page_path(overrides)
	},

        destroy_existing_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/pages/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_service_path(overrides)
	},

        edit_associated_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/services/:id/edit_associated(.:format)?", options, overrides);
        },

	details_orders_url: function (overrides) {
		return Routing.host + Routing.details_orders_path(overrides)
	},

        details_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'orders',
			action: 'details'
                };
                return Routing.get_path("/orders/details(.:format)?", options, overrides);
        },

	add_existing_admin_services_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_services_path(overrides)
	},

        add_existing_admin_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/services',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/services/add_existing(.:format)?", options, overrides);
        },

	row_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.row_admin_specialty_service_path(overrides)
	},

        row_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'row'
                };
                return Routing.get_path("/admin/specialty_services/:id/row(.:format)?", options, overrides);
        },

	new_doctor_section_doctor_service_url: function (overrides) {
		return Routing.host + Routing.new_doctor_section_doctor_service_path(overrides)
	},

        new_doctor_section_doctor_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'new'
                };
                return Routing.get_path("/doctor_section/doctor_services/new(.:format)?", options, overrides);
        },

	add_association_admin_page_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_page_path(overrides)
	},

        add_association_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'add_association'
                };
                return Routing.get_path("/admin/pages/:id/add_association(.:format)?", options, overrides);
        },

	edit_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.edit_doctor_section_service_path(overrides)
	},

        edit_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'edit'
                };
                return Routing.get_path("/doctor_section/services/:id/edit(.:format)?", options, overrides);
        },

	edit_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.edit_admin_doctor_service_path(overrides)
	},

        edit_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'edit'
                };
                return Routing.get_path("/admin/doctor_services/:id/edit(.:format)?", options, overrides);
        },

	nested_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.nested_admin_specialty_service_path(overrides)
	},

        nested_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'nested'
                };
                return Routing.get_path("/admin/specialty_services/:id/nested(.:format)?", options, overrides);
        },

	doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.doctor_section_doctor_services_path(overrides)
	},

        doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'index'
                };
                return Routing.get_path("/doctor_section/doctor_services(.:format)?", options, overrides);
        },

	admin_order_url: function (overrides) {
		return Routing.host + Routing.admin_order_path(overrides)
	},

        admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'show'
                };
                return Routing.get_path("/admin/orders/:id(.:format)?", options, overrides);
        },

	update_column_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_doctor_service_path(overrides)
	},

        update_column_admin_doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctor_services',
			action: 'update_column'
                };
                return Routing.get_path("/admin/doctor_services/:id/update_column(.:format)?", options, overrides);
        },

	render_field_admin_page_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_page_path(overrides)
	},

        render_field_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'render_field'
                };
                return Routing.get_path("/admin/pages/:id/render_field(.:format)?", options, overrides);
        },

	update_column_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.update_column_doctor_section_service_path(overrides)
	},

        update_column_doctor_section_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/services',
			action: 'update_column'
                };
                return Routing.get_path("/doctor_section/services/:id/update_column(.:format)?", options, overrides);
        },

	destroy_existing_admin_order_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_order_path(overrides)
	},

        destroy_existing_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/orders/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_associated_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_specialty_service_path(overrides)
	},

        edit_associated_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/specialty_services/:id/edit_associated(.:format)?", options, overrides);
        },

	update_table_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.update_table_doctor_section_doctor_services_path(overrides)
	},

        update_table_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'update_table'
                };
                return Routing.get_path("/doctor_section/doctor_services/update_table(.:format)?", options, overrides);
        },

	search_doctors_city_url: function (overrides) {
		return Routing.host + Routing.search_doctors_city_path(overrides)
	},

        search_doctors_city_path: function (overrides) {
                var options = {
                        city: '',
			state: '',
			controller: 'search',
			action: 'search_doctors_city_state'
                };
                return Routing.get_path("/search/doctors/city/:city/:state/", options, overrides);
        },

	row_admin_page_url: function (overrides) {
		return Routing.host + Routing.row_admin_page_path(overrides)
	},

        row_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'row'
                };
                return Routing.get_path("/admin/pages/:id/row(.:format)?", options, overrides);
        },

	new_doctor_section_service_url: function (overrides) {
		return Routing.host + Routing.new_doctor_section_service_path(overrides)
	},

        new_doctor_section_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'new'
                };
                return Routing.get_path("/doctor_section/services/new(.:format)?", options, overrides);
        },

	new_admin_doctor_service_url: function (overrides) {
		return Routing.host + Routing.new_admin_doctor_service_path(overrides)
	},

        new_admin_doctor_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'new'
                };
                return Routing.get_path("/admin/doctor_services/new(.:format)?", options, overrides);
        },

	edit_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.edit_admin_specialty_service_path(overrides)
	},

        edit_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'edit'
                };
                return Routing.get_path("/admin/specialty_services/:id/edit(.:format)?", options, overrides);
        },

	list_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.list_doctor_section_doctor_services_path(overrides)
	},

        list_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'list'
                };
                return Routing.get_path("/doctor_section/doctor_services/list(.:format)?", options, overrides);
        },

	lookup_action_url: function (overrides) {
		return Routing.host + Routing.lookup_action_path(overrides)
	},

        lookup_action_path: function (overrides) {
                var options = {
                        controller: 'orders',
			action: 'perform_lookup'
                };
                return Routing.get_path("/orders/lookup/", options, overrides);
        },

	add_association_admin_order_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_order_path(overrides)
	},

        add_association_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'add_association'
                };
                return Routing.get_path("/admin/orders/:id/add_association(.:format)?", options, overrides);
        },

	nested_admin_page_url: function (overrides) {
		return Routing.host + Routing.nested_admin_page_path(overrides)
	},

        nested_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'nested'
                };
                return Routing.get_path("/admin/pages/:id/nested(.:format)?", options, overrides);
        },

	doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.doctor_section_services_path(overrides)
	},

        doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'index'
                };
                return Routing.get_path("/doctor_section/services(.:format)?", options, overrides);
        },

	admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.admin_doctor_services_path(overrides)
	},

        admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'index'
                };
                return Routing.get_path("/admin/doctor_services(.:format)?", options, overrides);
        },

	root_url: function (overrides) {
		return Routing.host + Routing.root_path(overrides)
	},

        root_path: function (overrides) {
                var options = {
                        controller: 'home',
			action: 'index'
                };
                return Routing.get_path("/", options, overrides);
        },

	render_field_admin_order_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_order_path(overrides)
	},

        render_field_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'render_field'
                };
                return Routing.get_path("/admin/orders/:id/render_field(.:format)?", options, overrides);
        },

	edit_service_url: function (overrides) {
		return Routing.host + Routing.edit_service_path(overrides)
	},

        edit_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'services',
			action: 'edit'
                };
                return Routing.get_path("/services/:id/edit(.:format)?", options, overrides);
        },

	update_column_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_specialty_service_path(overrides)
	},

        update_column_admin_specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialty_services',
			action: 'update_column'
                };
                return Routing.get_path("/admin/specialty_services/:id/update_column(.:format)?", options, overrides);
        },

	show_search_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.show_search_doctor_section_doctor_services_path(overrides)
	},

        show_search_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'show_search'
                };
                return Routing.get_path("/doctor_section/doctor_services/show_search(.:format)?", options, overrides);
        },

	edit_associated_admin_page_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_page_path(overrides)
	},

        edit_associated_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/pages/:id/edit_associated(.:format)?", options, overrides);
        },

	update_table_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.update_table_doctor_section_services_path(overrides)
	},

        update_table_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'update_table'
                };
                return Routing.get_path("/doctor_section/services/update_table(.:format)?", options, overrides);
        },

	update_table_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_doctor_services_path(overrides)
	},

        update_table_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'update_table'
                };
                return Routing.get_path("/admin/doctor_services/update_table(.:format)?", options, overrides);
        },

	edit_user_session_url: function (overrides) {
		return Routing.host + Routing.edit_user_session_path(overrides)
	},

        edit_user_session_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'user_sessions',
			action: 'edit'
                };
                return Routing.get_path("/user_session/edit(.:format)?", options, overrides);
        },

	new_service_url: function (overrides) {
		return Routing.host + Routing.new_service_path(overrides)
	},

        new_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'services',
			action: 'new'
                };
                return Routing.get_path("/services/new(.:format)?", options, overrides);
        },

	new_admin_specialty_service_url: function (overrides) {
		return Routing.host + Routing.new_admin_specialty_service_path(overrides)
	},

        new_admin_specialty_service_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'new'
                };
                return Routing.get_path("/admin/specialty_services/new(.:format)?", options, overrides);
        },

	render_field_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_doctor_services_path(overrides)
	},

        render_field_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/doctor_services/render_field(.:format)?", options, overrides);
        },

	row_admin_order_url: function (overrides) {
		return Routing.host + Routing.row_admin_order_path(overrides)
	},

        row_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'row'
                };
                return Routing.get_path("/admin/orders/:id/row(.:format)?", options, overrides);
        },

	edit_admin_page_url: function (overrides) {
		return Routing.host + Routing.edit_admin_page_path(overrides)
	},

        edit_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'edit'
                };
                return Routing.get_path("/admin/pages/:id/edit(.:format)?", options, overrides);
        },

	list_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.list_doctor_section_services_path(overrides)
	},

        list_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'list'
                };
                return Routing.get_path("/doctor_section/services/list(.:format)?", options, overrides);
        },

	list_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.list_admin_doctor_services_path(overrides)
	},

        list_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'list'
                };
                return Routing.get_path("/admin/doctor_services/list(.:format)?", options, overrides);
        },

	search_doctors_company_url: function (overrides) {
		return Routing.host + Routing.search_doctors_company_path(overrides)
	},

        search_doctors_company_path: function (overrides) {
                var options = {
                        query: '',
			controller: 'search',
			action: 'search_doctors_company'
                };
                return Routing.get_path("/search/doctors/company/:query/", options, overrides);
        },

	new_user_session_url: function (overrides) {
		return Routing.host + Routing.new_user_session_path(overrides)
	},

        new_user_session_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'user_sessions',
			action: 'new'
                };
                return Routing.get_path("/user_session/new(.:format)?", options, overrides);
        },

	nested_admin_order_url: function (overrides) {
		return Routing.host + Routing.nested_admin_order_path(overrides)
	},

        nested_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'nested'
                };
                return Routing.get_path("/admin/orders/:id/nested(.:format)?", options, overrides);
        },

	admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.admin_specialty_services_path(overrides)
	},

        admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'index'
                };
                return Routing.get_path("/admin/specialty_services(.:format)?", options, overrides);
        },

	new_existing_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.new_existing_doctor_section_doctor_services_path(overrides)
	},

        new_existing_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'new_existing'
                };
                return Routing.get_path("/doctor_section/doctor_services/new_existing(.:format)?", options, overrides);
        },

	update_column_admin_page_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_page_path(overrides)
	},

        update_column_admin_page_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/pages',
			action: 'update_column'
                };
                return Routing.get_path("/admin/pages/:id/update_column(.:format)?", options, overrides);
        },

	show_search_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.show_search_doctor_section_services_path(overrides)
	},

        show_search_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'show_search'
                };
                return Routing.get_path("/doctor_section/services/show_search(.:format)?", options, overrides);
        },

	show_search_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_doctor_services_path(overrides)
	},

        show_search_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'show_search'
                };
                return Routing.get_path("/admin/doctor_services/show_search(.:format)?", options, overrides);
        },

	doctor_service_url: function (overrides) {
		return Routing.host + Routing.doctor_service_path(overrides)
	},

        doctor_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_services',
			action: 'show'
                };
                return Routing.get_path("/doctor_services/:id(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_doctor_services_path(overrides)
	},

        edit_associated_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/doctor_services/edit_associated(.:format)?", options, overrides);
        },

	edit_associated_admin_order_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_order_path(overrides)
	},

        edit_associated_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/orders/:id/edit_associated(.:format)?", options, overrides);
        },

	update_table_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_specialty_services_path(overrides)
	},

        update_table_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'update_table'
                };
                return Routing.get_path("/admin/specialty_services/update_table(.:format)?", options, overrides);
        },

	new_admin_page_url: function (overrides) {
		return Routing.host + Routing.new_admin_page_path(overrides)
	},

        new_admin_page_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'new'
                };
                return Routing.get_path("/admin/pages/new(.:format)?", options, overrides);
        },

	render_field_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_services_path(overrides)
	},

        render_field_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/services/render_field(.:format)?", options, overrides);
        },

	render_field_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_doctor_services_path(overrides)
	},

        render_field_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/doctor_services/render_field(.:format)?", options, overrides);
        },

	order_create_url: function (overrides) {
		return Routing.host + Routing.order_create_path(overrides)
	},

        order_create_path: function (overrides) {
                var options = {
                        doctor_service_id: '',
			controller: 'orders',
			action: 'create'
                };
                return Routing.get_path("/orders/:doctor_service_id/", options, overrides);
        },

	specialty_service_url: function (overrides) {
		return Routing.host + Routing.specialty_service_path(overrides)
	},

        specialty_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'specialty_services',
			action: 'show'
                };
                return Routing.get_path("/specialty_services/:id(.:format)?", options, overrides);
        },

	edit_admin_order_url: function (overrides) {
		return Routing.host + Routing.edit_admin_order_path(overrides)
	},

        edit_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'edit'
                };
                return Routing.get_path("/admin/orders/:id/edit(.:format)?", options, overrides);
        },

	list_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.list_admin_specialty_services_path(overrides)
	},

        list_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'list'
                };
                return Routing.get_path("/admin/specialty_services/list(.:format)?", options, overrides);
        },

	add_existing_doctor_section_doctor_services_url: function (overrides) {
		return Routing.host + Routing.add_existing_doctor_section_doctor_services_path(overrides)
	},

        add_existing_doctor_section_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/doctor_services',
			action: 'add_existing'
                };
                return Routing.get_path("/doctor_section/doctor_services/add_existing(.:format)?", options, overrides);
        },

	admin_root_url: function (overrides) {
		return Routing.host + Routing.admin_root_path(overrides)
	},

        admin_root_path: function (overrides) {
                var options = {
                        controller: 'admin/admin',
			action: 'index'
                };
                return Routing.get_path("/admin/", options, overrides);
        },

	admin_pages_url: function (overrides) {
		return Routing.host + Routing.admin_pages_path(overrides)
	},

        admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'index'
                };
                return Routing.get_path("/admin/pages(.:format)?", options, overrides);
        },

	new_existing_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.new_existing_doctor_section_services_path(overrides)
	},

        new_existing_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'new_existing'
                };
                return Routing.get_path("/doctor_section/services/new_existing(.:format)?", options, overrides);
        },

	new_existing_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_doctor_services_path(overrides)
	},

        new_existing_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/doctor_services/new_existing(.:format)?", options, overrides);
        },

	admin_admin_url: function (overrides) {
		return Routing.host + Routing.admin_admin_path(overrides)
	},

        admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'show'
                };
                return Routing.get_path("/admin/admins/:id(.:format)?", options, overrides);
        },

	specialty_url: function (overrides) {
		return Routing.host + Routing.specialty_path(overrides)
	},

        specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'specialties',
			action: 'show'
                };
                return Routing.get_path("/specialties/:id(.:format)?", options, overrides);
        },

	update_column_admin_order_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_order_path(overrides)
	},

        update_column_admin_order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/orders',
			action: 'update_column'
                };
                return Routing.get_path("/admin/orders/:id/update_column(.:format)?", options, overrides);
        },

	show_search_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_specialty_services_path(overrides)
	},

        show_search_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'show_search'
                };
                return Routing.get_path("/admin/specialty_services/show_search(.:format)?", options, overrides);
        },

	doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.doctor_section_specialty_path(overrides)
	},

        doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'show'
                };
                return Routing.get_path("/doctor_section/specialties/:id(.:format)?", options, overrides);
        },

	update_table_admin_pages_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_pages_path(overrides)
	},

        update_table_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'update_table'
                };
                return Routing.get_path("/admin/pages/update_table(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_services_path(overrides)
	},

        edit_associated_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/services/edit_associated(.:format)?", options, overrides);
        },

	edit_associated_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_doctor_services_path(overrides)
	},

        edit_associated_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/doctor_services/edit_associated(.:format)?", options, overrides);
        },

	new_admin_order_url: function (overrides) {
		return Routing.host + Routing.new_admin_order_path(overrides)
	},

        new_admin_order_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'new'
                };
                return Routing.get_path("/admin/orders/new(.:format)?", options, overrides);
        },

	render_field_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_specialty_services_path(overrides)
	},

        render_field_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'render_field'
                };
                return Routing.get_path("/admin/specialty_services/render_field(.:format)?", options, overrides);
        },

	destroy_existing_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_doctor_section_specialty_path(overrides)
	},

        destroy_existing_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'destroy_existing'
                };
                return Routing.get_path("/doctor_section/specialties/:id/destroy_existing(.:format)?", options, overrides);
        },

	destroy_existing_admin_admin_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_admin_path(overrides)
	},

        destroy_existing_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/admins/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_specialty_url: function (overrides) {
		return Routing.host + Routing.edit_specialty_path(overrides)
	},

        edit_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'specialties',
			action: 'edit'
                };
                return Routing.get_path("/specialties/:id/edit(.:format)?", options, overrides);
        },

	add_existing_doctor_section_services_url: function (overrides) {
		return Routing.host + Routing.add_existing_doctor_section_services_path(overrides)
	},

        add_existing_doctor_section_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/services',
			action: 'add_existing'
                };
                return Routing.get_path("/doctor_section/services/add_existing(.:format)?", options, overrides);
        },

	add_existing_admin_doctor_services_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_doctor_services_path(overrides)
	},

        add_existing_admin_doctor_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/doctor_services',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/doctor_services/add_existing(.:format)?", options, overrides);
        },

	list_admin_pages_url: function (overrides) {
		return Routing.host + Routing.list_admin_pages_path(overrides)
	},

        list_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'list'
                };
                return Routing.get_path("/admin/pages/list(.:format)?", options, overrides);
        },

	add_association_admin_admin_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_admin_path(overrides)
	},

        add_association_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'add_association'
                };
                return Routing.get_path("/admin/admins/:id/add_association(.:format)?", options, overrides);
        },

	new_specialty_url: function (overrides) {
		return Routing.host + Routing.new_specialty_path(overrides)
	},

        new_specialty_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'specialties',
			action: 'new'
                };
                return Routing.get_path("/specialties/new(.:format)?", options, overrides);
        },

	admin_orders_url: function (overrides) {
		return Routing.host + Routing.admin_orders_path(overrides)
	},

        admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'index'
                };
                return Routing.get_path("/admin/orders(.:format)?", options, overrides);
        },

	new_existing_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_specialty_services_path(overrides)
	},

        new_existing_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/specialty_services/new_existing(.:format)?", options, overrides);
        },

	add_association_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.add_association_doctor_section_specialty_path(overrides)
	},

        add_association_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'add_association'
                };
                return Routing.get_path("/doctor_section/specialties/:id/add_association(.:format)?", options, overrides);
        },

	show_search_admin_pages_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_pages_path(overrides)
	},

        show_search_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'show_search'
                };
                return Routing.get_path("/admin/pages/show_search(.:format)?", options, overrides);
        },

	admin_doctor_url: function (overrides) {
		return Routing.host + Routing.admin_doctor_path(overrides)
	},

        admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'show'
                };
                return Routing.get_path("/admin/doctors/:id(.:format)?", options, overrides);
        },

	update_table_admin_orders_url: function (overrides) {
		return Routing.host + Routing.update_table_admin_orders_path(overrides)
	},

        update_table_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'update_table'
                };
                return Routing.get_path("/admin/orders/update_table(.:format)?", options, overrides);
        },

	services_url: function (overrides) {
		return Routing.host + Routing.services_path(overrides)
	},

        services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'services',
			action: 'index'
                };
                return Routing.get_path("/services(.:format)?", options, overrides);
        },

	edit_associated_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_specialty_services_path(overrides)
	},

        edit_associated_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/specialty_services/edit_associated(.:format)?", options, overrides);
        },

	render_field_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.render_field_doctor_section_specialty_path(overrides)
	},

        render_field_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'render_field'
                };
                return Routing.get_path("/doctor_section/specialties/:id/render_field(.:format)?", options, overrides);
        },

	render_field_admin_admin_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_admin_path(overrides)
	},

        render_field_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'render_field'
                };
                return Routing.get_path("/admin/admins/:id/render_field(.:format)?", options, overrides);
        },

	page_url: function (overrides) {
		return Routing.host + Routing.page_path(overrides)
	},

        page_path: function (overrides) {
                var options = {
                        slug: '',
			controller: 'pages',
			action: 'show'
                };
                return Routing.get_path("/page/:slug/", options, overrides);
        },

	destroy_existing_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_doctor_path(overrides)
	},

        destroy_existing_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/doctors/:id/destroy_existing(.:format)?", options, overrides);
        },

	render_field_admin_pages_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_pages_path(overrides)
	},

        render_field_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'render_field'
                };
                return Routing.get_path("/admin/pages/render_field(.:format)?", options, overrides);
        },

	list_admin_orders_url: function (overrides) {
		return Routing.host + Routing.list_admin_orders_path(overrides)
	},

        list_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'list'
                };
                return Routing.get_path("/admin/orders/list(.:format)?", options, overrides);
        },

	add_existing_admin_specialty_services_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_specialty_services_path(overrides)
	},

        add_existing_admin_specialty_services_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/specialty_services',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/specialty_services/add_existing(.:format)?", options, overrides);
        },

	row_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.row_doctor_section_specialty_path(overrides)
	},

        row_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'row'
                };
                return Routing.get_path("/doctor_section/specialties/:id/row(.:format)?", options, overrides);
        },

	row_admin_admin_url: function (overrides) {
		return Routing.host + Routing.row_admin_admin_path(overrides)
	},

        row_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'row'
                };
                return Routing.get_path("/admin/admins/:id/row(.:format)?", options, overrides);
        },

	new_existing_admin_pages_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_pages_path(overrides)
	},

        new_existing_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/pages/new_existing(.:format)?", options, overrides);
        },

	add_association_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_doctor_path(overrides)
	},

        add_association_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'add_association'
                };
                return Routing.get_path("/admin/doctors/:id/add_association(.:format)?", options, overrides);
        },

	admin_specialty_url: function (overrides) {
		return Routing.host + Routing.admin_specialty_path(overrides)
	},

        admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'show'
                };
                return Routing.get_path("/admin/specialties/:id(.:format)?", options, overrides);
        },

	nested_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.nested_doctor_section_specialty_path(overrides)
	},

        nested_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'nested'
                };
                return Routing.get_path("/doctor_section/specialties/:id/nested(.:format)?", options, overrides);
        },

	nested_admin_admin_url: function (overrides) {
		return Routing.host + Routing.nested_admin_admin_path(overrides)
	},

        nested_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'nested'
                };
                return Routing.get_path("/admin/admins/:id/nested(.:format)?", options, overrides);
        },

	show_search_admin_orders_url: function (overrides) {
		return Routing.host + Routing.show_search_admin_orders_path(overrides)
	},

        show_search_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'show_search'
                };
                return Routing.get_path("/admin/orders/show_search(.:format)?", options, overrides);
        },

	new_doctor_url: function (overrides) {
		return Routing.host + Routing.new_doctor_path(overrides)
	},

        new_doctor_path: function (overrides) {
                var options = {
                        controller: 'doctors',
			action: 'addnew'
                };
                return Routing.get_path("/doctor/register/", options, overrides);
        },

	render_field_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_doctor_path(overrides)
	},

        render_field_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'render_field'
                };
                return Routing.get_path("/admin/doctors/:id/render_field(.:format)?", options, overrides);
        },

	edit_associated_admin_pages_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_pages_path(overrides)
	},

        edit_associated_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/pages/edit_associated(.:format)?", options, overrides);
        },

	render_field_admin_orders_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_orders_path(overrides)
	},

        render_field_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'render_field'
                };
                return Routing.get_path("/admin/orders/render_field(.:format)?", options, overrides);
        },

	destroy_existing_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_specialty_path(overrides)
	},

        destroy_existing_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/specialties/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_associated_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.edit_associated_doctor_section_specialty_path(overrides)
	},

        edit_associated_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'edit_associated'
                };
                return Routing.get_path("/doctor_section/specialties/:id/edit_associated(.:format)?", options, overrides);
        },

	edit_associated_admin_admin_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_admin_path(overrides)
	},

        edit_associated_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/admins/:id/edit_associated(.:format)?", options, overrides);
        },

	user_session_url: function (overrides) {
		return Routing.host + Routing.user_session_path(overrides)
	},

        user_session_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'user_sessions',
			action: 'show'
                };
                return Routing.get_path("/user_session(.:format)?", options, overrides);
        },

	add_existing_admin_pages_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_pages_path(overrides)
	},

        add_existing_admin_pages_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/pages',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/pages/add_existing(.:format)?", options, overrides);
        },

	row_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.row_admin_doctor_path(overrides)
	},

        row_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'row'
                };
                return Routing.get_path("/admin/doctors/:id/row(.:format)?", options, overrides);
        },

	add_association_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_specialty_path(overrides)
	},

        add_association_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'add_association'
                };
                return Routing.get_path("/admin/specialties/:id/add_association(.:format)?", options, overrides);
        },

	edit_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.edit_doctor_section_specialty_path(overrides)
	},

        edit_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'edit'
                };
                return Routing.get_path("/doctor_section/specialties/:id/edit(.:format)?", options, overrides);
        },

	edit_admin_admin_url: function (overrides) {
		return Routing.host + Routing.edit_admin_admin_path(overrides)
	},

        edit_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'edit'
                };
                return Routing.get_path("/admin/admins/:id/edit(.:format)?", options, overrides);
        },

	new_existing_admin_orders_url: function (overrides) {
		return Routing.host + Routing.new_existing_admin_orders_path(overrides)
	},

        new_existing_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'new_existing'
                };
                return Routing.get_path("/admin/orders/new_existing(.:format)?", options, overrides);
        },

	specialties_url: function (overrides) {
		return Routing.host + Routing.specialties_path(overrides)
	},

        specialties_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'specialties',
			action: 'index'
                };
                return Routing.get_path("/specialties(.:format)?", options, overrides);
        },

	admin_service_url: function (overrides) {
		return Routing.host + Routing.admin_service_path(overrides)
	},

        admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'show'
                };
                return Routing.get_path("/admin/services/:id(.:format)?", options, overrides);
        },

	nested_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.nested_admin_doctor_path(overrides)
	},

        nested_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'nested'
                };
                return Routing.get_path("/admin/doctors/:id/nested(.:format)?", options, overrides);
        },

	edit_associated_admin_orders_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_orders_path(overrides)
	},

        edit_associated_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/orders/edit_associated(.:format)?", options, overrides);
        },

	render_field_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.render_field_admin_specialty_path(overrides)
	},

        render_field_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'render_field'
                };
                return Routing.get_path("/admin/specialties/:id/render_field(.:format)?", options, overrides);
        },

	update_column_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.update_column_doctor_section_specialty_path(overrides)
	},

        update_column_doctor_section_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'doctor_section/specialties',
			action: 'update_column'
                };
                return Routing.get_path("/doctor_section/specialties/:id/update_column(.:format)?", options, overrides);
        },

	update_column_admin_admin_url: function (overrides) {
		return Routing.host + Routing.update_column_admin_admin_path(overrides)
	},

        update_column_admin_admin_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/admins',
			action: 'update_column'
                };
                return Routing.get_path("/admin/admins/:id/update_column(.:format)?", options, overrides);
        },

	search_services_url: function (overrides) {
		return Routing.host + Routing.search_services_path(overrides)
	},

        search_services_path: function (overrides) {
                var options = {
                        specialty_id: 'all',
			query: '',
			controller: 'search',
			action: 'services'
                };
                return Routing.get_path("/search/services/:specialty_id/:query/", options, overrides);
        },

	destroy_existing_admin_service_url: function (overrides) {
		return Routing.host + Routing.destroy_existing_admin_service_path(overrides)
	},

        destroy_existing_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'destroy_existing'
                };
                return Routing.get_path("/admin/services/:id/destroy_existing(.:format)?", options, overrides);
        },

	edit_associated_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.edit_associated_admin_doctor_path(overrides)
	},

        edit_associated_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'edit_associated'
                };
                return Routing.get_path("/admin/doctors/:id/edit_associated(.:format)?", options, overrides);
        },

	search_doctors_zipcode_url: function (overrides) {
		return Routing.host + Routing.search_doctors_zipcode_path(overrides)
	},

        search_doctors_zipcode_path: function (overrides) {
                var options = {
                        zipcode: '',
			controller: 'search',
			action: 'search_doctors_zipcode'
                };
                return Routing.get_path("/search/doctors/zipcode/:zipcode/", options, overrides);
        },

	row_admin_specialty_url: function (overrides) {
		return Routing.host + Routing.row_admin_specialty_path(overrides)
	},

        row_admin_specialty_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/specialties',
			action: 'row'
                };
                return Routing.get_path("/admin/specialties/:id/row(.:format)?", options, overrides);
        },

	new_doctor_section_specialty_url: function (overrides) {
		return Routing.host + Routing.new_doctor_section_specialty_path(overrides)
	},

        new_doctor_section_specialty_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'doctor_section/specialties',
			action: 'new'
                };
                return Routing.get_path("/doctor_section/specialties/new(.:format)?", options, overrides);
        },

	new_admin_admin_url: function (overrides) {
		return Routing.host + Routing.new_admin_admin_path(overrides)
	},

        new_admin_admin_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/admins',
			action: 'new'
                };
                return Routing.get_path("/admin/admins/new(.:format)?", options, overrides);
        },

	add_existing_admin_orders_url: function (overrides) {
		return Routing.host + Routing.add_existing_admin_orders_path(overrides)
	},

        add_existing_admin_orders_path: function (overrides) {
                var options = {
                        format: '',
			controller: 'admin/orders',
			action: 'add_existing'
                };
                return Routing.get_path("/admin/orders/add_existing(.:format)?", options, overrides);
        },

	order_url: function (overrides) {
		return Routing.host + Routing.order_path(overrides)
	},

        order_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'orders',
			action: 'update'
                };
                return Routing.get_path("/orders/:id(.:format)?", options, overrides);
        },

	add_association_admin_service_url: function (overrides) {
		return Routing.host + Routing.add_association_admin_service_path(overrides)
	},

        add_association_admin_service_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/services',
			action: 'add_association'
                };
                return Routing.get_path("/admin/services/:id/add_association(.:format)?", options, overrides);
        },

	edit_admin_doctor_url: function (overrides) {
		return Routing.host + Routing.edit_admin_doctor_path(overrides)
	},

        edit_admin_doctor_path: function (overrides) {
                var options = {
                        id: '',
			format: '',
			controller: 'admin/doctors',
			action: 'edit'
                };
                return Routing.get_path("/admin/doctors/:id/edit(.:format)?", options, overrides);
        },


        host: "http://localhost:3000"

};
