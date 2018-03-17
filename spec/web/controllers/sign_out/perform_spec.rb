require_relative '../../../spec_helper'

describe Web::Controllers::SignOut::Perform do
  let(:action) { Web::Controllers::SignOut::Perform.new }
  let(:params) { Hash[] }

  it 'is successful' do
    status, headers, _ = action.call(params)
    expect(status).to eq(302)
    expect(headers["Location"]).to eq("/")
  end
end
