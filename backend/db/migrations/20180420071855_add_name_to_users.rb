Hanami::Model.migration do
  change do
    alter_table :users do
      add_column :name, String
    end
  end
end
