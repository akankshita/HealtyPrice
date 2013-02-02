require 'ftools'

class ChatController < ActionController::Base

	def receive
		#File.open('/chats/test.txt', 'r') do |f1|
		#	while line = f1.gets
				#render :text => "line" + params[:pointer]
		#	end
		#end
		render :text => "line"
	end

	def send
		File.open('/chats/test.txt', 'w') do |f2|
			f2.puts "<b>XOX:</b> "+params[:message]+"<br/>"
		end
	end

end
