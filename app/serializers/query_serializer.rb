class QuerySerializer < ActiveModel::Serializer
  self.root = false
  attributes :latitude, :longitude, :address, :city, :state_code, :postal_code, :nearby_parking

  def nearby_parking
    ActiveModel::ArraySerializer.new object.nearby_parking, each_serializer: BicycleParkingSerializer
  end
end
