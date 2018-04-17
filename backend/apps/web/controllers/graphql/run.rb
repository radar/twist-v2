module Web::Controllers::Graphql
  class Run
    include Web::Action

    before :set_cors_headers

    # rubocop:disable Metrics/AbcSize
    def call(params)
      variables = params[:variables] || {}
      find_current_user(params.env["HTTP_AUTHORIZATION"])
      user_loader = Dataloader.new { |ids| UserRepository.new.by_ids(ids).to_a }
      note_count_loader = Dataloader.new { |element_ids| NoteRepository.new.count(element_ids) }
      image_loader = Dataloader.new { |ids| ImageRepository.new.by_ids(ids).to_a }
      result = Books::GraphQL::Schema.execute(
        params[:query],
        # Stringify the variable keys here, as that's what GraphQL-Ruby expects them to be
        # Time spent discovering this: ~ 1 hour.
        variables: Hanami::Utils::Hash.stringify(variables),
        context: {
          user_loader: user_loader,
          note_count_loader: note_count_loader,
          image_loader: image_loader,
          current_user: find_current_user(params.env["HTTP_AUTHORIZATION"]),
        },
      )

      self.format = :json
      self.body = result.to_json
    end
    # rubocop:enable Metrics/AbcSize

    private

    def set_cors_headers
      headers["Access-Control-Allow-Origin"] = '*'
      headers["Access-Control-Allow-Headers"] = 'Content-Type, Authorization'
      headers["Access-Control-Request-Method"] = '*'
    end

    def verify_csrf_token?
      false
    end

    def find_current_user(token)
      return unless token
      user_repo = UserRepository.new
      user_repo.find_by_auth_token(token.split.last)
    end
  end
end
