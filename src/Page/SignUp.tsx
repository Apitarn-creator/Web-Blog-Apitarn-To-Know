import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { register } from '../services/articleService';

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-gray-400 transition-all text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative">
      <button onClick={() => navigate('/')}
        className="absolute top-8 left-8 p-3 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black shadow-sm">
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-2 text-gray-900">สร้างบัญชีใหม่</h2>
          <p className="text-gray-500">กรอกข้อมูลเพื่อร่วมเป็นส่วนหนึ่งกับเรา</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          {[
            { label: 'ชื่อจริง', name: 'name', type: 'text', placeholder: 'Full Name' },
            { label: 'ชื่อผู้ใช้งาน', name: 'username', type: 'text', placeholder: 'Username' },
            { label: 'อีเมล', name: 'email', type: 'email', placeholder: 'Email Address' },
            { label: 'รหัสผ่าน', name: 'password', type: 'password', placeholder: 'Password (6+ characters)' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-2">{label}</label>
              <input type={type} name={name} placeholder={placeholder} required
                minLength={name === 'password' ? 6 : undefined}
                value={(form as any)[name]} onChange={handleChange}
                className={inputClass} />
            </div>
          ))}

          <div className="pt-4">
            <button type="submit" disabled={loading}
              className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2">
              {loading ? <><Loader2 className="animate-spin" size={20} /> กำลังสร้างบัญชี...</> : 'สมัครสมาชิก'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          มีบัญชีอยู่แล้ว?{' '}
          <Link to="/login" className="text-black font-black underline hover:text-gray-600 transition-colors">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
