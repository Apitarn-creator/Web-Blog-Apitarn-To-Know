import ArticleSection from './ArticleSection';

function Body() {
 
  return (
    <main className="bg-[#f9f9f9] px-[5%] py-4 font-sans">
      {/*  Hero Section --- */}
      <section className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 p-6 lg:p-12 mb-8 bg-white rounded-xl">
        <div className="hero-left text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-black">
          Digital Creator <br/>Explore Ideas<br/> Approachable
          </h1>
          <p className="text-gray-600 text-lg mt-4">"As a Digital Creator..."</p>
        </div>
        
        <div className="hero-center order-1 lg:order-2">
          <img src="1765001739069.jpg" alt="Apitarn" className="w-full max-w-[550px] aspect-4/5 object-cover rounded-[20px] shadow-sm" />
        </div>

        <div className="hero-right text-center lg:text-left order-3">
          <span className="text-gray-400 text-xl">- Author</span>
          <h3 className="text-black text-2xl lg:text-4xl font-bold">Apitarn P.</h3>
        </div>
      </section>

      <ArticleSection />
    </main>
  );
}

export default Body;