# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :chapters do
      add_column :superseded, :boolean, default: false
    end
  end
end
