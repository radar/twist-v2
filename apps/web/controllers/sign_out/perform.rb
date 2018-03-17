module Web::Controllers::SignOut
  class Perform
    include Web::Action

    def call(params)
      sign_out
      flash[:notice] = "You have now signed out."
      redirect_to root_path
    end
  end
end
