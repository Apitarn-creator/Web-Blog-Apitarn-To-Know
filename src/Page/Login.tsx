import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic สมมติ: ถ้าเป็น admin@test.com ให้ไปหน้า Admin
    if (email.includes('admin')) navigate('/admin');
    else navigate('/');
  };

  return (<><Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
        <h2 className="text-black text-3xl font-black mb-2 text-center">Log In</h2>
        <p className="text-gray-500 text-center mb-8">เข้าสู่ระบบของคุณ</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
        <p className="text-gray-500 text-center">Email</p>
          <input 
            type="email" placeholder="Email" required
            className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-emerald-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
          />
        <p className="text-gray-500 text-center">Password</p>
          <input 
            type="password" placeholder="Password" required
            className="w-full mb-8 px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-emerald-500 transition-all"
          />
          <button className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg">
            เข้าสู่ระบบ
          </button>
        </form>
        <p className="mt-6 text-center text-gray-500">
          ยังไม่มีบัญชี? <Link to="/signup" className="text-black font-bold underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
    <Footer /></>
  );
}
export default Login;