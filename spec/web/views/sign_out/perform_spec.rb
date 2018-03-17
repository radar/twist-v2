require_relative '../../../spec_helper'

describe Web::Views::SignOut::Perform do
  let(:exposures) { Hash[format: :html] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/sign_out/perform.html.erb') }
  let(:view)      { Web::Views::SignOut::Perform.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #format' do
    view.format.must_equal exposures.fetch(:format)
  end
end
