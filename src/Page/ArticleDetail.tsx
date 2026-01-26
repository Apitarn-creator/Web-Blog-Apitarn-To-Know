import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import { fetchArticleById, type Article } from '../services/articleService';

function ArticleDetail() {
  const { id } = useParams();
  const numericId = useMemo(() => Number(id), [id]);

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      if (!Number.isFinite(numericId)) {
        setError('ไม่พบบทความที่ต้องการ');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchArticleById(numericId);
        if (active) {
          setArticle(data ?? null);
          setError(data ? null : 'ไม่พบบทความที่ต้องการ');
        }
      } catch (err) {
        if (active) {
          setError('เกิดข้อผิดพลาดในการโหลดบทความ');
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
  }, [numericId]);

  return (
    <>
      <Navbar />
      <main className="max-w-[1000px] mx-auto px-6 py-10">
        {loading && <p className="text-center text-gray-500">กำลังโหลดข้อมูลบทความ...</p>}
        {error && !loading && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && article && (
          <article>
            <img 
              src={article.image} 
              className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl shadow-lg mb-8" 
              alt={article.title} 
            />

            <div className="flex flex-col lg:flex-row gap-12">
              {/* ส่วนเนื้อหา (ฝั่งซ้าย) */}
              <div className="lg:w-2/3">
                <span className="text-emerald-500 font-bold">{article.category} • {article.date}</span>
                <h1 className="text-4xl font-bold mt-4 mb-6">{article.title}</h1>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {article.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* ส่วนผู้เขียน (ฝั่งขวา/Sidebar) */}
              <aside className="lg:w-1/3">
                <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">👤</div>
                    <div>
                      <p className="text-xs text-gray-400">Author</p>
                      <p className="font-bold">{article.author}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    I am a pet enthusiast and freelance writer who specializes in animal behavior and care.
                  </p>
                </div>
              </aside>
            </div>
          </article>
        )}
      </main>
      <Footer />
    </>
  );
}

export default ArticleDetail;