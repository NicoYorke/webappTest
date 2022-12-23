import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'



export default function Home() {
  return (
    <div>
      <Head>
        <title>WebTech</title>
        <meta name="description" content="Web technologies blogging application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <div>
        
        

        <main class="flex flex-col flex-grow min-h-screen px-0 overflow-visible">
        

          <div className="relative text-center">
          <img class="w-full" src="/images/computer3.jpg" alt=""/>
          <h1 class="absolute font-extrabold tracking-tight leading-none text-gray-100 text-5xl lg:text-6xl dark:text-white text-center w-full top-1/4">Welcome to Sparticles !</h1>
          <p class="absolute font-extrabold tracking-tight leading-none text-gray-100 text-5xl lg:text-2xl dark:text-white text-center w-full top-1/2">Give free rein to your passion and knowledge in order to share your knowledge with the whole world</p>
          
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 mb-5 p-4 gap-5">
            <div className='relative hover:scale-105 duration-50 transition ease-in-out'>
              <Link href="/articles">
              <img className='hover:bg-black' src="/images/articles.jpg" alt=""/>
              <h2 class="block top-1/2 absolute font-extrabold tracking-tight leading-none text-gray-100 text-5xl lg:text-6xl dark:text-white">Articles</h2>
              </Link>
            </div>
            <div className='relative hover:scale-105 duration-50 transition ease-in-out'>
              <Link href="/about">
              <img src="/images/computer-using.jfif" alt=""/>
                <h2 class="block top-1/2 absolute font-extrabold tracking-tight leading-none text-gray-100 text-5xl lg:text-6xl dark:text-white">About us</h2>
              </Link>
            </div>
            <div className='relative hover:scale-105 duration-50 transition ease-in-out'>
              <Link href="/contact">
              <img src="/images/happy.jpg" alt=""/>
                <h2 class="block top-1/2 absolute font-extrabold tracking-tight leading-none text-gray-100 text-5xl lg:text-6xl dark:text-white">Contact us</h2>
              </Link>
            </div>
          </div>
          <iframe className='w-full h-96 my-5'  marginheight="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=37%20Quai%20de%20Grenelle%20PARIS%2015+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>

        </main>
        <Footer></Footer>
      </div>
    </div>
  )
}
