import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // สมมติระบบทำงาน 1.5 วินาทีแล้วไปหน้า Login
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative">
      {/* ปุ่มย้อนกลับไปหน้าหลัก */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 p-3 hover:bg-white rounded-full transition-all text-gray-400 hover:text-black shadow-sm"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-sm border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black mb-2 text-gray-900">สร้างบัญชีใหม่</h2>
          <p className="text-gray-500">กรอกข้อมูลเพื่อร่วมเป็นส่วนหนึ่งกับเรา</p>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">ชื่อผู้ใช้งาน</label>
            <input 
              type="text" placeholder="Username" required
              className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">อีเมล</label>
            <input 
              type="email" placeholder="Email Address" required
              className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">รหัสผ่าน</label>
            <input 
              type="password" placeholder="Password (6+ characters)" required minLength={6}
              className="w-full px-6 py-4 rounded-full border border-gray-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 transition-all text-gray-800"
            />
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> กำลังสร้างบัญชี...
                </>
              ) : (
                'สมัครสมาชิก'
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-gray-500 font-medium">
          มีบัญชีอยู่แล้ว? <Link to="/login" className="text-black font-black underline hover:text-emerald-600 transition-colors">เข้าสู่ระบบ</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;