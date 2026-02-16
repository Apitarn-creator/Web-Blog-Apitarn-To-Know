import { useState } from 'react';
import { 
  Plus,
  Search,
  Edit,
  Trash2
} from 'lucide-react';

function CategoryManagementPage() {
  const [categories] = useState([
    { id: 1, name: 'Highlight', count: 12, status: 'Active', created_at: '12 Jan 2024' },
    { id: 2, name: 'Technology', count: 8, status: 'Active', created_at: '15 Jan 2024' },
    { id: 3, name: 'Life Style', count: 5, status: 'Active', created_at: '20 Jan 2024' },
    { id: 4, name: 'Programming', count: 3, status: 'Inactive', created_at: '22 Feb 2024' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category management</h2>
          <p className="text-gray-500 text-sm mt-1">จัดการหมวดหมู่บทความทั้งหมดในระบบ</p>
        </div>
        
        <button className="px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm hover:bg-gray-800 transition-all shadow-lg flex items-center gap-2 transform hover:-translate-y-0.5">
          <Plus size={18} />
          Create new category
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 flex items-center gap-3">
          <Search className="text-gray-400" size={20} />
          <input 
              type="text" 
              placeholder="ค้นหาหมวดหมู่..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
          />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Category Name</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Articles</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Created Date</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredCategories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors group">
                <td className="px-8 py-6 text-sm font-medium text-gray-500">#{cat.id}</td>
                <td className="px-8 py-6"><span className="font-bold text-gray-900 text-base">{cat.name}</span></td>
                <td className="px-8 py-6 text-sm text-gray-500"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600">{cat.count} posts</span></td>
                <td className="px-8 py-6 text-sm text-gray-500">{cat.created_at}</td>
                <td className="px-8 py-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${cat.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-gray-100 text-gray-500 border border-gray-200'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                    {cat.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"><Edit size={16} /></button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default CategoryManagementPage;