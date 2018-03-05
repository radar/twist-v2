require_relative '../../../spec_helper'

describe Web::Views::SignIn::Create do
  let(:exposures) { Hash[format: :html] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/sign_in/create.html.erb') }
  let(:view)      { Web::Views::SignIn::Create.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #format' do
    view.format.must_equal exposures.fetch(:format)
  end
end
