import { useState, useEffect } from 'react';
import axios from 'axios';

// ดึงค่า URL จาก .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function DebugPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Testing connection to:", `${API_BASE_URL}/posts`);
        const response = await axios.get(`${API_BASE_URL}/posts`);
        
        console.log("Response received:", response);
        setData(response.data); // เก็บข้อมูลดิบๆ
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message + (err.response ? ` - ${JSON.stringify(err.response.data)}` : ''));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white font-mono">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">🛠️ Debug Page</h1>
      
      {/* 1. เช็ค URL */}
      <div className="mb-6 p-4 border border-gray-700 rounded bg-gray-800">
        <h2 className="text-xl font-bold mb-2">1. Environment Check</h2>
        <p>VITE_API_BASE_URL: <span className="text-green-400">{API_BASE_URL}</span></p>
        <p className="text-sm text-gray-400 mt-1">(ต้องเป็น https://express-profile-apitarn.vercel.app หรือ localhost:4001)</p>
      </div>

      {/* 2. ผลลัพธ์ข้อมูล */}
      <div className="p-4 border border-gray-700 rounded bg-gray-800 overflow-auto">
        <h2 className="text-xl font-bold mb-4">2. API Response (/posts)</h2>
        
        {loading && <p className="text-blue-400 animate-pulse">Running request...</p>}
        
        {error && (
          <div className="p-4 bg-red-900/50 text-red-200 border border-red-500 rounded">
            ❌ Error: {error}
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div className="flex gap-4">
               <span className="px-2 py-1 bg-blue-600 rounded text-xs">Status: 200 OK</span>
               <span className="px-2 py-1 bg-purple-600 rounded text-xs">
                 Count: {Array.isArray(data) ? data.length : (Array.isArray(data.data) ? data.data.length : 'Unknown')} items
               </span>
            </div>
            
            {/* โชว์ JSON ดิบๆ */}
            <pre className="text-xs text-green-300 bg-black p-4 rounded overflow-x-auto border border-green-900">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-center">
         <a href="/" className="text-white underline hover:text-yellow-400">← กลับหน้าหลัก</a>
      </div>
    </div>
  );
}

export default DebugPage;