import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { createPost, fetchCategories, type Category } from '../services/articleService';
import { getStoredUser } from '../utils/auth';

function CreatePostPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const user = getStoredUser();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category_id: 1,
    description: '',
    content: '',
    status_id: 1,
  });

  // โหลด categories จาก API จริง
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.name === 'category_id' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: val });
  };

  const handleSubmit = async (statusId: number) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      setNotification({ type: 'error', message: 'กรุณากรอก Title และ Content ก่อนบันทึก' });
      return;
    }
    setLoading(true);
    setNotification(null);
    try {
      await createPost({ ...formData, status_id: statusId });
      setNotification({
        type: 'success',
        message: statusId === 1 ? '🎉 Published article successfully!' : '📁 Saved as draft successfully!',
      });
      if (statusId === 1) setTimeout(() => navigate('/'), 2000);
      else setFormData({ title: '', image: '', category_id: 1, description: '', content: '', status_id: 1 });
    } catch (error: any) {
      setNotification({
        type: 'error',
        message: 'Something went wrong: ' + (error.response?.data?.message || error.message),
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create article</h2>
          {user && <p className="text-gray-400 text-sm mt-1">by {user.name}</p>}
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleSubmit(2)} disabled={loading}
            className="px-6 py-2.5 rounded-full border border-gray-300 font-bold text-sm hover:bg-gray-50 transition-all text-gray-700 disabled:opacity-40">
            Save as draft
          </button>
          <button onClick={() => handleSubmit(1)} disabled={loading}
            className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2 disabled:opacity-40">
            {loading && <Loader2 className="animate-spin" size={16} />}
            Save and publish
          </button>
        </div>
      </header>

      <div className="max-w-3xl space-y-8">

        {notification && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {notification.message}
          </div>
        )}

        {/* Thumbnail */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-600">Thumbnail image</label>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-[320px] aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
              {formData.image
                ? <img src={formData.image} alt="Thumbnail" className="w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                : <ImageIcon className="text-gray-300" size={48} />}
            </div>
            <div className="flex-1 w-full space-y-2">
              <input type="text" name="image" value={formData.image} onChange={handleChange}
                placeholder="https://example.com/image.jpg" className={inputClass} />
              <p className="text-xs text-gray-400">วางลิงก์รูปภาพ จะแสดง preview ทันที</p>
            </div>
          </div>
        </div>

        {/* Category — โหลดจาก API จริง */}
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
          <select name="category_id" value={formData.category_id} onChange={handleChange}
            className={inputClass + " cursor-pointer"}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="Article title" className={inputClass + " font-medium"} />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Introduction</label>
          <textarea name="description" value={formData.description} onChange={handleChange}
            rows={3} placeholder="Brief introduction..." className={inputClass + " resize-none"} />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Content * <span className="font-normal text-gray-400">(รองรับ Markdown)</span></label>
          <textarea name="content" value={formData.content} onChange={handleChange}
            rows={14} placeholder="## Heading&#10;&#10;Write your content here..." className={inputClass + " resize-y font-mono text-sm"} />
        </div>

      </div>
    </div>
  );
}

export default CreatePostPage;
