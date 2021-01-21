# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :permissions do
      add_column :author, TrueClass, default: false
    end
  end
end
