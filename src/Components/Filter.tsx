import { useState, useEffect } from 'react';

type FilterProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function Filter({ categories, activeCategory, onCategoryChange, searchTerm, onSearchChange }: FilterProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);

  // sync searchTerm จากภายนอก (เผื่อถูก reset)
  useEffect(() => setLocalSearch(searchTerm), [searchTerm]);

  return (
    <section className="filter-container">
      <h2 className="text-[1.8rem] mb-6">Latest articles</h2>

      <div className="flex justify-between bg-[#eee] p-3 rounded-[15px] mb-12 items-center">
      <div className="flex gap-3 flex-wrap">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-200 border-2 font-medium cursor-pointer
                ${
                  activeCategory === cat 
                    ? 'bg-black text-white border-black shadow-md' // สไตล์เมื่อถูกเลือก (Active)
                    : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black' // สไตล์ปกติ
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
          className="border-2 border-gray-200 rounded-full px-6 py-2 outline-none focus:border-black transition-colors w-64"
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