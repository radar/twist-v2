Hanami::Model.migration do
  change do
    alter_table :elements do
      add_column :image_id, Integer
    end
  end
end
