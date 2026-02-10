import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

// ดึง URL จาก .env ตาม TODO 5
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function HealthTestPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testHealth = async () => {
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      // ยิงไปที่ /health ของ Backend
      const res = await axios.get(`${API_BASE_URL}/health`);
      setResult(res.data);
    } catch (err: any) {
      setError({
        message: err.message,
        response: err.response?.data
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Health Check Test</h1>

        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
          <p className="text-gray-400 mb-4">Target API: <span className="text-emerald-400">{API_BASE_URL}</span></p>

          <button 
            onClick={testHealth}
            disabled={loading}
            className={`px-8 py-3 rounded-full font-bold transition-all ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-500'}`}
          >
            {loading ? "Testing..." : "Test Connection /health"}
          </button>

          {/* ส่วนแสดงผลลัพธ์ */}
          {result && (
            <div className="mt-6 p-4 bg-gray-700 rounded-lg text-left overflow-auto">
              <h3 className="text-emerald-400 font-bold mb-2">✅ Success Result:</h3>
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 rounded-lg text-left overflow-auto border border-red-500">
              <h3 className="text-red-400 font-bold mb-2">❌ Error:</h3>
              <pre className="text-sm">{JSON.stringify(error, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HealthTestPage;