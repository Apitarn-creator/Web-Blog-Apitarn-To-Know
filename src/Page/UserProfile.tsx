import { useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import { User, Lock, Camera, X } from 'lucide-react'; // ใช้ไอคอนจาก lucide-react

function UserProfile() {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Mockup ข้อมูล user
  const [user, setUser] = useState({
    name: 'Moodeng ja',
    username: 'moodeng.cute',
    email: 'moodeng.cute@gmail.com',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200'
  });

  const handleSaveProfile = () => {
    // จำลองการบันทึกสำเร็จ
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleResetPasswordClick = () => {
    setShowConfirmModal(true);
  };

  const confirmResetPassword = () => {
    setShowConfirmModal(false);
    // Logic รีเซ็ตรหัสผ่านจริงจะอยู่ที่นี่
    alert("Password reset successfully (Mockup)");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 relative">
        
        {/* --- Toast Notification (สีเขียวตามภาพ) --- */}
        {showSuccessToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in z-50">
            <div>
              <h4 className="font-bold text-sm">Saved profile</h4>
              <p className="text-xs text-emerald-100">Your profile has been successfully updated</p>
            </div>
            <button onClick={() => setShowSuccessToast(false)} className="text-white hover:text-emerald-100"><X size={16} /></button>
          </div>
        )}

        {/* --- Modal ยืนยัน Reset Password (ตามภาพขวาล่าง) --- */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] p-8 max-w-sm w-full shadow-2xl text-center">
              <h3 className="text-xl font-bold mb-2">Reset password</h3>
              <p className="text-gray-500 mb-6 text-sm">Do you want to reset your password?</p>
              <div className="flex gap-3 justify-center">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmResetPassword}
                  className="px-6 py-2 rounded-full bg-black text-white font-bold hover:bg-gray-800 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- Main Content --- */}
        <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Menu */}
          <aside className="w-full md:w-64">
            <h1 className="mb-6"></h1>
            <nav className="space-y-1">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'profile' ? 'bg-white shadow-sm text-white' : 'text-gray-500 hover:text-black'}`}
              >
                <User size={18} /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === 'password' ? 'bg-white shadow-sm text-white' : 'text-gray-500 hover:text-black'}`}
              >
                <Lock size={18} /> Reset password
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="flex-1">
            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100 min-h-[600px]">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-10">
                <img src={user.image} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                <h2 className="text-xl font-bold text-gray-900">{user.name} <span className="text-gray-400 mx-2">|</span> {activeTab === 'profile' ? 'Profile' : 'Reset password'}</h2>
              </div>

              {/* --- TAB: Profile --- */}
              {activeTab === 'profile' && (
                <div className="max-w-md animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative group cursor-pointer">
                      <img src={user.image} alt="Upload" className="w-24 h-24 rounded-full object-cover border-4 border-gray-50 shadow-sm" />
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <Camera className="text-white" size={24} />
                      </div>
                    </div>
                    <button className="px-6 py-2 border border-gray-200 rounded-full text-sm font-bold text-white hover:border-black hover:text-gray-600 transition-all">
                      upload profile picture
                    </button>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">Name</label>
                      <input 
                        type="text" 
                        value={user.name} 
                        onChange={(e) => setUser({...user, name: e.target.value})}
                        className="w-full px-6 py-3 rounded-2xl border text-black border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">Username</label>
                      <input 
                        type="text" 
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        className="w-full px-6 py-3 rounded-2xl border text-black border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">Email</label>
                      <input 
                        type="email" 
                        value={user.email}
                        readOnly //ไม่ให้แก้ได้ง่ายๆ
                        className="w-full px-6 py-3 rounded-2xl border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed" 
                      />
                    </div>

                    <div className="pt-4">
                      <button 
                        onClick={handleSaveProfile}
                        className="px-10 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB: Reset Password --- */}
              {activeTab === 'password' && (
                <div className="max-w-md animate-in fade-in slide-in-from-bottom-2">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">Current password</label>
                      <input 
                        type="password" placeholder="••••••••"
                        className="w-full px-6 py-3 rounded-2xl border text-black border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all" 
                      />
                    </div>
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">New password</label>
                      <input 
                        type="password" placeholder="••••••••"
                        className="w-full px-6 py-3 rounded-2xl border text-black border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-4">Confirm new password</label>
                      <input 
                        type="password" placeholder="••••••••"
                        className="w-full px-6 py-3 rounded-2xl border text-black border-gray-200 bg-gray-50/50 focus:bg-white focus:border-emerald-500 outline-none transition-all" 
                      />
                    </div>

                    <div className="pt-6">
                      <button 
                        onClick={handleResetPasswordClick}
                        className="px-10 py-3 bg-black text-white rounded-full font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all transform hover:-translate-y-1"
                      >
                        Reset password
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;