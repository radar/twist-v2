require 'spec_helper'

describe Web::Controllers::Books::Branches::Show do
  let(:params) { Hash[] }

  include_examples "requires authentication"

  context 'when signed in', uses_authentication: true do
    let(:user) { double }
    before { fake_sign_in(user) }

    let(:book) { Book.new }
    let(:branch) { Branch.new }
    let(:commit) { Commit.new }
    let(:chapter) { double(Chapter) }

    before do
      allow(subject).to receive(:find_book) { book }
      allow(subject).to receive(:find_branch) { branch }
      allow(subject).to receive(:latest_commit) { commit }
    end

    it 'is successful' do
      status, = subject.(params)
      expect(status).to eq(200)
    end
  end
end
