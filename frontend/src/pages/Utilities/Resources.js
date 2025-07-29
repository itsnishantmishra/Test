import React, { useState } from 'react';
import { ChevronDown, Filter } from 'lucide-react';

const CategoryTabsComponent = () => {
  const [activeCategory, setActiveCategory] = useState('Electronics');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [viewMode, setViewMode] = useState('categories');
  const [filterType, setFilterType] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Sample category structure
  const categoryStructure = {
    Electronics: ['Phones', 'Laptops', 'Accessories'],
    Clothing: ['Men', 'Women', 'Kids'],
    Home: ['Kitchen', 'Bedroom', 'Living Room'],
    Sports: ['Fitness', 'Outdoor', 'Team Sports'],
    Books: ['Fiction', 'Non-Fiction', 'Educational']
  };

  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100">
      {/* Desktop View */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Shop for text + Category Tabs */}
            <div className="flex items-center space-x-8">
              <h2 className="text-2xl font-bold text-gray-900 whitespace-nowrap">
                Shop for...
              </h2>
              
              <div className="flex items-center space-x-1 bg-gray-50 rounded-2xl p-1">
                {Object.keys(categoryStructure).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setActiveSubcategory(null);
                      setViewMode("categories");
                    }}
                    className={`relative px-6 py-3 text-sm font-semibold whitespace-nowrap rounded-xl transition-all duration-300 transform hover:scale-105
                      ${
                        activeCategory === cat
                          ? "bg-white text-blue-700 shadow-md ring-2 ring-blue-100"
                          : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                      }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Filter Buttons */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-gray-50 rounded-2xl p-1">
                <button
                  onClick={() => setFilterType("all")}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${
                      filterType === "all"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                    }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setFilterType("low-stock")}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${
                      filterType === "low-stock"
                        ? "bg-amber-500 text-white shadow-lg shadow-amber-500/25"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                    }`}
                >
                  Low Stock
                </button>
                <button
                  onClick={() => setFilterType("out-of-stock")}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200
                    ${
                      filterType === "out-of-stock"
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/70"
                    }`}
                >
                  Out of Stock
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Header with Shop for text */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-xl font-bold text-gray-900">Shop for...</h2>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        <div className="px-4 pb-3">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {Object.keys(categoryStructure).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setActiveSubcategory(null);
                  setViewMode("categories");
                }}
                className={`flex-shrink-0 px-5 py-2.5 text-sm font-semibold whitespace-nowrap rounded-full transition-all duration-300
                  ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
        <div className="px-4 pb-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-700">
                  {filterType === 'all' && 'All Items'}
                  {filterType === 'low-stock' && 'Low Stock Items'}
                  {filterType === 'out-of-stock' && 'Out of Stock Items'}
                </span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                <div className="py-2">
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors flex items-center space-x-3
                      ${filterType === 'all' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${filterType === 'all' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                    <span>All Items</span>
                  </button>
                  <button
                    onClick={() => {
                      setFilterType("low-stock");
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors flex items-center space-x-3
                      ${filterType === 'low-stock' ? 'bg-amber-50 text-amber-700 font-medium' : 'text-gray-700'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${filterType === 'low-stock' ? 'bg-amber-500' : 'bg-gray-300'}`}></div>
                    <span>Low Stock Items</span>
                  </button>
                  <button
                    onClick={() => {
                      setFilterType("out-of-stock");
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-red-50 transition-colors flex items-center space-x-3
                      ${filterType === 'out-of-stock' ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-700'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${filterType === 'out-of-stock' ? 'bg-red-500' : 'bg-gray-300'}`}></div>
                    <span>Out of Stock Items</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden" 
          onClick={() => setDropdownOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default CategoryTabsComponent;