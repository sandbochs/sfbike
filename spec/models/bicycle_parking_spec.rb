require 'spec_helper'

describe BicycleParking do
  describe '.search_within' do
    before(:each) do
      @num_results = Random.rand 100
      @diameter = 5
      @max_diameter = 10
    end

    context 'with exactly the minimum number of results' do
      before(:each) { @results = (0...@num_results).to_a }

      it 'returns the correct value' do
        expect(BicycleParking.search_within(0, 0, @num_results, @results)).to be @results
      end

      it 'returns the correct value even if the diameter is less than the maximum' do
        expect(BicycleParking.search_within(0, 0, @num_results, @results, @diameter, @diameter, @max_diameter)).to be @results
      end
    end

    context 'with more than the minimum number of results' do
      before(:each) do
        @num_excess_results = Random.rand 100
        @results = (0...@num_results + @num_excess_results).to_a
      end

      it 'returns the correct value' do
        expect(BicycleParking.search_within(0, 0, @num_results, @results)).to be @results
      end

      it 'it returns the correct value even if the diameter is less than the maximum' do
        expect(BicycleParking.search_within(0, 0, @num_results, @results, @diameter, @diameter, @max_diameter)).to be @results
      end
    end

    context 'with less than the minimum number of results' do
      before(:each) do
        @min_results = Random.rand((@num_results + 1))
        @results = (0...@num_results).to_a
        BicycleParking.stub!(:near).and_return((0...@min_results).to_a)
      end
    end

    describe 'when recursion happens' do
      before do
        @bp = BicycleParking.new({status: 'COMPLETE'})
        BicycleParking.stub_chain(:completed, :near) {[@bp]}
        @results = [1]
        @min_length = 15
        @diameter = 0
        @max_diameter = 1

        BicycleParking.class_eval do
          class << self
            alias_method :search_within_normal, :search_within
          end
        end

        BicycleParking.should_receive(:search_within).with(0, 0, @min_length, [@bp], 0, 0, 1) { 'recursion tests are awesome' }
      end

      it 'recurses as expected' do
        expect(BicycleParking.search_within_normal(0,0,@min_length, @results, @diameter, 0, @max_diameter)).to eq('recursion tests are awesome')
      end
    end
  end

  describe '.search' do
    before do
      @lat = 0
      @long = 0
      @max_results = 5
    end

    describe 'with less than the maximum number of results' do
      before do
        BicycleParking.should_receive(:search_within).with(@lat, @long, 3, [], 0.5, 0.5, 5) {[1,2,3,4]}
      end

      it 'returns the correct value' do
        expect(BicycleParking.search(@lat, @long, @max_results)).to eq([1,2,3,4])
      end
    end

    describe 'with more than the maximum number of results' do
      before do
        BicycleParking.should_receive(:search_within).with(@lat, @long, 3, [], 0.5, 0.5, 5) {[1,2,3,4,5,6,7,8,9]}
      end

      it 'returns the correct value' do
        expect(BicycleParking.search(@lat, @long, @max_results)).to eq([1,2,3,4,5])
      end
    end
  end
end
