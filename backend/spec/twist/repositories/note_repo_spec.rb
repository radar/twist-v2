require_relative '../../spec_helper'

module Twist
  module Repositories
    describe NoteRepo do
      context "update_text" do
        it "updates a note's text" do
          subject.update_text(1, text: "abc123")
        end
      end
    end
  end
end
