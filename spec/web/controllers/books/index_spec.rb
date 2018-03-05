require_relative '../../../spec_helper'

describe Web::Controllers::Books::Index do
  let(:action) { Web::Controllers::Books::Index.new }
  let(:params) { Hash[] }

  it 'is successful' do
    status, _, _ = action.call(params)
    expect(status).to eq(200)
  end
end
