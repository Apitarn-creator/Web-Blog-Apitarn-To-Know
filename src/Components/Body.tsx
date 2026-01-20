import { useMemo, useState } from 'react';
import Filter from './Filter';
import { Link } from 'react-router-dom';

type Article = {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  image: string;
};

function Body() {
  const articles: Article[] = [
    { id: 1, title: 'Understanding Cat Behavior...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024', image: "/bg-battle.png"},
    { id: 2, title: 'The Fascinating World of Cats...', category: 'Dog', author: 'Thompson P.', date: '11 September 2024', image: "/project-w-1.jpg" },
    { id: 3, title: 'Finding Motivation...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024', image: "/project-w-1.jpg" },
    { id: 4, title: 'The Science of the Cat\'s Purr...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024', image: "/bg-battle.png"},
    { id: 5, title: 'Unlocking Creativity...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024', image: "/project-w-1.jpg"},
    { id: 6, title: 'Top 10 Health Tips...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024', image: "/bg-battle.png"},
  ];

  const [category, setCategory] = useState<'All' | string>('All');
  const [search, setSearch] = useState('');

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
    <main className="bg-[#f9f9f9] px-[5%] py-4 font-sans">
      {/* --- ส่วนที่ 1: Hero Section --- */}
      <section className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 p-6 lg:p-12 mb-8 bg-white rounded-xl">
        <div className="hero-left text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-black">
          Digital Creator  <br/>Explore Ideas<br/> Approachable
          </h1>
          <p className="text-gray-600 text-lg mt-4">"As a Digital Creator<br/> I am dedicated to Exploring Ideas beyond<br/> limits and Sharing Stories that spark inspiration<br/> connecting creativity with the heart of every experience."</p>
        </div>
        
        <div className="hero-center order-1 lg:order-2">
          {/* ปรับขนาดรูป Hero ให้ยืดหยุ่นตามหน้าจอ */}
          <img src="1765001739069.jpg" alt="Apitarn" className="w-full max-w-[550px] aspect-4/5 object-cover rounded-[20px] shadow-sm" />
        </div>

        <div className="hero-right text-center lg:text-left order-3">
          <span className="text-gray-400 text-xl">- Author</span>
          <h3 className="text-black text-2xl lg:text-4xl font-bold">Apitarn P.</h3>
        </div>
      </section>

      {/* --- ส่วนที่ 2: Filter & Search Bar (ในคอมโพเนนต์ Filter ควรมีสไตล์ที่รองรับ mobile) --- */}
      <div className="mb-10">
        <Filter
          categories={categories}
          activeCategory={category}
          onCategoryChange={setCategory}
          searchTerm={search}
          onSearchChange={setSearch}
        />
      </div>

      {/* --- ส่วนที่ 3: Article Grid (จุดที่แก้ไขหลัก) --- */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredArticles.map((item) => (
          // 2. ใช้ Link ครอบ article และระบุ path ตาม id
          <Link to={`/article/${item.id}`} key={item.id} className="no-underline text-inherit block">
            <article className="bg-white p-4 lg:p-0 lg:bg-transparent rounded-[24px] cursor-pointer hover:opacity-90 transition-opacity">
              <div className="card-image mb-4">
                <img src={item.image} alt={item.title} className="w-full h-[250px] md:h-[350px] lg:h-[420px] object-cover rounded-[20px]" />
              </div>
              <div className="card-content px-2">
                <span className="inline-block bg-[#E8F8F5] text-[#1ABC9C] px-4 py-1 rounded-full text-sm font-medium">{item.category}</span>
                <h3 className="my-3 text-xl lg:text-2xl font-bold leading-snug text-gray-800">{item.title}</h3>
                {/* ... ส่วนที่เหลือของ Card ... */}
              </div>
            </article>
          </Link>
        ))}
      </section>

      <div className="text-center mt-16 mb-10">
        <a href="#" className="inline-block border-b-2 border-black pb-1 text-black font-bold hover:text-gray-600 transition-colors">
          View more
        </a>
      </div>
    </main>
  );
}

export default Body;