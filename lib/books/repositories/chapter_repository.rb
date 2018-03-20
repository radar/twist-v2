class ChapterRepository < Hanami::Repository
  def for_branch(branch_id)
    chapters.where(branch_id: branch_id)
  end
end
