import { useState, useEffect, useRef } from 'react';

type FilterProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function Filter({ categories, activeCategory, onCategoryChange, searchTerm, onSearchChange }: FilterProps)  {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // sync searchTerm จากภายนอก (เผื่อถูก reset)
  useEffect(() => setLocalSearch(searchTerm), [searchTerm]);

  // ปิด dropdown เมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allCategories = ['All', ...categories];
  const displayCategory = activeCategory === 'All' ? 'Highlight' : activeCategory;

  return (
    <section className="filter-container">
      {/* Mobile Layout */}
      <div className="block md:hidden space-y-4 mb-8">
        {/* Search Input */}
        <div className="relative">
          <input
            type="search"
            placeholder="Search"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && onSearchChange(localSearch)}
            className="w-full bg-white rounded-lg px-4 py-3 pr-10 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <label className="block text-white text-sm mb-2">Category</label>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-white rounded-lg px-4 py-3 pr-10 border border-gray-200 text-left text-gray-400 focus:outline-none focus:border-gray-300 flex items-center justify-between"
          >
            <span className={activeCategory !== 'All' ? 'text-white' : ''}>{displayCategory}</span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden">
              {allCategories.map((cat) => {
                const displayName = cat === 'All' ? 'Highlight' : cat;
                const isSelected = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-white hover:bg-gray-50 transition-colors flex items-center gap-2 ${
                      isSelected ? 'bg-gray-50' : ''
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span>{displayName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex justify-between bg-[#eee] p-3 rounded-[15px] mb-12 items-center">
        <div className="flex gap-3 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-200 border-2 font-bold cursor-pointer
                ${
                  activeCategory === cat 
                    ? 'bg-gray-300 text-white border-gray-600 shadow-md'
                    : 'bg-gray-500 text-white border-gray-500 hover:bg-black hover:border-gray-600'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <input
            type="search"
            placeholder="ค้นหาบทความ..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && onSearchChange(localSearch)}
            className="border-2 border-gray-300 rounded-full px-6 py-2 outline-none focus:border- transition-colors w-64 text-black placeholder-gray-500"
          />
          <button
            type="button"
            onClick={() => onSearchChange(localSearch)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
            aria-label="Submit search"
          >
            🔍
          </button>
        </div>
      </div>
    </section>
  );
} 

export default Filter;