function Body() {
    
    const articles = [
      { id: 1, title: 'Understanding Cat Behavior...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
      { id: 2, title: 'The Fascinating World of Cats...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
      { id: 3, title: 'Finding Motivation...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
      { id: 4, title: 'The Science of the Cat\'s Purr...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
      { id: 5, title: 'Unlocking Creativity...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
      { id: 6, title: 'Top 10 Health Tips...', category: 'Cat', author: 'Thompson P.', date: '11 September 2024' },
    ];
  
    return (
      <main className="bg-[#f9f9f9] px-[10%] py-8 font-sans">
        {/* --- ส่วนที่ 1: Hero Section --- */}
        <section className="flex justify-between items-center gap-8 p-12 mb-16 bg-white">
          <div className="hero-left">
            <div className="title-box">
              <h1 className="text-5xl leading-tight m-0  p-4 text-black">ระบุภายหลัง,<br/>ระบุภายหลัง, </h1>
            </div>
            <p className="text-black">ระบุภายหลัง,</p>
          </div>
          
          <div className="hero-center">
            <img src="https://via.placeholder.com/300x400" alt="Author with cat" className="w-[250px] h-[350px] object-cover rounded-[10px]" />
          </div>
  
          <div className="hero-right">
            <span className="text-black">-Author</span>
            <h3 className="text-black">Apitarn P.</h3>
            <p className="text-black">ระบุภายหลัง,</p>
          </div>
        </section>
  
        {/* --- ส่วนที่ 2: Filter & Search Bar --- */}
        <section className="filter-container">
          <h2 className="text-[1.8rem] mb-6">Latest articles</h2>
          <div className="flex justify-between bg-[#eee] p-3 rounded-[15px] mb-12 items-center">
            <div className="flex gap-2">
              <button className="bg-[#ccc] rounded-[10px] text-[#eee] px-6 py-2 border-none cursor-pointer">Highlight</button>
              <button className="bg-transparent border-none px-6 py-2 cursor-pointer text-[#eee]">Cat</button>
              <button className="bg-transparent border-none px-6 py-2 cursor-pointer text-[#eee]">Inspiration</button>
              <button className="bg-transparent border-none px-6 py-2 cursor-pointer text-[##eee]">General</button>
            </div>
            <div className="relative">
              <input type="text" placeholder="Search" className="border border-[#ccc] rounded-[20px] px-4 py-2 outline-none" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">🔍</span>
            </div>
          </div>
        </section>
  
        {/* --- ส่วนที่ 3: Article Grid --- */}
        <section className="grid grid-cols-2 gap-12">
          {articles.map((item) => (
            <article key={item.id} className="bg-transparent">
              <div className="card-image">
                 <img src="https://via.placeholder.com/400x250" alt="Cat" className="w-full rounded-[20px]" />
              </div>
              <div className="card-content">
                <span className="inline-block bg-[#d1f2eb] text-[#1abc9c] px-3 py-0.5 rounded-[15px] text-xs mt-4">{item.category}</span>
                <h3 className="my-2.5 text-xl">{item.title}</h3>
                <p className="text-[#666] text-sm leading-6">ระบุภายหลัง,..</p>
                <div className="flex justify-between text-xs text-[#999] mt-4 border-t border-[#eee] pt-4">
                  <span>👤 {item.author}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </article>
          ))}
        </section>
  
        <div className="text-center mt-16">
          <a href="#" className="underline text-black font-bold">View more</a>
        </div>
      </main>
    );
  }
export default Body;