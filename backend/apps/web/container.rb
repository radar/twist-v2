module Web
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
end
