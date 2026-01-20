import { useParams } from 'react-router-dom';
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';

function ArticleDetail() {
  const { id } = useParams(); 

  
  const articleData = {
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    author: "Thompson P.",
    date: "11 September 2024",
    image: "/project-w-1.jpg", // หรือตาม ID ที่ส่งมา
    content: "Cats have captivated human hearts for thousands of years..."
  };

  return (
    <>
      <Navbar />
      <div className="max-w-[1000px] mx-auto px-6 py-10">
        {/* รูปหน้าปกขนาดใหญ่ */}
        <img 
          src={articleData.image} 
          className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl shadow-lg mb-8" 
          alt="Cover" 
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* ส่วนเนื้อหา (ฝั่งซ้าย) */}
          <div className="lg:w-2/3">
            <span className="text-emerald-500 font-bold">Cat • {articleData.date}</span>
            <h1 className="text-4xl font-bold mt-4 mb-6">{articleData.title}</h1>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>{articleData.content}</p>
              <h2 className="text-2xl font-bold pt-4">1. Independent Yet Affectionate</h2>
              <p>One of the most remarkable traits of cats is their balance between independence and affection...</p>
            </div>
          </div>

          {/* ส่วนผู้เขียน (ฝั่งขวา/Sidebar) */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-6 rounded-2xl sticky top-24">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">👤</div>
                <div>
                  <p className="text-xs text-gray-400">Author</p>
                  <p className="font-bold">{articleData.author}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                I am a pet enthusiast and freelance writer who specializes in animal behavior and care.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ArticleDetail;