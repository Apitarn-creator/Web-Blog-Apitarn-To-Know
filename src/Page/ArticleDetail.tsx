import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toast, Toaster } from 'sonner';
import { Facebook, Linkedin, Twitter, Copy, X, Loader2 } from 'lucide-react'; // ใช้ Lucide เหมือนในตัวอย่าง
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import { fetchArticleById, type Article } from '../services/articleService';

function ArticleDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // ควบคุมการเปิด/ปิด Alert Dialog

  // Requirement #2: สมมติว่ายังไม่ได้เข้าสู่ระบบ
  const user = null; 
  const currentUrl = window.location.href;

  useEffect(() => {
    const loadArticle = async () => {
      if (!postId) return;
      try {
        const data = await fetchArticleById(Number(postId));
        if (data) setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [postId]);

  // ฟังก์ชันเช็ก Login (เหมือนใน ViewPost.jsx)
  const handleProtectedAction = () => {
    if (!user) {
      setIsDialogOpen(true); // เปิดหน้าต่างเตือนแทนการใช้ alert() ธรรมดา
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success('บันทึกลิงก์ไว้ที่ Clipboard แล้ว!');
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /> กำลังโหลด...</div>;
  if (!article) return <div className="h-screen flex items-center justify-center">ไม่พบบทความ</div>;

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Toaster richColors position="bottom-right" />
      <Navbar />

      {/* --- Requirement #2: Alert Dialog (สร้างเองด้วย Tailwind) --- */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full relative text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <button onClick={() => setIsDialogOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold mb-4">เข้าสู่ระบบเพื่อดำเนินการต่อ</h2>
            <p className="text-gray-500 mb-8">คุณต้องมีบัญชีผู้ใช้งานเพื่อกดไลก์หรือแสดงความคิดเห็น</p>
            <button 
              onClick={() => navigate('/signup')}
              className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all mb-4"
            >
              สร้างบัญชีใหม่
            </button>
            <p className="text-sm text-gray-500">
              มีบัญชีอยู่แล้ว? <span onClick={() => navigate('/login')} className="text-black font-bold underline cursor-pointer">ล็อกอิน</span>
            </p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* เนื้อหาหลัก */}
          <div className="lg:w-2/3">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-8 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span> กลับหน้าหลัก
            </Link>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{article.title}</h1>
            <div className="flex items-center gap-4 mb-8 text-gray-500">
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{article.category}</span>
                <span>{article.date}</span>
            </div>

            <img src={article.image} className="w-full aspect-video object-cover rounded-[32px] mb-8 shadow-lg" alt="" />
            
            <div className="text-2xl font-bold prose prose-lg max-w-none text-gray-900 leading-relaxed mb-3">
              <ReactMarkdown>{article.description}</ReactMarkdown>
            </div>

            <div className="text-xl prose prose-lg max-w-none text-gray-900 leading-relaxed">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* ส่วนคอมเมนต์ที่ต้อง Login */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-bold mb-4">แสดงความคิดเห็น</h3>
              <textarea 
                readOnly
                onClick={handleProtectedAction}
                placeholder="คลิกเพื่อแสดงความคิดเห็น..."
                className="w-full p-4 border rounded-2xl bg-gray-50 h-32 cursor-pointer focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          {/* แถบข้าง (Share & Like) */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {article.author.charAt(0)}
                </div>
                <h4 className="text-black text-xl font-bold">{article.author}</h4>
                <p className="text-gray-500 text-sm mb-6">Digital Content Creator</p>
                
                <button 
                  onClick={handleProtectedAction}
                  className="w-full py-4 bg-rose-50 text-rose-200 rounded-full font-bold hover:bg-rose-100 transition-all flex items-center justify-center gap-2"
                >
                  ❤️ Like ({article.likes})
                </button>
              </div>

              <div className="p-8 border rounded-[32px] space-y-4">
                <p className="font-bold text-gray-900">แชร์บทความนี้</p>
                <div className="flex gap-3">
                  <a href={`https://www.facebook.com/share.php?u=${currentUrl}`} target="_blank" className="p-3 border rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" className="p-3 border rounded-full hover:bg-blue-700 hover:text-white transition-all"><Linkedin size={20} /></a>
                  <a href={`https://twitter.com/share?url=${currentUrl}`} target="_blank" className="p-3 border rounded-full hover:bg-black hover:text-white transition-all"><Twitter size={20} /></a>
                  <button onClick={handleCopyLink} className="p-3 border rounded-full hover:bg-emerald-600 hover:text-white transition-all cursor-pointer"><Copy size={20} /></button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ArticleDetail;