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

  // Sync ค่าค้นหาจากภายนอก
  useEffect(() => setLocalSearch(searchTerm), [searchTerm]);

  // ฟังก์ชันดักจับการพิมพ์เพื่อหาคำใกล้เคียง
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearch(value);

    if (value.length > 0) {
      // ค้นหาหมวดหมู่ที่ตรงกับคำที่พิมพ์
      const matches = categories.filter(cat =>
        cat.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  // ปิดหน้าต่างคำแนะนำเมื่อคลิกข้างนอก
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allCategories = ['Highlight', ...categories];

  return (
    <section className="filter-container py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* ส่วนปุ่มหมวดหมู่ (Categories) */}
        <div className="flex gap-3 flex-wrap justify-center">
          {allCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-6 py-2 rounded-full transition-all duration-200 border-2 font-bold cursor-pointer
                ${
                  activeCategory === cat 
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-500 hover:text-emerald-500'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- ส่วนช่องค้นหาพร้อมระบบคำแนะนำ (Suggestions) --- */}
        <div className="relative w-full md:w-80" ref={dropdownRef}>
          <div className="relative">
            <input
              type="search"
              placeholder="ลองค้นหาหมวดหมู่..."
              value={localSearch}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  onSearchChange(localSearch);
                  setSuggestions([]);
                }
              }}
              className="w-full border-2 border-gray-200 rounded-full px-6 py-3 pl-12 outline-none focus:border-emerald-500 transition-all text-black shadow-sm"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>

          {/* ป๊อปอัพรายการที่ใกล้เคียง */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-100 rounded-2xl mt-2 shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2">
              <div className="p-2 bg-gray-50 text-[10px] uppercase tracking-widest font-bold text-gray-400 px-4">
                แนะนำหมวดหมู่
              </div>
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSearchChange(item); // ค้นหาทันทีเมื่อคลิก
                    setLocalSearch(item);
                    setSuggestions([]);
                  }}
                  className="px-6 py-3 hover:bg-emerald-50 cursor-pointer text-left text-sm text-gray-700 flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">เลือก →</span>
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