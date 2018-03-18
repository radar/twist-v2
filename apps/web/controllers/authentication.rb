module Web
  module Controllers
    module Authentication
      class NullWarden
        def user
          nil
        end
      end

      def self.included(action)
        action.class_eval do
          expose :current_user
        end
      end

      private

      def warden
        request.env['warden'] || NullWarden.new
      end

      def sign_in(user)
        warden.set_user(user)
      end

      def sign_out
        warden.logout
      end

      def current_user
        warden.user
      end
    end
  end
end
