import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import { blogPosts } from '../data/blogPosts';
import type { Article } from '../services/articleService';

function ArticleSection() {
  const [category, setCategory] = useState<'All' | string>('All');
  const [search, setSearch] = useState('');

  // ดึงหมวดหมู่ทั้งหมดจากข้อมูล
  const categories = useMemo(
    () => Array.from(new Set(blogPosts.map((a: Article) => a.category))) as string[],
    []
  );

  // กรองข้อมูลตามหมวดหมู่และคำค้นหา
  const filteredArticles = useMemo(() => {
    return blogPosts.filter((a: Article) => {
      const matchCat = category === 'All' ? true : a.category === category;
      const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  return (
    <div className="mt-10">
      {/* หัวข้อหลัก แสดงที่นี่ที่เดียว */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-8">Latest articles</h2>

      <Filter
        categories={categories}
        activeCategory={category}
        onCategoryChange={setCategory}
        searchTerm={search}
        onSearchChange={setSearch}
      />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-10">
        {filteredArticles.map((item: Article) => (
          <Link to={`/article/${item.id}`} key={item.id} className="group no-underline block">
            <article className="flex flex-col h-full bg-white md:bg-transparent rounded-[32px] md:rounded-none overflow-hidden transition-all">
              <div className="relative overflow-hidden rounded-[24px] mb-6 shadow-sm">
                <img src={item.image} alt={item.title} className="w-full h-[280px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="flex flex-col grow px-5 md:px-0">
                <div className="mb-3">
                  {/* แก้ไขสี: พื้นเข้ม (Emerald) ตัวหนังสือขาว เพื่อให้มองเห็นชัดเจน */}
                  <span className="bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>

                {/* เปลี่ยนเป็น description ตามข้อมูลใหม่ */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed line-clamp-2 mb-6">
                  {item.description}
                </p>
                
                <div className="mt-auto flex justify-between items-center pt-5 border-t border-gray-100 mb-6 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-[10px] font-bold">AP</div>
                    <span className="font-semibold text-gray-700 text-sm">{item.author}</span>
                  </div>
                  {/* แสดง Likes และวันที่ */}
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-rose-500 font-bold">❤️ {item.likes}</span>
                    <span className="text-gray-400">{item.date}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default ArticleSection;