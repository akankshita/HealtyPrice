# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper

  def icon(name,title=nil)
    ['<span class="ss_sprite ss_',name,'">&nbsp;</span>'].join
  end
  
  def tooltip_question(text)
    ['<span title="',text,'" class="tooltip ss_sprite ss_help">&nbsp;</span>'].join
  end

  def get_config(key)
	config = Specialty.find_by_sql("SELECT config_value FROM configurations WHERE config_name = '"+key+"'")
	if config.size == 0
		"Not Found"
	else
		config[0].config_value
	end
  end

  def inline_errors(context, collection)
	if collection != nil && collection[context] != nil && collection[context] != ""
		" <div class='inline_errors'>" + collection[context] + "</div>"
	else
		""
	end
	#" <span class='inline_errors'>" + collection[context] + "</div>"
  end

  def shorten (string, count = 30)
	if string.length >= count 
		shortened = string[0, count]
		splitted = shortened.split(/\s/)
		words = splitted.length
		if words == 1
			words = 2
		end
		"<span class=\"tt_tip\" onmouseover=\"ShowToolTip('"+string+"', this);\">" + splitted[0, words-1].join(" ") + "...</span>"
	else 
		string
	end
  end

  def browser_type
	if request.user_agent.inspect["Firefox/3"] > -1
		"FF3"
	elsif request.user_agent.inspect["MSIE 8"] > -1
		"IE8"
	elsif request.user_agent.inspect["x"] > -1
		"x"
	elsif request.user_agent.inspect["y"] > -1
		"y"
	else
		"unknown"
	end
  end

	def state_abbr(state_code)
		#state_abbr = {  'AL' => 'Alabama',  'AK' => 'Alaska',  'AS' => 'America Samoa',  'AZ' => 'Arizona',  'AR' => 'Arkansas',  'CA' => 'California',  'CO' => 'Colorado',  'CT' => 'Connecticut',  'DE' => 'Delaware',  'DC' => 'District of Columbia',  'FM' => 'Micronesia1',  'FL' => 'Florida',  'GA' => 'Georgia',  'GU' => 'Guam',  'HI' => 'Hawaii',  'ID' => 'Idaho',  'IL' => 'Illinois',  'IN' => 'Indiana',  'IA' => 'Iowa',  'KS' => 'Kansas',  'KY' => 'Kentucky',  'LA' => 'Louisiana',  'ME' => 'Maine',  'MH' => 'Islands1',  'MD' => 'Maryland',  'MA' => 'Massachusetts',  'MI' => 'Michigan',  'MN' => 'Minnesota',  'MS' => 'Mississippi',  'MO' => 'Missouri',  'MT' => 'Montana',  'NE' => 'Nebraska',  'NV' => 'Nevada',  'NH' => 'New Hampshire',  'NJ' => 'New Jersey',  'NM' => 'New Mexico',  'NY' => 'New York',  'NC' => 'North Carolina',  'ND' => 'North Dakota',  'OH' => 'Ohio',  'OK' => 'Oklahoma',  'OR' => 'Oregon',  'PW' => 'Palau',  'PA' => 'Pennsylvania',  'PR' => 'Puerto Rico',  'RI' => 'Rhode Island',  'SC' => 'South Carolina',  'SD' => 'South Dakota',  'TN' => 'Tennessee',  'TX' => 'Texas',  'UT' => 'Utah',  'VT' => 'Vermont',  'VI' => 'Virgin Island',  'VA' => 'Virginia',  'WA' => 'Washington',  'WV' => 'West Virginia',  'WI' => 'Wisconsin',  'WY' => 'Wyoming'}
		#state_abbr[state_code]
	end

	def state_code(state_name)
		#state_code = {  'Alabama' => 'AL',  'Alaska' => 'AK',  'America Samoa' => 'AS',  'Arizona' => 'AZ',  'Arkansas' => 'AR',  'California' => 'CA',  'Colorado' => 'CO',  'Connecticut' => 'CT',  'Delaware' => 'DE',  'District of Columbia' => 'DC',  'Micronesia1' => 'FM',  'Florida' => 'FL',  'Georgia' => 'GA',  'Guam' => 'GU',  'Hawaii' => 'HI',  'Idaho' => 'ID',  'Illinois' => 'IL',  'Indiana' => IN'',  'Iowa' => 'IA',  'Kansas' => 'KS',  'Kentucky' => 'KY',  'Louisiana' => 'LA',  'Maine' => 'ME',  'Islands1' => 'MH',  'Maryland' => 'MD',  'Massachusetts' => 'MA',  'Michigan' => 'MI',  'Minnesota' => 'MN',  'Mississippi' => 'MS',  'Missouri' => 'MO',  'Montana' => 'MT',  'Nebraska' => 'NE',  'Nevada' => 'NV',  'New Hampshire' => 'NH',  'New Jersey' => 'NJ',  'New Mexico' => 'NM',  'New York' => 'NY',  'North Carolina' => 'NC',  'North Dakota' => 'ND',  'Ohio' => 'OH',  'Oklahoma' => 'OK',  'Oregon' => 'OR',  'Palau' => 'PW',  'Pennsylvania' => 'PA',  'Puerto Rico' => 'PR',  'Rhode Island' => 'RI',  'South Carolina' => 'SC',  'South Dakota' => 'SD',  'Tennessee' => 'TN',  'Texas' => 'TX',  'Utah' => 'UT',  'Vermont' => 'VT',  'Virgin Island' => 'VI',  'Virginia' => 'VA',  'Washington' => 'WA',  'West Virginia' => 'WV',  'Wisconsin' => 'WI',  'Wyoming' => 'WY'}
		#state_code[state_name]
	end

  def blue_box(header,&block)
    content = capture(&block)
    concat(%%
     <div class="blue_box_big">
		<div class="blue_box_big_top_bg">#{header}</div>
		<div class="blue_box_big_content">
			#{content}
		</div>
	</div>
    %,block.binding)
  end
end
