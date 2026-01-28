import { Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <h1 className="text-9xl font-black text-emerald-600">404</h1>
        <p className="text-2xl font-bold text-gray-800 mt-4">ไม่พบหน้าที่คุณต้องการ</p>
        <Link to="/" className="mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all">
          กลับหน้าหลัก
        </Link>
      </div>
      <Footer />
    </div>
  );
}
export default NotFound;