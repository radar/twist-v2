require 'requests_helper'

describe "POST /graphql", type: :request do
  it "returns an error if no query" do
    post "/graphql"
    expect(json_body).to eq({"errors" => [{"message" => "No query string was present"}]})
  end
end
