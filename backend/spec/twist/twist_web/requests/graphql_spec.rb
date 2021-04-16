require 'requests_helper'

describe "/graphql", type: :request do
  context "when signed in" do
    before do
      create_user = Twist::Transactions::Users::Create.new
      user = create_user.(
        email: "me@ryanbigg.com",
        name: "Ryan Bigg",
        password: "password",
      ).success

      generate_jwt = Twist::Transactions::Users::GenerateJwt.new
      token = generate_jwt.(email: user.email).success

      header 'Authorization', token
    end

    it "returns an error if no query" do
      post "/graphql"
      expect(json_body).to eq({"errors" => [{"message" => "No query string was present"}]})
    end
  end

  it "returns an error if no query" do
    options "/graphql"
    expect(response.status).to eq(200)
  end
end
