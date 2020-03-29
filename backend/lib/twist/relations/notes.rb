module Twist
  module Relations
    class Notes < ROM::Relation[:sql]
      schema(:notes, infer: true)

      def counts_for_elements(element_ids, state)
        where(element_id: element_ids)
        .where(state: state)
        .select { [element_id, function(:count, :id).as(:count)] }
        .group(:element_id)
        .order(nil)
        .to_a
      end
    end
  end
end
