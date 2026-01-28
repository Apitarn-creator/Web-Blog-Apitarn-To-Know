import { useState } from 'react';
import { LayoutDashboard, FileText, Users, LogOut, Plus } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 p-6 hidden md:block">
        <div className="text-2xl font-bold mb-10">Apitarn<span className="text-emerald-500">.</span> Admin</div>
        <nav className="space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-bold">
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <FileText size={20} /> Manage Posts
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <Users size={20} /> Members
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">จัดการบทความทั้งหมด</h1>
          <button className="bg-black text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-all">
            <Plus size={20} /> สร้างบทความใหม่
          </button>
        </div>

        {/* Table List */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-500">หัวข้อบทความ</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500">หมวดหมู่</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500">สถานะ</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-500">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3].map((item) => (
                <tr key={item} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">ตัวอย่างบทความที่ {item}</td>
                  <td className="px-6 py-4"><span className="bg-gray-100 px-3 py-1 rounded-full text-xs">Technology</span></td>
                  <td className="px-6 py-4 text-emerald-500 font-bold text-sm">Published</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button className="text-blue-600 font-bold hover:underline">แก้ไข</button>
                    <button className="text-red-500 font-bold hover:underline">ลบ</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
export default AdminDashboard;