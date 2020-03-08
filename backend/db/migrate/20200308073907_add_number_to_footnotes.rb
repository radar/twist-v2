# frozen_string_literal: true

ROM::SQL.migration do
  change do
    alter_table :footnotes do
      add_column :number, :integer
    end
  end
end
