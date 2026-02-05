import { useState } from 'react';
import { LayoutDashboard, FileText, Users, Plus, Edit, Trash2, Search } from 'lucide-react';

// Mockup Data สำหรับสมาชิก
const mockMembers = [
  { id: 1, username: 'user01', email: 'user01@example.com', role: 'User', status: 'Active' },
  { id: 2, username: 'editor_k', email: 'k@example.com', role: 'Editor', status: 'Active' },
  { id: 3, username: 'banned_guy', email: 'bad@example.com', role: 'User', status: 'Banned' },
];

function AdminDashboard() {
  // State สำหรับสลับหน้า (activeTab)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'members'>('posts');

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:flex flex-col">
        <div className="text-2xl font-bold mb-10 text-gray-800">Apitarn<span className="text-emerald-500">.</span> Admin</div>
        
        <nav className="space-y-2 flex-1">
          {/* ปุ่ม Dashboard (ยังไม่มีหน้า Dashboard จริง ให้เป็น Placeholder ไว้ก่อน) */}
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>

          {/* ปุ่ม Manage Posts */}
          <button 
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'posts' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <FileText size={20} /> Manage Posts
          </button>

          {/* ปุ่ม Members (Requirement: Member Management) */}
          <button 
            onClick={() => setActiveTab('members')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'members' ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Users size={20} /> Member Management
          </button>
        </nav>

        <div className="text-xs text-gray-400 text-center mt-auto">v1.0.0 Admin Panel</div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        {/* --- ส่วนแสดงผล: จัดการบทความ (Posts) --- */}
        {activeTab === 'posts' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">จัดการบทความทั้งหมด</h1>
                <p className="text-gray-500">ดูแลและแก้ไขบทความในระบบ</p>
              </div>
              <button className="bg-black text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Plus size={20} /> สร้างบทความใหม่
              </button>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">หัวข้อบทความ</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">หมวดหมู่</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider">สถานะ</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase tracking-wider text-right">จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3].map((item) => (
                    <tr key={item} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-6 py-5 font-bold text-gray-900">Tech Trend {item}: AI กำลังเปลี่ยนโลก</td>
                      <td className="px-6 py-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">Technology</span></td>
                      <td className="px-6 py-5"><span className="flex items-center gap-2 text-emerald-600 font-bold text-sm"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span>Published</span></td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-blue-600 transition-colors"><Edit size={18} /></button>
                          <button className="p-2 hover:bg-rose-50 rounded-full text-gray-500 hover:text-rose-600 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ส่วนแสดงผล: Member Management (Requirement ที่ขาด) --- */}
        {activeTab === 'members' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">จัดการสมาชิก (Member Management)</h1>
                <p className="text-gray-500">ดูรายชื่อและจัดการสิทธิ์ผู้ใช้งาน</p>
              </div>
              <div className="relative">
                <input type="text" placeholder="ค้นหาผู้ใช้..." className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-emerald-500 outline-none w-64" />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase">Username</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-5 text-sm font-bold text-gray-500 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {mockMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-5 font-bold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">{member.username.substring(0,2).toUpperCase()}</div>
                        {member.username}
                      </td>
                      <td className="px-6 py-5 text-gray-600">{member.email}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${member.role === 'Editor' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`flex items-center gap-2 font-bold text-sm ${member.status === 'Active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          <span className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-sm font-bold text-gray-400 hover:text-black transition-colors underline">จัดการ</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ส่วนแสดงผล: Dashboard Placeholder --- */}
        {activeTab === 'dashboard' && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in fade-in zoom-in duration-300">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                    <LayoutDashboard size={48} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-500 mt-2">ส่วนนี้จะแสดงกราฟสถิติผู้เข้าชมและยอดไลก์ (Coming Soon)</p>
            </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;