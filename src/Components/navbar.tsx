import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, LayoutDashboard } from 'lucide-react';
import { isLoggedIn, getStoredUser, logout } from '../utils/auth';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const loggedIn = isLoggedIn();
  const user = getStoredUser();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white px-6 md:px-20 py-4 border-b border-[#eee] relative">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#333] flex items-center">
          Apitarn<span className="text-green-500">.</span>
        </Link>

        {/* Hamburger - mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#333] focus:outline-none">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex list-none gap-4 m-0 p-0 items-center">
          {/* Social icons */}
          <li><a href="https://www.linkedin.com/in/apitarnare/" target="_blank" rel="noreferrer" className="text-2xl text-[#333] hover:text-black"><i className="fa-brands fa-linkedin"></i></a></li>
          <li><a href="https://github.com/Apitarn-creator" target="_blank" rel="noreferrer" className="text-2xl text-[#333] hover:text-black"><i className="fa-brands fa-github"></i></a></li>

          {loggedIn && user ? (
            // ---- เมื่อ Login แล้ว ----
            <>
              {user.role === 'admin' && (
                <li>
                  <button onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all">
                    <LayoutDashboard size={16} /> Admin
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => navigate('/user-profile')}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-all">
                  <User size={16} />
                  <span>{user.name || user.username}</span>
                </button>
              </li>
              <li>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-red-500 border border-red-100 hover:bg-red-50 transition-all">
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </>
          ) : (
            // ---- ยังไม่ได้ Login ----
            <>
              <li className="ml-2">
                <Link to="/login"
                  className="px-6 py-2 rounded-full font-semibold transition-all text-sm text-gray-700 border border-gray-300 hover:bg-gray-100 no-underline">
                  Log in
                </Link>
              </li>
              <li>
                <Link to="/signup"
                  className="px-6 py-2 rounded-full font-semibold transition-all text-sm bg-black text-white border border-black hover:bg-gray-800 no-underline">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-[#eee] z-50">
          <ul className="list-none flex flex-col p-6 gap-4 items-center">
            <div className="flex gap-6 mb-2">
              <a href="https://www.linkedin.com/in/apitarnare/" target="_blank" rel="noreferrer" className="text-2xl text-[#333]"><i className="fa-brands fa-linkedin"></i></a>
              <a href="https://github.com/Apitarn-creator" target="_blank" rel="noreferrer" className="text-2xl text-[#333]"><i className="fa-brands fa-github"></i></a>
            </div>

            {loggedIn && user ? (
              <>
                <li className="text-sm font-bold text-gray-700">สวัสดี, {user.name || user.username}</li>
                {user.role === 'admin' && (
                  <li className="w-full text-center">
                    <button onClick={() => { navigate('/admin'); setIsOpen(false); }}
                      className="block w-full py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50">
                      Admin Panel
                    </button>
                  </li>
                )}
                <li className="w-full text-center">
                  <button onClick={() => { navigate('/user-profile'); setIsOpen(false); }}
                    className="block w-full py-2 rounded-full border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50">
                    Profile
                  </button>
                </li>
                <li className="w-full text-center">
                  <button onClick={handleLogout}
                    className="block w-full py-2 rounded-full border border-red-100 text-red-500 text-sm font-semibold hover:bg-red-50">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="w-full text-center">
                  <Link to="/login" onClick={() => setIsOpen(false)}
                    className="block w-full py-2 text-gray-700 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm font-semibold no-underline">
                    Log in
                  </Link>
                </li>
                <li className="w-full text-center">
                  <Link to="/signup" onClick={() => setIsOpen(false)}
                    className="block w-full py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-all text-sm font-semibold no-underline">
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
