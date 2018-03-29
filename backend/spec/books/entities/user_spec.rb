require 'spec_helper'

RSpec.describe User do
  context "correct_password?" do
    let(:encrypted_password) { BCrypt::Password.create("password") }
    subject(:user) { User.new(encrypted_password: encrypted_password) }

    it "is correct when the attempt matches" do
      expect(user.correct_password?("password")).to eq(true)
    end

    it "is not correct when the attempt does not match" do
      expect(user.correct_password?("drowssap")).to eq(false)
    end
  end
end
