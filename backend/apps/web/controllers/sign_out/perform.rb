module Web::Controllers::SignOut
  class Perform
    include Web::Action

    def call(_params)
      sign_out if current_user
      flash[:notice] = "You have now signed out."
      redirect_to '/users/sign_in'
    end
  end
end
