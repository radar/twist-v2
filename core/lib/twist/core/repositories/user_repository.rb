class UserRepository < Hanami::Repository
  def by_pk(id)
    users.by_pk(id).one
  end

  def by_ids(ids)
    users.where(id: ids).to_a
  end

  def find_by_email(email)
    users.where(email: email).one
  end
end
