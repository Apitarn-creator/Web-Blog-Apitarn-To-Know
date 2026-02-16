import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { fetchArticles, type Article } from '../services/articleService';
import { Loader2 } from 'lucide-react';

function ArticleSection() {
  const [category, setCategory] = useState<'All' | string>('Highlight');
  const [search, setSearch] = useState('');
  
  const [allArticles, setAllArticles] = useState<Article[]>([]); // เก็บของทั้งหมด
  const [displayArticles, setDisplayArticles] = useState<Article[]>([]); // เก็บของที่จะโชว์
  const [loading, setLoading] = useState(true);

  // 1. โหลดข้อมูลทีเดียวจบ
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchArticles(); // เรียกแบบไม่ส่ง param
      setAllArticles(data);
      setLoading(false);
    };
    loadData();
  }, []);

  // 2. ระบบกรอง (ทำงานหน้าบ้าน)
  useEffect(() => {
    let result = allArticles;

    // กรองหมวดหมู่
    if (category !== 'All') {
      result = result.filter(article => article.category === category);
    }

    // กรองค้นหา
    if (search) {
      result = result.filter(article => 
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setDisplayArticles(result);
  }, [category, search, allArticles]);

  // สร้างปุ่มหมวดหมู่
  const categories = useMemo(() => {
    const mainCats = ['Highlight', 'Technology', 'Life Style', 'Programming'];
    const cats = Array.from(new Set(allArticles.map(a => a.category)));
    return [...mainCats, ...cats.filter(c => !mainCats.includes(c))];
  }, [allArticles]);

  return (
    <div className="mt-10 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-8">Latest articles</h2>

      <Filter
        categories={['All', ...categories]} 
        activeCategory={category}
        onCategoryChange={setCategory}
        searchTerm={search}
        onSearchChange={setSearch}
      />

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-emerald-600" size={48} />
        </div>
      ) : displayArticles.length === 0 ? (
        <div className="flex flex-col justify-center items-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg font-medium">ไม่พบบทความในหมวดนี้</p>
          <div className="text-sm text-gray-400 mt-2 mb-4">
            (ระบบโหลดมาได้ {allArticles.length} บทความ)
          </div>
          {/* ปุ่ม Debug เพื่อลองกดดูว่ามีข้อมูลไหม */}
          {allArticles.length > 0 && category === 'Highlight' && (
             <button onClick={() => setCategory('All')} className="text-blue-500 underline text-sm">
               ลองกดดูทั้งหมด (All)
             </button>
          )}
          <Link to="/create-post" className="mt-4 text-emerald-600 font-bold hover:underline">
            + สร้างบทความใหม่
          </Link>
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-10">
          {displayArticles.map((item) => (
            <Link to={`/post/${item.id}`} key={item.id}>
              <article className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="overflow-hidden h-64 relative">
                   <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image'; }} 
                   />
                   <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {item.category}
                   </div>
                </div>
                
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {item.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-5 border-t border-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                        {item.author.substring(0,2).toUpperCase()}
                      </div>
                      <span className="font-bold text-gray-700 text-xs uppercase tracking-wide">{item.author}</span>
                    </div>
                    <span className="text-gray-400 text-xs font-medium">{item.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

export default ArticleSection;