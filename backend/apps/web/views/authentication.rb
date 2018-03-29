module Web
  module Views
    module Authentication
      def user_signed_in?
        !current_user.nil?
      end
    end
  end
end
