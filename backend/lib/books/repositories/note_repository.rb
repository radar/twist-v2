class NoteRepository < Hanami::Repository
  def count(element_ids)
    counts = relations[:notes]
      .where(element_id: element_ids)
      .select { [element_id, int::count(id).as(:count)] }
      .group(:element_id)
      .order(nil)
      .as(NoteCount)
      .to_a

    _, missing = element_ids.partition { |id| counts.detect { |c| c.element_id == id } }
    counts += missing.map { |m| NoteCount.new(element_id: m, count: 0) }
    counts.map { |element_id:, count:| [element_id, count] }.to_h
  end
end
