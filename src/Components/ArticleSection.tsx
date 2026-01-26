import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Filter from './Filter';
import { fetchArticles, type Article } from '../services/articleService';

function ArticleSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState<'All' | string>('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await fetchArticles();
        if (active) {
          setArticles(data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError('ไม่สามารถดึงข้อมูลบทความได้ กรุณาลองใหม่อีกครั้ง');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category))),
    [articles]
  );

  const filteredArticles = useMemo(() => {
    const term = search.trim().toLowerCase();
    return articles.filter((a) => {
      const matchCat = category === 'All' ? true : a.category === category;
      const matchSearch = term === '' ? true : a.title.toLowerCase().includes(term);
      return matchCat && matchSearch;
    });
  }, [articles, category, search]);

  return (
    
    <div className="mt-10">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-[1.8rem]">Latest articles</h2>
      {/* ส่วน Filter & Search */}
      <Filter
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        searchTerm={search}
        onSearchChange={setSearch}
      />

{/* Article Grid: 1 column on mobile, 2 columns on desktop */}

<section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-10">
  
        {filteredArticles.map((item) => (
          <Link to={`/article/${item.id}`} key={item.id} className="group no-underline block">
            <article className="flex flex-col h-full bg-white md:bg-transparent rounded-[32px] md:rounded-none overflow-hidden transition-all duration-300">
              
              {/* Image Section - ปรับขนาดตามรูปแรก (Desktop) */}
              <div className="relative overflow-hidden rounded-[24px] mb-6">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-[280px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" 
                />
              </div>

              {/* Content Section - ปรับระยะห่างและสีตามรูป */}
              <div className="flex flex-col flex-grow px-4 md:px-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[#E8F8F5] text-[#1ABC9C] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
                  {item.summary}
                </p>
                
                {/* Footer Section: Author & Date */}
                <div className="mt-auto flex justify-between items-center pt-5 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs overflow-hidden">
                      <span className="text-gray-500 font-bold">P</span>
                    </div>
                    <span className="font-semibold text-gray-700 text-sm md:text-base">{item.author}</span>
                  </div>
                  <span className="text-gray-400 text-sm font-medium">{item.date}</span>
                </div>
              </div>

            </article>
          </Link>
        ))}
      </section>

      {/* Button View More - ปรับให้เหมือนปุ่มในรูป (Pill Shape) */}
           <div className="text-center mt-16 mb-10">
            <button className="px-10 py-3 rounded-full bg-black text-white border-2 border-black font-bold hover:bg-gray-800 transition-all duration-300 shadow-lg">
            View more articles
           </button>
        </div>
    </div>
  );
}

export default ArticleSection;