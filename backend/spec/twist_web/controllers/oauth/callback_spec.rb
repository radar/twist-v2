require "spec_helper"

module Twist
  describe Web::Controllers::Oauth::Callback do
    include Dry::Monads[:result]

    let(:params) do
      {
        code: "abc123",
        "rack.session" => session,
      }
    end

    let(:authorize_url) { "http://fake.example.com/oauth/authorize" }
    let(:auth_code) { double(OAuth2::Strategy::AuthCode) }
    let(:client) { double(OAuth2::Client, auth_code: auth_code) }
    let(:github_info) { -> (_token) { { name: "Ryan Bigg", login: "radar", email: "primary@example.com" } } }
    let(:create_user) { double(Transactions::Users::Create) }
    let(:find_by_github_login) { double(Transactions::Users::FindByGithubLogin) }
    let(:session) do
      {
        state: "state-abc123"
      }
    end

    subject do
      described_class.new(
        oauth_client: client,
        github_info: github_info,
        find_by_github_login: find_by_github_login,
        create_user: create_user,
      )
    end

    context "when fetching the token is successful" do
      before do
        expect(auth_code).to receive(:get_token).with(
          "abc123",
          redirect_uri: ENV.fetch("FRONTEND_APP_URL") + "/oauth/callback",
          state: "state-abc123"
        ).and_return(double("Token", token: "token-123abc", params: {}))
      end

      context "when a user is already known" do
        let(:user) { double(Entities::User, email: "me@ryanbigg.com") }

        before do
          allow(find_by_github_login).to receive(:call) { user }
        end

        it "re-uses that user" do
          expect(create_user).to_not receive(:call)
          subject.(params)
        end
      end

      context "when the user is not known" do
        let(:user) { double(Entities::User, email: "me@ryanbigg.com") }

        before do
          allow(find_by_github_login).to receive(:call) { nil }
        end

        it "creates that user" do
          expect(create_user).to receive(:call).with(hash_including(
            email: "primary@example.com",
            name: "Ryan Bigg",
            github_login: "radar",
          )) { Success(user) }
          subject.(params)
        end

        it "returns a JWT for the client" do
          allow(create_user).to receive(:call) { Success(user) }
          status, _, body = subject.(params)
          expect(status).to eq(200)
          jwt_token = body.first["jwt_token"]
          expect(jwt_token).not_to be_nil
        end
      end
    end

    context "when fetching the token fails" do
      before do
        error_params = {
          "error" => "bad_verification_code",
          "error_description"=>"The code passed is incorrect or expired."
        }
        expect(auth_code).to receive(:get_token) do
          double(OAuth2::AccessToken, params: error_params)
        end
      end

      it "handles failures from re-using the oauth code" do
        status, _, body = subject.(params)
        error = JSON.parse(body.first)
        expect(error["error"]).to eq("bad_verification_code")
        expect(error["error_description"]).to eq("The code passed is incorrect or expired.")
      end
    end
  end
end
