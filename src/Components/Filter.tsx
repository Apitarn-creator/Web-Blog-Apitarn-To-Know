import { useState, useEffect, useRef } from 'react';

type FilterProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

function Filter({ categories, activeCategory, onCategoryChange, searchTerm, onSearchChange }: FilterProps) {
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setLocalSearch(searchTerm), [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);
    if (value.length > 0) {
      setSuggestions(
        categories.filter(cat => cat.toLowerCase().includes(value.toLowerCase()))
      );
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="filter-container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="flex gap-3 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-200 border-2 font-bold cursor-pointer
                ${activeCategory === cat
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:text-black'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80" ref={dropdownRef}>
          <div className="relative">
            <input
              type="search"
              placeholder="ค้นหาบทความ..."
              value={localSearch}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  onSearchChange(localSearch);
                  setSuggestions([]);
                }
              }}
              className="w-full border-2 border-gray-200 rounded-full px-6 py-3 pl-12 outline-none focus:border-gray-400 transition-all text-black shadow-sm bg-white"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-2xl mt-2 shadow-2xl z-[100] overflow-hidden">
              <div className="p-2 bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400 px-4">
                แนะนำ
              </div>
              {suggestions.map((item) => (
                <div
                  key={item}
                  onClick={() => {
                    onSearchChange(item);
                    setLocalSearch(item);
                    setSuggestions([]);
                  }}
                  className="px-6 py-3 hover:bg-gray-50 cursor-pointer text-left text-sm text-gray-700 flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">เลือก →</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default Filter;
