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

      xit 'calls itself recursively' do
        BicycleParking.search_within 0, 0, @min_results, @results
        expect(BicycleParking).to receive(:near).twice
       end

    end

    context 'with than the maximum number of results' do

    end
  end

  describe '.search' do
    context 'with less than the maximum number of results' do
      xit 'returns the correct value'
    end

    context 'with more than the maximum number of results' do
      xit 'returns the correct value'
    end
  end
end
