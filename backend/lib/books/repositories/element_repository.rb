class ElementRepository < Hanami::Repository
  associations do
    belongs_to :chapter
    has_many :notes
  end

  def by_chapter(chapter_id)
    elements.where(chapter_id: chapter_id)
  end

  def by_ids(ids)
    elements.where(id: ids)
  end

  def sections_for_chapter(chapter_id)
    by_chapter(chapter_id).where(tag: %w(h2 h3))
  end
end
