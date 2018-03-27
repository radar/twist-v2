require_relative '../../../spec_helper'

describe Web::Controllers::SignIn::New do
  let(:action) { Web::Controllers::SignIn::New.new }
  let(:params) { Hash[] }

  it 'is successful' do
    status, = action.(params)
    expect(status).to eq(200)
  end
end
