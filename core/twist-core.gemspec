
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "twist/core/version"

Gem::Specification.new do |spec|
  spec.name          = "twist-core"
  spec.version       = Twist::Core::VERSION
  spec.authors       = ["Ryan Bigg"]
  spec.email         = ["me@ryanbigg.com"]

  spec.summary       = "Twist core models and repositories"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files         = Dir.chdir(File.expand_path('..', __FILE__)) do
    `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]


  spec.add_dependency 'hanami-model',  '~> 1.2'
  spec.add_dependency 'pg', '~> 1.1'
  spec.add_dependency 'babosa', '~> 1.0'
  spec.add_dependency 'bcrypt', '~> 3.1'
  spec.add_dependency 'dry-auto_inject', '~> 0.4.6'
  spec.add_dependency 'dry-transaction', '~> 0.13.0'
  spec.add_dependency 'rugged', '~> 0.27.0'
  spec.add_dependency 'redcarpet', '~> 3.4'
  spec.add_dependency 'nokogiri', '~> 1.8'
  spec.add_dependency 'pygments.rb', '~> 1.2.1'

  spec.add_development_dependency "hanami"
  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", "~> 3.0"
end
