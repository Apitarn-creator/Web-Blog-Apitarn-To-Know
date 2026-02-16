import { useState } from 'react';
import { 
  Key, 
  CheckCircle, 
  XCircle, 
  Eye, 
  EyeOff, 
  ShieldCheck 
} from 'lucide-react';

function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    // Basic Validation
    if (formData.newPassword !== formData.confirmPassword) {
      setNotification({ type: 'error', message: 'รหัสผ่านใหม่ไม่ตรงกัน (Passwords do not match)' });
      return;
    }

    if (formData.newPassword.length < 8) {
      setNotification({ type: 'error', message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร' });
      return;
    }

    setLoading(true);

    // Mock API Call
    setTimeout(() => {
      setLoading(false);
      setNotification({ type: 'success', message: 'เปลี่ยนรหัสผ่านสำเร็จเรียบร้อย! (Password updated)' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 1500);
  };

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg"><Key size={24} /></div>
          Reset Password
        </h2>
        <p className="text-gray-500 text-sm mt-2 ml-14">เปลี่ยนรหัสผ่านเพื่อความปลอดภัยของบัญชีคุณ</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-6xl">
        
        {/* Left: Form */}
        <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          
          {notification && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {notification.type === 'success' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Current Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
              <div className="relative">
                <input 
                  type={showCurrent ? "text" : "password"}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
                  required
                />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="h-px bg-gray-100 my-2"></div>

            {/* New Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
                <div className="relative">
                  <input 
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
                    required
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm"
                    required
                  />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all text-sm flex items-center gap-2"
              >
                {loading ? 'Processing...' : 'Update Password'}
              </button>
            </div>

          </form>
        </div>

        {/* Right: Info Card */}
        <div className="w-full lg:w-80">
          <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-100 shadow-sm">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-bold text-emerald-900 mb-2">Password Requirements</h3>
            <p className="text-sm text-emerald-700/80 mb-6">เพื่อความปลอดภัยสูงสุด กรุณาตั้งรหัสผ่านตามเงื่อนไขดังนี้:</p>
            
            <ul className="space-y-3">
              <li className={`text-xs flex items-center gap-2 ${formData.newPassword.length >= 8 ? 'text-emerald-600 font-bold' : 'text-gray-500'}`}>
                {formData.newPassword.length >= 8 ? <CheckCircle size={14} /> : <div className="w-3.5 h-3.5 rounded-full border border-gray-400"></div>}
                อย่างน้อย 8 ตัวอักษร
              </li>
              <li className="text-xs flex items-center gap-2 text-gray-500">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-400"></div>
                มีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว (A-Z)
              </li>
              <li className="text-xs flex items-center gap-2 text-gray-500">
                <div className="w-3.5 h-3.5 rounded-full border border-gray-400"></div>
                มีตัวเลขหรือสัญลักษณ์ (0-9, !@#)
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResetPasswordPage;