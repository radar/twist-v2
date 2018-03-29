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

      def require_authentication!
        return if current_user

        flash[:alert] = "You must be signed in to do that."
        redirect_to routes.sign_in_path
      end
    end
  end
end
