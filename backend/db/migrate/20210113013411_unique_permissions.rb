# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :permissions do
      add_unique_constraint([:book_id, :user_id])
    end
  end
end
