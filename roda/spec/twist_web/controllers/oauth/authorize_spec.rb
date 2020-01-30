require "spec_helper"

describe Twist::Web::Controllers::Oauth::Authorize do
  let(:params) do
    {
      redirect_uri: "http://localhost:3000/oauth/callback",
    }
  end

  let(:authorize_url) { "http://fake.example.com/oauth/authorize" }
  let(:auth_code) { double(OAuth2::Strategy::AuthCode, authorize_url: authorize_url) }
  let(:client) { double(OAuth2::Client, auth_code: auth_code) }

  before do
    allow(subject).to receive(:client) { client }
  end

  it "returns an authorization URL for GitHub" do
    status, _, body = subject.(params)
    expect(status).to eq(200)
    expect(JSON.parse(body.first)).to eq({
      "github_authorize_url" => authorize_url,
    })
  end
end
