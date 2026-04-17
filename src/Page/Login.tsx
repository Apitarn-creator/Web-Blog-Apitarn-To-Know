import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { login, getUser } from '../services/articleService';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = await login(email, password);
      localStorage.setItem('access_token', token);
      const user = await getUser();
      localStorage.setItem('user', JSON.stringify(user));
      if (user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error || 'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบ Email / Password');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-gray-400 transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
        <h2 className="text-black text-3xl font-black mb-2 text-center">Log In</h2>
        <p className="text-gray-500 text-center mb-8">เข้าสู่ระบบของคุณ</p>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Email</label>
            <input type="email" placeholder="your@email.com" required value={email}
              onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">Password</label>
            <input type="password" placeholder="••••••••" required value={password}
              onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </div>
          <div className="pt-2">
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="animate-spin" size={20} /> กำลังเข้าสู่ระบบ...</> : 'เข้าสู่ระบบ'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-500">
          ยังไม่มีบัญชี?{' '}
          <Link to="/signup" className="text-black font-bold underline">สมัครสมาชิก</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
