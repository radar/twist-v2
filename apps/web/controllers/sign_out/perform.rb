module Web::Controllers::SignOut
  class Perform
    include Web::Action

    def call(params)
      sign_out if current_user
      flash[:notice] = "You have now signed out."
      redirect_to '/'
    end
  end
end
