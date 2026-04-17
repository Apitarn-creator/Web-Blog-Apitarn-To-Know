import { useState, useEffect } from 'react';
import { Camera, CheckCircle, X, Key } from 'lucide-react';
import { getStoredUser } from '../utils/auth';
import { resetPassword } from '../services/articleService';

function UserProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('Action completed successfully.');

  // ✅ โหลดข้อมูล user จาก localStorage จริงๆ
  const storedUser = getStoredUser();
  const [user, setUser] = useState({
    name: storedUser?.name || '',
    username: storedUser?.username || '',
    email: storedUser?.email || '',
    role: storedUser?.role || 'user',
    image: storedUser?.profilePic || '',
  });

  // password form
  const [pwForm, setPwForm] = useState({ current: '', new: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleSaveProfile = () => {
    showToast('Profile updated successfully.');
  };

  const handleResetPassword = async () => {
    setPwError('');
    if (pwForm.new !== pwForm.confirm) {
      setPwError('New password และ Confirm password ไม่ตรงกัน');
      return;
    }
    if (pwForm.new.length < 6) {
      setPwError('Password ต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }
    setPwLoading(true);
    try {
      await resetPassword(pwForm.current, pwForm.new);
      setPwForm({ current: '', new: '', confirm: '' });
      setShowConfirmModal(false);
      showToast('Password updated successfully.');
    } catch (err: any) {
      setPwError(err.response?.data?.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
    } finally {
      setPwLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 outline-none transition-all text-sm text-gray-900 bg-white placeholder-gray-400";

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Toast */}
      {showSuccessToast && (
        <div className="fixed top-8 right-8 z-50 bg-emerald-50 text-emerald-700 border border-emerald-100 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
          <CheckCircle size={20} />
          <div>
            <h4 className="font-bold text-sm">Success!</h4>
            <p className="text-xs opacity-80">{toastMessage}</p>
          </div>
          <button onClick={() => setShowSuccessToast(false)} className="ml-4 hover:bg-emerald-100 p-1 rounded-full">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Key size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Confirm password change?</h3>
            {pwError && <p className="text-red-500 text-sm mb-4">{pwError}</p>}
            <div className="flex gap-3 justify-center mt-4">
              <button onClick={() => { setShowConfirmModal(false); setPwError(''); }}
                className="flex-1 py-3 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm">
                Cancel
              </button>
              <button onClick={handleResetPassword} disabled={pwLoading}
                className="flex-1 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg text-sm">
                {pwLoading ? 'Saving...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">จัดการข้อมูลส่วนตัวและความปลอดภัย</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        {(['profile', 'password'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all relative capitalize
              ${activeTab === tab ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}>
            {tab === 'profile' ? 'My Profile' : 'Password & Security'}
            {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full" />}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <div className="max-w-lg space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {user.image
                  ? <img src={user.image} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-2xl font-bold text-gray-500">{user.name.charAt(0).toUpperCase()}</span>
                }
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-all">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <p className="font-bold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.role}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Display Name</label>
            <input type="text" value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Username</label>
            <input type="text" value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Email</label>
            <input type="email" value={user.email} disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed outline-none text-sm" />
          </div>

          <button onClick={handleSaveProfile}
            className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg">
            Save changes
          </button>
        </div>
      )}

      {activeTab === 'password' && (
        <div className="max-w-lg space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Current Password</label>
            <input type="password" placeholder="••••••••" value={pwForm.current}
              onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
              className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">New Password</label>
            <input type="password" placeholder="••••••••" value={pwForm.new}
              onChange={(e) => setPwForm({ ...pwForm, new: e.target.value })}
              className={inputClass} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label>
            <input type="password" placeholder="••••••••" value={pwForm.confirm}
              onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
              className={inputClass} />
          </div>

          {pwError && <p className="text-red-500 text-sm">{pwError}</p>}

          <button onClick={() => { setPwError(''); setShowConfirmModal(true); }}
            className="px-8 py-3 bg-black text-white rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg">
            Change password
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
