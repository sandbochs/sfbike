require 'spec_helper'

describe BicycleParkingSerializer do
  before do
    @options = %w(location address latitude longitude)
    @bp = BicycleParking.new
    @bp.location = 'foo'
    @bp.address = 'bar'
    @bp.latitude = 1.0
    @bp.longitude = 2.0
    @bp.save!
  end

  describe 'attribute presence' do
    before do
      @serializer = BicycleParkingSerializer.new @bp
    end

    it 'has attributes' do
      @options.each do |o|
        expect(@serializer).to respond_to o.to_sym
      end
    end
  end
end
