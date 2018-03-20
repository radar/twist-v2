module Web::Controllers::Books
  class New
    include Web::Action

    before :require_authentication!

    def call(params); end
  end
end
