require 'hanami-model'
require 'dry-auto_inject'

require_relative 'core/entities'
require_relative 'core/repositories'

module Twist
  module Core
    class Container
      extend Dry::Container::Mixin
    end

    Import = Dry::AutoInject(Container)

    Container.register(:book_repo, -> { BookRepository.new })
    Container.register(:book_note_repo, -> { BookNoteRepository.new })
    Container.register(:branch_repo, -> { BranchRepository.new })
    Container.register(:chapter_repo, -> { ChapterRepository.new })
    Container.register(:commit_repo, -> { CommitRepository.new })
    Container.register(:element_repo, -> { ElementRepository.new })
    Container.register(:note_repo, -> { NoteRepository.new })
    Container.register(:user_repo, -> { UserRepository.new })

    def self.configure_model(config)
      config.model do
        adapter :sql, ENV.fetch('DATABASE_URL')

        migrations 'db/migrations'
        schema     'db/schema.sql'
      end
    end
  end
end

require_relative 'core/transactions'
require_relative 'core/git'
require_relative 'core/markdown_chapter_processor'
require_relative 'core/markdown_renderer'
require_relative 'core/markdown_element_processor'
require_relative 'core/permalinker'
