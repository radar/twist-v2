module Anonymous
  class Container
    extend Dry::Container::Mixin
  end

  Import = Dry::AutoInject(Container)

  Container.register(:user_repo, -> { UserRepository.new })
end
