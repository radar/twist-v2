require_relative '../../../spec_helper'

describe Web::Controllers::Books::New do
  let(:params) { {} }
  include_examples "requires authentication"

  context 'when signed in', uses_authentication: true do
    let(:user) { double }
    before { fake_sign_in(user) }

    it 'is successful' do
      response = subject.call(params)
      expect(response[0]).to eq(200)
    end
  end
end
