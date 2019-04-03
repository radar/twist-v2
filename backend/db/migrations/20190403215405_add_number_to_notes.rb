Hanami::Model.migration do
  change do
    add_column :notes, :number, Integer
  end
end
