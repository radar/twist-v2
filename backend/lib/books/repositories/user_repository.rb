class UserRepository < Hanami::Repository
  def by_pk(id)
    users.by_pk(id).one
  end

  def find_by_email(email)
    users.where(email: email).one
  end

  def regenerate_token(id)
    new_token = SecureRandom.hex(32)
    update(id, {auth_token: new_token})
    new_token
  end
end
