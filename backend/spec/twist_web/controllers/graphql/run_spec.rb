require "spec_helper"


describe Twist::Web::Controllers::Graphql::Run do
  include Dry::Monads[:result]

  subject do
    described_class.new(
      find_current_user: find_current_user
    )
  end

  context "when user is not authenticated" do
    let(:find_current_user) do
      ->(token) { Failure("no token specified") }
    end

    context "with no query" do
      it "returns no data" do
        status, _, body = subject.({})
        expect(status).to eq(200)
        no_query_string_present = JSON.parse("{\"errors\":[{\"message\":\"No query string was present\"}]}")
        expect(JSON.parse(body.first)).to eq(no_query_string_present)
      end
    end

    context "with a query" do
      it "returns no data" do
        status, _, body = subject.({ query: " query { books { title } }"})
        expect(status).to eq(200)
        expect(JSON.parse(body.first)).to eq({ "data" => { "books" => [] }})
      end
    end
  end
end
