require "spec_helper"

module Twist
  describe Transactions::Users::Create do
    it "creates a user with an encrypted password" do
      result = subject.(
        email: "me@ryanbigg.com",
        name: "Ryan Bigg",
        password: "password",
        github_login: "radar",
      )

      expect(result).to be_success
      user = result.success

      expect(user.encrypted_password).not_to be_nil
    end
  end
end
