class BicycleParking < ActiveRecord::Base
  scope :completed, -> { where status: 'COMPLETE' }
end
