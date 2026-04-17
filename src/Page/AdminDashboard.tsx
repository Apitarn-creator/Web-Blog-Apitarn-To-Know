import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, Loader2, RefreshCw } from 'lucide-react';
import { fetchAllPostsAdmin, deletePost, formatDate } from '../services/articleService';

type Post = {
  id: number;
  title: string;
  category: string;
  status: string;
  date: string;
  likes_count: number;
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | string>('all');

  const loadPosts = async () => {
    setLoading(true);
    const data = await fetchAllPostsAdmin();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => { loadPosts(); }, []);

  const handleDelete = async (post: Post) => {
    if (!confirm(`ลบบทความ "${post.title}" ใช่ไหม?`)) return;
    try {
      await deletePost(post.id);
      setPosts(prev => prev.filter(p => p.id !== post.id));
    } catch {
      alert('ลบไม่สำเร็จ');
    }
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                        p.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // สถิติ
  const total = posts.length;
  const published = posts.filter(p => p.status?.toLowerCase().includes('publish') || p.status === '1').length;
  const drafts = total - published;

  return (
    <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Article management</h2>
          <p className="text-gray-500 text-sm mt-1">จัดการบทความทั้งหมดในระบบ</p>
        </div>
        <div className="flex gap-3">
          <button onClick={loadPosts}
            className="px-4 py-2.5 rounded-full border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 flex items-center gap-2">
            <RefreshCw size={15} /> Refresh
          </button>
          <button onClick={() => navigate('/create-post')}
            className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 shadow-lg flex items-center gap-2">
            <Plus size={18} /> สร้างบทความใหม่
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'บทความทั้งหมด', value: total, color: 'bg-gray-50 border-gray-200' },
          { label: 'Published', value: published, color: 'bg-emerald-50 border-emerald-100' },
          { label: 'Draft', value: drafts, color: 'bg-amber-50 border-amber-100' },
        ].map(s => (
          <div key={s.label} className={`${s.color} border rounded-2xl p-5`}>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
          <Search className="text-gray-400 shrink-0" size={18} />
          <input type="text" placeholder="ค้นหาบทความ..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-900 bg-white placeholder-gray-400" />
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-3 rounded-2xl border border-gray-100 bg-white text-sm text-gray-700 outline-none shadow-sm">
          <option value="all">ทั้งหมด</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
            <Loader2 className="animate-spin" /> กำลังโหลด...
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">หัวข้อบทความ</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">หมวดหมู่</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-16 text-center text-gray-400">ไม่พบบทความ</td></tr>
              ) : filtered.map(post => (
                <tr key={post.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-6 py-5 font-bold text-gray-900 max-w-xs">
                    <p className="line-clamp-1">{post.title}</p>
                    <p className="text-xs text-gray-400 font-normal mt-0.5">❤️ {post.likes_count || 0} likes</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500">{formatDate(post.date)}</td>
                  <td className="px-6 py-5">
                    <span className={`flex items-center gap-1.5 text-sm font-bold w-fit
                      ${post.status?.toLowerCase().includes('publish')
                        ? 'text-emerald-600' : 'text-amber-500'}`}>
                      <span className={`w-2 h-2 rounded-full
                        ${post.status?.toLowerCase().includes('publish')
                          ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                      {post.status || 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => navigate(`/create-post?edit=${post.id}`)}
                        className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-blue-600 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(post)}
                        className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
