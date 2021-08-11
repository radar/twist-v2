require "spec_helper"

module Twist
  describe Transactions::Users::FindCurrentUser do
    include Twist::Import[
      "transactions.users.generate_jwt",
      create_user: "transactions.users.create"
    ]

    let(:user) do
      create_user.(
        email: "me@ryanbigg.com",
        name: "Ryan Bigg",
        password: "password",
        github_login: "radar",
      ).success
    end

    let(:token) { generate_jwt.(email: user.email).success }

    it "finds a user by a given JWT token" do
      result = subject.(token)
      expect(result).to be_success
      expect(result.success).to eq(user)
    end

    it "finds no user with a nil token" do
      result = subject.(nil)
      expect(result).to be_failure
    end

    it "finds no user with a blank token" do
      result = subject.("")
      expect(result).to be_failure
    end
  end
end
