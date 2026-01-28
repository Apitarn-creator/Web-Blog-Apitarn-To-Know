import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import { fetchArticleById, type Article } from '../services/articleService';

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ดึงข้อมูลบทความจาก API
  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      try {
        const data = await fetchArticleById(Number(id));
        if (data) {
          setArticle(data);
        } else {
          setError('ไม่พบบทความ');
        }
      } catch (err) {
        setError('ไม่สามารถโหลดข้อมูลบทความได้');
        console.error('Error loading article:', err);
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">{error || 'ไม่พบบทความ'}</h2>
          <Link to="/" className="text-emerald-600 font-bold">กลับหน้าหลัก</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="text-gray-400 hover:text-black mb-8 inline-block">&larr; Back to articles</Link>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-emerald-600 text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase shadow-sm">
                {article.category}
              </span>
              <span className="text-gray-400 text-sm">{article.date}</span>
              <span className="text-rose-500 font-bold text-sm">❤️ {article.likes} Likes</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 leading-tight">
              {article.title}
            </h1>

            <img src={article.image} className="w-full rounded-[32px] mb-10 shadow-xl" alt={article.title} />

            {/* แสดงเนื้อหาแบบ String และรักษาการเว้นบรรทัด (\n) */}
            <div className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          </div>

          <aside className="lg:w-1/3">
            <div className="sticky top-28 bg-gray-50 p-8 rounded-[32px] border border-gray-100">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-6">Author</p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {article.author.charAt(0)}
                </div>
                <p className="text-xl font-bold text-gray-900">{article.author}</p>
              </div>
              <p className="text-gray-500 mb-8">Digital Creator & Writer</p>
              <button className="w-full bg-black text-white py-3 rounded-full font-bold hover:bg-gray-800 transition-all">
                Follow
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleDetail;