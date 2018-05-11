module Web
  class Container
    extend Dry::Container::Mixin
  end

  Import = Dry::AutoInject(Container)

  Container.register(:book_repo, -> { BookRepository.new })
  Container.register(:user_repo, -> { UserRepository.new })
end
