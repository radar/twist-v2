module Controllers
  module CurrentUser
    def find_current_user(token)
      return unless token

      token = token.split.last
      return unless token

      payload, _headers = JWT.decode token, ENV.fetch('AUTH_TOKEN_SECRET'), true, algorithm: 'HS256'
      user_repo = UserRepository.new
      user_repo.find_by_email(payload["email"])
    end
  end
end
