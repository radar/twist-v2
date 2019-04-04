module Web::Controllers::Home
  class Index
    include Web::Action

    def call(params)
      self.status = 200
      self.body = "OK"
    end
  end
end
