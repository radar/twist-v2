Hanami::Model.migration do
  change do
    alter_table :books do
      add_column :blurb, String
    end
  end
end
