import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  // สร้าง State สำหรับเปิด-ปิดเมนูในมือถือ
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white px-6 md:px-20 py-4 border-b border-[#eee] relative">
      <div className="flex justify-between items-center">
        
        {/* Logo Section */}
        <Link to="/" className="text-2xl font-bold text-[#333] flex items-center">
          Apitarn
          <span className="text-green-500">.</span>
        </Link>

        {/* Hamburger Icon - แสดงเฉพาะในมือถือ */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#333] focus:outline-none"
          >
            {/* ไอคอนขีดสามขีด (Hamburger) */}
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Links - Desktop (แสดงปกติ) */}
        <ul className="hidden md:flex list-none gap-4 m-0 p-0 items-center">
          {/* Social Icons */}
          <li><a href="/discord" className="text-3xl text-[#333]"><i className="fa-brands fa-discord"></i></a></li>
          <li><a href="/instagram" className="text-3xl text-[#333]"><i className="fa-brands fa-instagram"></i></a></li>
          <li><a href="/tiktok" className="text-3xl text-[#333]"><i className="fa-brands fa-tiktok"></i></a></li>
          <li><a href="/x-twitter" className="text-3xl text-[#333]"><i className="fa-brands fa-x-twitter"></i></a></li>
          
          <li className="ml-4">
          <a href="/login" className="no-underline px-6 py-2 rounded-full font-semibold transition-all text-sm text-gray-700 border border-gray-300 hover:bg-gray-100">
            Log in
          </a>
        </li>
        <li>
            <a href="/signup" className="no-underline px-6 py-2 rounded-full font-semibold transition-all text-sm bg-white text-black border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-gray-400">
            Sign up
          </a>
        </li>
        </ul>
      </div>

      {/* Mobile Menu Dropdown - แสดงเมื่อกดปุ่ม Hamburger */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#eee] z-50">
          <ul className="list-none flex flex-col p-6 gap-4 items-center">
            <div className="flex gap-6 mb-4">
               <li><a href="/discord" className="text-2xl text-[#333]"><i className="fa-brands fa-discord"></i></a></li>
               <li><a href="/instagram" className="text-2xl text-[#333]"><i className="fa-brands fa-instagram"></i></a></li>
               <li><a href="/tiktok" className="text-2xl text-[#333]"><i className="fa-brands fa-tiktok"></i></a></li>
               <li><a href="/x-twitter" className="text-3xl text-[#333]"><i className="fa-brands fa-x-twitter"></i></a></li>
            </div>
            <li className="w-full text-center">
              <a href="/login" className="block w-full py-2 text-indigo-600 border border-indigo-100 rounded-full hover:bg-indigo-50 transition-colors">Log in</a>
            </li>
            <li className="w-full text-center">
              <a href="/signup" className="block w-full py-2 bg-indigo-100 text-white rounded-full hover:bg-indigo-100 shadow-sm transition-all">Sign up</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;