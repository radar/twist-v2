require 'rake'
require 'hanami/rake_tasks'
require 'rspec/core/rake_task'

RSpec::Core::RakeTask.new(:spec) do |t|
  t.rspec_opts = "--tag ~integration"
end

RSpec::Core::RakeTask.new(:all)

task default: :spec
