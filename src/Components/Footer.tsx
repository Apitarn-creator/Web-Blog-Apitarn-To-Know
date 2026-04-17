import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-[#f5f5f5] px-6 md:px-20 py-6 border-t border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* ฝั่งซ้าย: Get in touch + Social Icons */}
        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-medium">Get in touch</span>
          <div className="flex gap-4 text-xl text-gray-700">
            <a href="https://www.linkedin.com/in/apitarnare/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://github.com/Apitarn-creator" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="mailto:workapitarn@gmail.com" className="hover:text-black transition-colors">
              <i className="fa-brands fa-google"></i>
            </a>
          </div>
        </div>

        {/* ฝั่งขวา: Home page link */}
        <div>
          <Link 
            to="/" 
            className="text-gray-800 font-medium underline underline-offset-4 hover:text-black transition-all"
          >
            Home page
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
