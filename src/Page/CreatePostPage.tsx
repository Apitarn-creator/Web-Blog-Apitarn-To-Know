import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Image as ImageIcon,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4001';

function CreatePostPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category_id: 1, 
    author: 'Apitarn P.',
    description: '',
    content: '',
    status_id: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (statusId: number) => {
    setLoading(true);
    setNotification(null);
    const payload = { ...formData, status_id: statusId };

    try {
      await axios.post(`${API_BASE_URL}/posts`, payload);
      setNotification({
        type: 'success', 
        message: statusId === 1 ? '🎉 Published article successfully!' : '📁 Saved as draft successfully!'
      });
      if (statusId === 1) setTimeout(() => navigate('/'), 2000);
    } catch (error: any) {
      console.error(error);
      setNotification({
        type: 'error', 
        message: 'Something went wrong: ' + (error.response?.data?.message || error.message)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Create article</h2>
        <div className="flex gap-3">
          <button onClick={() => handleSubmit(2)} disabled={loading} className="px-6 py-2.5 rounded-full border border-gray-300 font-bold text-sm hover:bg-gray-50 transition-all text-gray-700">
            Save as draft
          </button>
          <button onClick={() => handleSubmit(1)} disabled={loading} className="px-6 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2">
            {loading && <Loader2 className="animate-spin" size={16} />}
            Save and publish
          </button>
        </div>
      </header>

      {/* Form Content */}
      <div className="max-w-3xl space-y-8">
        
        {notification && (
          <div className={`p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
            {notification.type === 'success' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
            {notification.message}
          </div>
        )}

        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-600">Thumbnail image</label>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-[320px] aspect-video bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden relative group">
              {formData.image ? (
                <img src={formData.image} alt="Thumbnail" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="text-gray-300" size={48} />
              )}
            </div>
            <div className="flex-1 w-full">
              <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Category</label>
          <div className="relative">
            <select name="category_id" value={formData.category_id} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-black outline-none appearance-none cursor-pointer text-gray-700">
              <option value={1}>Highlight (แนะนำ)</option>
              <option value={2}>Technology</option>
              <option value={3}>Life Style</option>
              <option value={4}>Programming</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Author name</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white outline-none transition-all text-gray-700" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Article title" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-gray-900 font-medium" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Introduction</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Introduction..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all resize-none text-gray-700" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2">Content</label>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={12} placeholder="Content..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all resize-y text-gray-700" />
        </div>

      </div>
    </div>
  );
}

export default CreatePostPage;