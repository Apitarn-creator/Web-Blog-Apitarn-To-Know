import { useState } from 'react';
import { 
  MessageSquare,
  UserPlus,
  Info,
  Check,
  Trash2,
  Clock,
  Bell
} from 'lucide-react';

function NotificationPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'comment', title: 'New comment on "The Art of Mindfulness"', message: 'User @johndoe commented: "Great article!"', time: '2 mins ago', isRead: false },
    { id: 2, type: 'user', title: 'New user registration', message: 'Welcome "Sarah Connor"', time: '1 hour ago', isRead: false },
    { id: 3, type: 'system', title: 'System Update', message: 'Version 2.0.1 updated.', time: '1 day ago', isRead: true },
    { id: 4, type: 'comment', title: 'New comment on "React 19"', message: 'User @dev_master commented...', time: '2 days ago', isRead: true },
  ]);

  const markAllAsRead = () => setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  const deleteNotification = (id: number) => setNotifications(notifications.filter(n => n.id !== id));

  return (
    <div className="p-8 lg:p-12 relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 text-sm mt-1">แจ้งเตือนล่าสุดทั้งหมดของคุณ</p>
        </div>
        <button onClick={markAllAsRead} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-2 hover:bg-emerald-50 px-4 py-2 rounded-full transition-all">
          <Check size={16} /> Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
              <Bell size={48} className="mb-4 opacity-20" />
              <p>ไม่มีการแจ้งเตือนในขณะนี้</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notifications.map((item) => (
              <div key={item.id} className={`p-6 flex gap-5 hover:bg-gray-50 transition-colors group ${!item.isRead ? 'bg-blue-50/30' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.type === 'comment' ? 'bg-blue-100 text-blue-600' : item.type === 'user' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                  {item.type === 'comment' && <MessageSquare size={20} />}
                  {item.type === 'user' && <UserPlus size={20} />}
                  {item.type === 'system' && <Info size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                      <h4 className={`text-base ${!item.isRead ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                          {item.title}
                          {!item.isRead && <span className="ml-2 inline-block w-2 h-2 bg-rose-500 rounded-full"></span>}
                      </h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2">{item.message}</p>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-xs font-bold text-gray-400 hover:text-black">View details</button>
                      <button onClick={() => deleteNotification(item.id)} className="text-xs font-bold text-gray-400 hover:text-rose-600 flex items-center gap-1"><Trash2 size={12} /> Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default NotificationPage;