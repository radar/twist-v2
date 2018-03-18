module Web::Controllers::SignUp
  class Perform
    include Web::Action

    params do
      configure do
        def self.messages
          default_messages.merge(
            en: {
              errors: {
                password: "did not match password confirmation"
              }
            }
          )
        end
      end

      required(:user).schema do
        required(:email).filled
        required(:password).filled
        required(:password_confirmation).filled

        rule(password: %i[password password_confirmation]) do |password, password_confirmation|
          password.eql?(password_confirmation)
        end
      end
    end

    def call(params)
      unless params.valid?
        flash[:alert] = "We are having trouble signing you up."
        self.status = 422
        return
      end

      create_user = Web::Transactions::CreateUser.new
      create_user.call(params[:user]) do |result|
        result.success do |user|
          sign_in(user)

          flash[:notice] = "You have signed up successfully."
          redirect_to '/'
        end
      end
    end
  end
end
