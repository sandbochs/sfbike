class QuerySerializer < ActiveModel::Serializer
  attributes :latitude, :longitude, :address, :city, :state_code, :postal_code
end
