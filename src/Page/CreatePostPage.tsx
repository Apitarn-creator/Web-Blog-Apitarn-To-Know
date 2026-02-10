import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

// ดึง URL จาก .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function CreatePostPage() {
  // สร้าง State สำหรับเก็บค่าจากฟอร์ม
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category_id: 1, // Default ไว้ก่อน
    description: '',
    content: '',
    status_id: 1 // Default = Published
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ฟังก์ชันสำหรับเวลากรอกข้อมูลในฟอร์ม
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ฟังก์ชันเมื่อกดปุ่ม Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // ยิงข้อมูลไปที่ Backend (/post)
      await axios.post(`${API_BASE_URL}/post`, formData);
      setMessage('✅ สร้างบทความสำเร็จเรียบร้อย!');
    } catch (error: any) {
      console.error(error);
      setMessage('❌ เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      <Navbar />
      <div className="flex-grow container mx-auto p-6 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Create New Post</h1>
        
        <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg space-y-4">
          
          <div>
            <label className="block mb-1 font-semibold">Title</label>
            <input 
              type="text" 
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-blue-500 outline-none"
              placeholder="หัวข้อบทความ..."
              required 
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Image URL</label>
            <input 
              type="text" 
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              placeholder="https://example.com/image.jpg"
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-semibold">Category ID</label>
              <input 
                type="number" 
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold">Status ID</label>
              <input 
                type="number" 
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Description</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              placeholder="คำอธิบายสั้นๆ..."
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Content</label>
            <textarea 
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              placeholder="เนื้อหาบทความเต็มๆ..."
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-3 rounded-lg font-bold transition-all ${loading ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-500'}`}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>

          {message && (
            <div className={`p-3 rounded text-center ${message.includes('✅') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePostPage;