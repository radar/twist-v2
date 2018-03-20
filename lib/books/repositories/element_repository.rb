class ElementRepository < Hanami::Repository
  def by_chapter(chapter_id)
    elements.where(chapter_id: chapter_id)
  end
end
