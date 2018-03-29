require_relative '../../../spec_helper'

describe Web::Views::Graphql::Run do
  let(:exposures) { Hash[format: :html] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/graphql/run.html.erb') }
  let(:view)      { Web::Views::Graphql::Run.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #format' do
    view.format.must_equal exposures.fetch(:format)
  end
end
