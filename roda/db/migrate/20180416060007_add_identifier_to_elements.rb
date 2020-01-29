ROM::SQL.migration do
  change do
    alter_table :elements do
      add_column :identifier, String
    end
  end
end
