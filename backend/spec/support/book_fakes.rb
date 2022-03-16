module BookFakes
  def exploding_rails
    Twist::Entities::Book.new(
      id: 1,
      title: "Exploding Rails",
      permalink: "exploding-rails",
      github_user: "radar",
      github_repo: "exploding_rails"
    )
  end
end
