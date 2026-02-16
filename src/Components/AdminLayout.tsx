import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderOpen, 
  User, 
  Bell, 
  Lock, 
  LogOut, 
  ExternalLink
} from 'lucide-react';

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ฟังก์ชันเช็คว่าตอนนี้อยู่หน้าไหน เพื่อทำไฮไลท์เมนู
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-white font-sans text-gray-800">
      
      {/* --- Sidebar (อยู่ที่นี่ที่เดียว แก้ที่เดียวเปลี่ยนทุกหน้า) --- */}
      <aside className="w-64 bg-[#fcfcfc] border-r border-gray-100 flex flex-col fixed h-full z-10 hidden md:flex">
        <div className="p-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 cursor-pointer" onClick={() => navigate('/')}>
            Apitarn<span className="text-emerald-500">.</span>
          </h1>
          <p className="text-orange-300 text-sm font-medium mt-1">Admin panel</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div onClick={() => navigate('/create-post')}>
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Article management" active={isActive('/create-post')} />
          </div>
          
          <div onClick={() => navigate('/category-management')}>
            <SidebarItem icon={<FolderOpen size={20} />} text="Category management" active={isActive('/category-management')} />
          </div>

          <div onClick={() => navigate('/user-profile')}>
            <SidebarItem icon={<User size={20} />} text="Profile" active={isActive('/user-profile')} />
          </div>

          <div onClick={() => navigate('/notification')}>
            <SidebarItem icon={<Bell size={20} />} text="Notification" active={isActive('/notification')} />
          </div>

            <div onClick={() => navigate('/reset-password')}>
          <SidebarItem icon={<Lock size={20} />} text="Reset password" active={isActive('/reset-password')} />
        </div>
        
        </nav>

        <div className="p-4 mt-auto border-t border-gray-100">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-gray-500 hover:text-black p-3 transition-colors w-full text-sm font-medium">
            <ExternalLink size={18} /> hh. website
          </button>
          <button className="flex items-center gap-3 text-gray-500 hover:text-red-600 p-3 transition-colors w-full text-sm font-medium">
            <LogOut size={18} /> Log out
          </button>
        </div>
      </aside>

      {/* --- ส่วนเนื้อหาที่จะเปลี่ยนไปตามหน้า (Dynamic Content) --- */}
      <main className="flex-1 md:ml-64 bg-gray-50/30 min-h-screen">
        <Outlet /> {/* นี่คือพระเอก! เนื้อหาของแต่ละหน้าจะมาโผล่ตรงนี้ */}
      </main>

    </div>
  );
}

// Component ย่อยสำหรับปุ่ม Sidebar
function SidebarItem({ icon, text, active = false }: { icon: any, text: string, active?: boolean }) {
  return (
    <div 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all mb-1
        ${active ? 'bg-[#e9e9e9] text-black font-bold' : 'text-gray-500 hover:bg-gray-100 hover:text-black'}`}
    >
      {icon}
      <span className="text-sm">{text}</span>
    </div>
  );
}

export default AdminLayout;