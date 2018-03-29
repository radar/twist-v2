require 'spec_helper'

describe Web::Views::Books::Branches::Show do
  let(:exposures) { Hash[format: :html] }
  let(:template)  { Hanami::View::Template.new('apps/web/templates/books/branches/show.html.erb') }
  let(:view)      { Web::Views::Books::Branches::Show.new(template, exposures) }
  let(:rendered)  { view.render }

  it 'exposes #format' do
    expect(view.format).to eq(exposures.fetch(:format))
  end
end
