require 'rake'
require 'hanami/rake_tasks'
require 'rspec/core/rake_task'
load 'lib/tasks/seed.rake'

require 'pry'
binding.pry

RSpec::Core::RakeTask.new(:spec) do |t|
  t.rspec_opts = "--tag ~integration"
end

RSpec::Core::RakeTask.new(:all)

task default: :spec
