class CreateQueries < ActiveRecord::Migration
  def change
    create_table :queries do |t|
      t.float   :latitude
      t.float   :longitude
      t.string  :address
      t.string  :city
      t.string  :state
      t.string  :state_code
      t.string  :postal_code
      t.string  :country
      t.string  :country_code

      t.timestamps
    end

    add_index :queries, [:latitude, :longitude, :updated_at]
  end
end
