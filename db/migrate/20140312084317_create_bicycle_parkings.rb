class CreateBicycleParkings < ActiveRecord::Migration
  def change
    create_table :bicycle_parkings do |t|
      t.string  :location
      t.string  :address
      t.integer :racks
      t.string  :status
      t.string  :status_detail
      t.string  :year_installed
      t.float   :latitude
      t.float   :longitude

      t.timestamps
    end

    add_index :bicycle_parkings, [:latitude, :longitude]
  end
end
