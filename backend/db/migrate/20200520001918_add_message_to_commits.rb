# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :commits do
      add_column :message, String
    end
  end
end
