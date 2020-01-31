ROM::SQL.migration do
  change do
    add_column :notes, :number, Integer
  end
end
