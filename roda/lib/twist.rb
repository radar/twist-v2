$:.unshift(File.expand_path(__dir__))

require 'twist/git'
require 'twist/markdown_chapter_processor'
require 'twist/markdown_book_worker'

rom_parts = %i(entities repositories)

rom_parts.each do |part|
  glob = File.expand_path(__dir__) + "/twist/#{part}/**/*.rb"
  Dir[glob].each do |f|
    require f
  end
end

require 'dry/container'
require 'dry/auto_inject'
require 'dry-transaction'

module Twist
  class Container
    extend Dry::Container::Mixin
  end

  Import = Dry::AutoInject(Container)

  Container.register(:book_repo, -> { BookRepository.new })
  Container.register(:user_repo, -> { UserRepository.new })

end


dry_parts = %i(transactions)

dry_parts.each do |part|
  glob = File.expand_path(__dir__) + "/twist/#{part}/**/*.rb"
  Dir[glob].each do |f|
    require f
  end
end
