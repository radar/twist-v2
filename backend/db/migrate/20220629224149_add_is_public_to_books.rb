# frozen_string_literal: true

ROM::SQL.migration do
  change do
    add_column :books, :is_public, :boolean, default: false
  end
end
