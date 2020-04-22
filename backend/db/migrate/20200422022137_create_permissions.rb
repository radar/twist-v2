# frozen_string_literal: true

ROM::SQL.migration do
  change do
    create_table(:permissions) do
      foreign_key :user_id, :users
      foreign_key :book_id, :books
    end
  end
end
