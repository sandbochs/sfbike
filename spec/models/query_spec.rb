require 'spec_helper'
require 'ostruct'

describe Query do
  it 'sets constant' do
    expect(Query.const_defined?(:GEOCODER_ATTRIBUTES)).to be_true
    expect(Query::GEOCODER_ATTRIBUTES).to eq(['latitude', 'longitude', 'address', 'city', 'state', 'state_code', 'postal_code', 'country', 'country_code'])
  end

  describe '.from_address' do
    before do
      Geocoder.should_receive(:search).once.and_return([OpenStruct.new({latitude: 1.0, longitude: 2.0, address: 3, city: 4, state_code: 5, postal_code: 6, country: 7, country_code: 8})])
      @query = Query.from_address('foo')
    end

    it 'sets the values' do
      expect(@query['latitude']).to eq(1.0)
      expect(@query['longitude']).to eq(2.0)
      expect(@query['address']).to equal(3)
      expect(@query['city']).to equal(4)
      expect(@query['state_code']).to equal(5)
      expect(@query['postal_code']).to equal(6)
      expect(@query['country']).to equal(7)
      expect(@query['country_code']).to equal(8)
    end
  end

  describe '.from_coords' do
    before do
      Geocoder.should_receive(:search).once.with('foo, bar').and_return([OpenStruct.new({latitude: 1.0, longitude: 2.0, address: 3, city: 4, state_code: 5, postal_code: 6, country: 7, country_code: 8})])
      @query = Query.from_coords('foo', 'bar')
    end

    it 'sets the values' do
      expect(@query['latitude']).to eq(1.0)
      expect(@query['longitude']).to eq(2.0)
      expect(@query['address']).to equal(3)
      expect(@query['city']).to equal(4)
      expect(@query['state_code']).to equal(5)
      expect(@query['postal_code']).to equal(6)
      expect(@query['country']).to equal(7)
      expect(@query['country_code']).to equal(8)
    end
  end

  describe '#nearby_parking' do
    context'when latitude is missing' do
      before do
        @query = Query.new
        @query.longitude = '1'
        @query.save!
      end

      it 'should raise error' do
        expect { @query.nearby_parking }.to raise_error('Missing latitude and/or longitude')
      end
    end

    context 'when longitude is missing' do
      before do
        @query = Query.new
        @query.latitude = '1'
        @query.save!
      end

      it 'should raise error' do
        expect { @query.nearby_parking }.to raise_error('Missing latitude and/or longitude')
      end
    end

    context 'when both latitude and longitude are present' do
      before do
        @query = Query.new
        @query.longitude = '1'
        @query.latitude = '1'
        @query.save!
        @result = 15
        BicycleParking.should_receive(:search).once.with(@query.latitude, @query.longitude, 5) { @result }
        @result = @query.nearby_parking
      end

      it 'returns the correct result' do
        expect(@result).to eq(@result)
      end
    end
  end
end
