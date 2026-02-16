import { useState } from 'react';
import { 
  Camera,
  CheckCircle,
  X,
  Key
} from 'lucide-react';

function UserProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [user, setUser] = useState({
    name: 'Apitarn P.',
    username: 'apitarn.dev',
    email: 'apitarn.dev@example.com',
    role: 'Administrator',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200'
  });

  const handleSaveProfile = () => {
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleResetPasswordClick = () => {
    setShowConfirmModal(true);
  };

  const confirmResetPassword = () => {
    setShowConfirmModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Toast & Modal */}
      {showSuccessToast && (
        <div className="fixed top-8 right-8 z-50 bg-emerald-50 text-emerald-700 border border-emerald-100 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-right-5 fade-in">
          <CheckCircle size={20} />
          <div><h4 className="font-bold text-sm">Success!</h4><p className="text-xs opacity-80">Action completed successfully.</p></div>
          <button onClick={() => setShowSuccessToast(false)} className="ml-4 hover:bg-emerald-100 p-1 rounded-full"><X size={16} /></button>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border border-gray-100">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400"><Key size={32} /></div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Reset password?</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">Are you sure you want to reset your password? You will need to log in again.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowConfirmModal(false)} className="flex-1 py-3 rounded-full border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-all text-sm">Cancel</button>
              <button onClick={confirmResetPassword} className="flex-1 py-3 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all shadow-lg text-sm">Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
        <p className="text-gray-500 text-sm mt-1">จัดการข้อมูลส่วนตัวและความปลอดภัย</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button onClick={() => setActiveTab('profile')} className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}>
          My Profile {activeTab === 'profile' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full"></span>}
        </button>
        <button onClick={() => setActiveTab('password')} className={`pb-4 text-sm font-bold transition-all relative ${activeTab === 'password' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}>
          Password & Security {activeTab === 'password' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black rounded-full"></span>}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 max-w-5xl">
        {/* Avatar Card */}
        <div className="w-full lg:w-80">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="relative inline-block mb-4 group cursor-pointer">
              <img src={user.image} alt="Profile" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"><Camera className="text-white" size={24} /></div>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
            <p className="text-gray-500 text-sm mb-6">{user.role}</p>
            <div className="space-y-3">
               <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2">Contact Info</div>
               <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 break-all">{user.email}</div>
               <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600 break-all">Bangkok, Thailand</div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Display Name</label><input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm font-medium" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Username</label><input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm font-medium" /></div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Email Address</label>
                <input type="email" value={user.email} disabled className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed outline-none text-sm font-medium" />
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end"><button onClick={handleSaveProfile} className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all text-sm">Save Changes</button></div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Current Password</label><input type="password" placeholder="••••••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">New Password</label><input type="password" placeholder="••••••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" /></div>
                <div className="space-y-2"><label className="text-xs font-bold text-gray-500 uppercase">Confirm New Password</label><input type="password" placeholder="••••••••••••" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-black outline-none transition-all text-sm" /></div>
              </div>
              <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-100">
                <h5 className="text-yellow-700 font-bold text-sm mb-1">Password Requirements</h5>
                <ul className="text-xs text-yellow-600 list-disc list-inside space-y-1"><li>Minimum 8 characters</li><li>One lowercase & uppercase</li><li>One number or symbol</li></ul>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end"><button onClick={handleResetPasswordClick} className="px-8 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 transition-all text-sm">Update Password</button></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;