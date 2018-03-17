require_relative '../../../spec_helper'

describe Web::Views::SignIn::Perform do
  let(:exposures) { Hash[format: :html] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/sign_in/perform.html.erb') }
  let(:view)      { Web::Views::SignIn::Perform.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #format' do
    expect(view.format).to eq(exposures.fetch(:format))
  end
end
