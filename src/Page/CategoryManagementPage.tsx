import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Check, Loader2 } from 'lucide-react';
import { fetchCategories, type Category } from '../services/articleService';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('access_token')}` });

function CategoryManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // modal สร้าง/แก้ไข
  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Category | null>(null);
  const [inputName, setInputName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories().then(data => { setCategories(data); setLoading(false); });
  }, []);

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreate = () => { setEditTarget(null); setInputName(''); setError(''); setModalOpen(true); };
  const openEdit = (cat: Category) => { setEditTarget(cat); setInputName(cat.name); setError(''); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setError(''); };

  const handleSave = async () => {
    if (!inputName.trim()) { setError('กรุณากรอกชื่อหมวดหมู่'); return; }
    setSaving(true);
    setError('');
    try {
      if (editTarget) {
        // แก้ไข
        await axios.put(`${API}/categories/${editTarget.id}`, { name: inputName.trim() }, { headers: authHeader() });
        setCategories(prev => prev.map(c => c.id === editTarget.id ? { ...c, name: inputName.trim() } : c));
      } else {
        // สร้างใหม่
        const res = await axios.post(`${API}/categories`, { name: inputName.trim() }, { headers: authHeader() });
        setCategories(prev => [...prev, res.data.category]);
      }
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (cat: Category) => {
    if (!confirm(`ลบหมวดหมู่ "${cat.name}" ใช่ไหม?`)) return;
    try {
      await axios.delete(`${API}/categories/${cat.id}`, { headers: authHeader() });
      setCategories(prev => prev.filter(c => c.id !== cat.id));
    } catch (err: any) {
      alert(err.response?.data?.message || 'ลบไม่สำเร็จ');
    }
  };

  return (
    <div className="p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">{editTarget ? 'แก้ไขหมวดหมู่' : 'สร้างหมวดหมู่ใหม่'}</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-black"><X size={20} /></button>
            </div>
            <label className="block text-sm font-bold text-gray-600 mb-2">ชื่อหมวดหมู่</label>
            <input type="text" value={inputName} onChange={e => setInputName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="เช่น Technology, Life Style..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none text-gray-900 bg-white placeholder-gray-400 text-sm mb-2" />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <div className="flex gap-3 mt-4">
              <button onClick={closeModal}
                className="flex-1 py-2.5 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50">
                ยกเลิก
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 flex items-center justify-center gap-2 disabled:opacity-40">
                {saving ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                {editTarget ? 'บันทึก' : 'สร้าง'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category management</h2>
          <p className="text-gray-500 text-sm mt-1">จัดการหมวดหมู่บทความทั้งหมดในระบบ ({categories.length} หมวด)</p>
        </div>
        <button onClick={openCreate}
          className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2">
          <Plus size={18} /> Create new category
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
        <Search className="text-gray-400" size={20} />
        <input type="text" placeholder="ค้นหาหมวดหมู่..." value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-1 outline-none text-sm text-gray-900 bg-white placeholder-gray-400" />
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
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Category Name</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={3} className="px-8 py-12 text-center text-gray-400">ไม่พบหมวดหมู่</td></tr>
              ) : filtered.map(cat => (
                <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-8 py-5 text-sm font-medium text-gray-500">#{cat.id}</td>
                  <td className="px-8 py-5 font-bold text-gray-900">{cat.name}</td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(cat)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(cat)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all">
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

export default CategoryManagementPage;
