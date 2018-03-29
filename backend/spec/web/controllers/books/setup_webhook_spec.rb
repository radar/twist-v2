require_relative '../../../spec_helper'

describe Web::Controllers::Books::SetupWebhook do
  let(:params) { Hash[] }
  include_examples "requires authentication"

  context 'when signed in', uses_authentication: true do
    let(:user) { double }
    before { fake_sign_in(user) }

    before do
      allow(subject).to receive(:find_book) { double }
    end

    it 'is successful' do
      response = subject.(params)
      expect(response[0]).to eq(200)
    end
  end
end
