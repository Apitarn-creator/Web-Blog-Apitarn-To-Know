function Navbar() {
    return (
        <nav className="bg-white px-8 py-4 flex justify-between items-center border-b border-[#eee]">
        <div className="text-2xl font-bold text-[#333]">
          Apitarn<span className="text-black">.</span>
        </div>

        <ul className="list-none flex gap-4 m-0 p-0 items-center">
          <li><a href="/login" className="no-underline px-6 py-2 rounded-[25px] font-medium transition-all duration-300 text-sm text-[#333] border border-[#ccc] hover:bg-[#f5f5f5]">Log in</a></li>
          <li><a href="/signup" className="no-underline px-6 py-2 rounded-[25px] font-medium transition-all duration-300 text-sm bg-[#222] text-white hover:bg-black">Sign up</a></li>
        </ul>
      </nav>
    );
  }
  
  export default Navbar;