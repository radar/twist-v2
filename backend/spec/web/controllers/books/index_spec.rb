require_relative '../../../spec_helper'

describe Web::Controllers::Books::Index do
  let(:params) { Hash[] }
  include_examples "requires authentication"

  context 'when signed in', uses_authentication: true do
    let(:user) { double }
    before { fake_sign_in(user) }

    it 'is successful' do
      status, = subject.(params)
      expect(status).to eq(200)
    end
  end
end
