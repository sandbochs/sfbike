require 'spec_helper'

describe QuerySerializer do
  before do
    @options = %w(latitude longitude address city state_code postal_code)
    @q = Query.new
    @q.city = 'foo'
    @q.address = 'bar'
    @q.latitude = 1.0
    @q.longitude = 2.0
    @q.state_code = 'CA'
    @q.postal_code = 94109
    @q.save!
  end

  describe 'attribute presence' do
    before do
      @serializer = QuerySerializer.new @q
    end

    it 'has attributes' do @options.each do |o|
        expect(@serializer).to respond_to o.to_sym
      end
    end
  end
end
