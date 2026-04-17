import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toast, Toaster } from 'sonner';
import { Facebook, Linkedin, Twitter, Copy, X, Loader2, Send, Trash2, Heart } from 'lucide-react';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import {
  fetchArticleById, type Article,
  fetchComments, createComment, deleteComment, type Comment,
  fetchLikeStatus, toggleLike,
  formatDate,
} from '../services/articleService';
import { isLoggedIn, getStoredUser } from '../utils/auth';

function ArticleDetail() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // like state
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  // comment state
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loggedIn = isLoggedIn();
  const user = getStoredUser();
  const currentUrl = window.location.href;

  useEffect(() => {
    if (!postId) return;
    const load = async () => {
      const [articleData, commentsData] = await Promise.all([
        fetchArticleById(Number(postId)),
        fetchComments(Number(postId)),
      ]);
      if (articleData) {
        setArticle(articleData);
        setLikesCount(articleData.likes);
      }
      setComments(commentsData);
      setLoading(false);

      // ถ้า login อยู่ ให้ดึงสถานะ like ของ user นี้
      if (isLoggedIn()) {
        const likeData = await fetchLikeStatus(Number(postId));
        setLikesCount(likeData.likes_count);
        setIsLiked(likeData.is_liked);
      }
    };
    load();
  }, [postId]);

  const handleProtectedAction = () => {
    if (!loggedIn) setIsDialogOpen(true);
  };

  // ✅ Toggle like จริง
  const handleLike = async () => {
    if (!loggedIn) { setIsDialogOpen(true); return; }
    if (likeLoading) return;
    setLikeLoading(true);
    try {
      const result = await toggleLike(Number(postId));
      setLikesCount(result.likes_count);
      setIsLiked(result.is_liked);
      toast.success(result.is_liked ? '❤️ Liked!' : '💔 Unliked');
    } catch {
      toast.error('ไม่สามารถกด like ได้');
    } finally {
      setLikeLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!loggedIn) { setIsDialogOpen(true); return; }
    if (!commentText.trim()) return;
    setSubmitting(true);
    try {
      const newComment = await createComment(Number(postId), commentText.trim());
      setComments(prev => [{
        ...newComment,
        name: newComment.name || user?.name || '',
        username: newComment.username || user?.username || '',
      }, ...prev]);
      setCommentText('');
      toast.success('แสดงความคิดเห็นแล้ว!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'ไม่สามารถส่ง comment ได้');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      toast.success('ลบความคิดเห็นแล้ว');
    } catch {
      toast.error('ไม่สามารถลบ comment ได้');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success('บันทึกลิงก์ไว้ที่ Clipboard แล้ว!');
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center gap-3 text-gray-500">
      <Loader2 className="animate-spin" /> กำลังโหลด...
    </div>
  );
  if (!article) return (
    <div className="h-screen flex items-center justify-center text-gray-500">ไม่พบบทความ</div>
  );

  return (
    <div className="relative min-h-screen bg-white font-sans">
      <Toaster richColors position="bottom-right" />
      <Navbar />

      {/* Dialog: ต้อง Login */}
      {isDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-10 max-w-md w-full relative text-center shadow-2xl">
            <button onClick={() => setIsDialogOpen(false)} className="absolute right-6 top-6 text-gray-400 hover:text-black">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-3 text-gray-900">เข้าสู่ระบบเพื่อดำเนินการต่อ</h2>
            <p className="text-gray-500 mb-8">คุณต้องมีบัญชีผู้ใช้งานเพื่อกดไลก์หรือแสดงความคิดเห็น</p>
            <button onClick={() => navigate('/signup')}
              className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all mb-4">
              สร้างบัญชีใหม่
            </button>
            <p className="text-sm text-gray-500">
              มีบัญชีอยู่แล้ว?{' '}
              <span onClick={() => navigate('/login')} className="text-black font-bold underline cursor-pointer">ล็อกอิน</span>
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
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                {article.category}
              </span>
              <span>{article.date}</span>
            </div>

            <img src={article.image} className="w-full aspect-video object-cover rounded-[32px] mb-8 shadow-lg" alt={article.title} />

            <div className="text-2xl font-bold prose prose-lg max-w-none text-gray-900 leading-relaxed mb-3">
              <ReactMarkdown>{article.description}</ReactMarkdown>
            </div>
            <div className="text-xl prose prose-lg max-w-none text-gray-900 leading-relaxed">
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>

            {/* Comment Section */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                Comment <span className="text-gray-400 text-lg font-normal">({comments.length})</span>
              </h3>

              {loggedIn && user ? (
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-gray-700">{user.name}</span>
                  </div>
                  <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)}
                    placeholder="แสดงความคิดเห็น..."
                    className="w-full p-4 border border-gray-200 rounded-2xl bg-white h-28 outline-none focus:border-gray-400 transition-all resize-none text-gray-900 placeholder-gray-400" />
                  <div className="flex justify-end">
                    <button onClick={handleSubmitComment} disabled={submitting || !commentText.trim()}
                      className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all disabled:opacity-40">
                      {submitting ? <Loader2 className="animate-spin" size={14} /> : <Send size={14} />} ส่ง
                    </button>
                  </div>
                </div>
              ) : (
                <div onClick={handleProtectedAction} className="cursor-pointer mb-8">
                  <textarea readOnly placeholder="คลิกเพื่อแสดงความคิดเห็น (ต้องเข้าสู่ระบบก่อน)..."
                    className="w-full p-4 border border-gray-200 rounded-2xl bg-gray-50 h-28 cursor-pointer outline-none text-gray-400 placeholder-gray-400 resize-none" />
                </div>
              )}

              {comments.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-8">ยังไม่มีความคิดเห็น เป็นคนแรกได้เลย!</p>
              ) : (
                <div className="space-y-4">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50/50">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                        {(c.name || c.username || '?').charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-bold text-gray-800">{c.name || c.username}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 shrink-0">{formatDate(c.created_at)}</span>
                            {user && (c.username === user.username || c.name === user.name) && (
                              <button onClick={() => handleDeleteComment(c.id)}
                                className="text-gray-300 hover:text-red-400 transition-colors">
                                <Trash2 size={13} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 break-words">{c.comment_text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-28 space-y-6">
              <div className="bg-gray-50 p-8 rounded-[32px] border border-gray-100 text-center">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                  {article.author.charAt(0)}
                </div>
                <h4 className="text-black text-xl font-bold">{article.author}</h4>
                <p className="text-gray-500 text-sm mb-6">Digital Content Creator</p>

                {/* ✅ Like button จริง */}
                <button
                  onClick={handleLike}
                  disabled={likeLoading}
                  className={`w-full py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2
                    ${isLiked
                      ? 'bg-rose-500 text-white hover:bg-rose-600 shadow-md'
                      : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
                    } disabled:opacity-60`}
                >
                  {likeLoading
                    ? <Loader2 className="animate-spin" size={18} />
                    : <Heart size={18} className={isLiked ? 'fill-white' : ''} />
                  }
                  {isLiked ? 'Liked' : 'Like'} ({likesCount})
                </button>
              </div>

              <div className="p-8 border rounded-[32px] space-y-4">
                <p className="font-bold text-gray-900">แชร์บทความนี้</p>
                <div className="flex gap-3">
                  <a href={`https://www.facebook.com/share.php?u=${currentUrl}`} target="_blank" rel="noreferrer"
                    className="p-3 border rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`} target="_blank" rel="noreferrer"
                    className="p-3 border rounded-full hover:bg-blue-700 hover:text-white transition-all"><Linkedin size={20} /></a>
                  <a href={`https://twitter.com/share?url=${currentUrl}`} target="_blank" rel="noreferrer"
                    className="p-3 border rounded-full hover:bg-black hover:text-white transition-all"><Twitter size={20} /></a>
                  <button onClick={handleCopyLink}
                    className="p-3 border rounded-full hover:bg-emerald-600 hover:text-white transition-all"><Copy size={20} /></button>
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
