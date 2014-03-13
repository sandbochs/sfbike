class BicycleParkingSerializer < ActiveModel::Serializer
  self.root = false
  attributes :location, :address, :latitude, :longitude, :distance
end
