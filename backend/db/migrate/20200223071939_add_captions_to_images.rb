# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :images do
      add_column :caption, String
    end
  end
end
