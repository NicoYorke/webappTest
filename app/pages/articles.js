import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import UserContext from '../components/UserContext'
import { useContext, useEffect } from 'react'


export async function getStaticProps(ctx) {
  let articles = []
  let { data, error, status } = await supabase
    .from('article')
    .select()
  if (!error) articles = data // handle errors
  return {
    props: {
      articles: articles
    }
  };
}



export default function Articles({articles}) {

  return (
    <Layout>
      <Head>
        <title>WebTech - articles</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16" style={{ backgroundImage: `url(${"images/image2.jpeg"})` }}>
      <h1 className='text-black text-5xl m-0 leading-tight'>
        Web technologies articles
      </h1>
      <div class="grid my-0 mx-auto px-0 py-10 grid grid-cols-3 gap-4">
          {articles.map(art =>
          <div key={art.id} class="my-0 mx-5 px-0 py-10">
            <div class="mx-auto">
              <div class="rounded-lg shadow-lg bg-white">
                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                </a>
                
                <div class="p-6 transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 hover:bg-blue-100 duration-50">
                  <h5 class="text-gray-900 text-xl font-medium mb-2" gutterBottom variant="h5" component="div"><Link href={`/articles/${art.id}`}>{art.title}</Link></h5>
                  <p class="text-gray-700 text-base mb-4" variant="body2" color="text.secondary">
                    {art.author}
                  </p>
                  <a style={{ "justify-content": "center" }}
                     href={"/articles/" + art.id} size="small">voir plus
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        </div>
        </main>
        <MyTest></MyTest>
    </Layout>
  )
}

function MyTest(){
  
  const { user, logout, loading } = useContext(UserContext)

  if(user){ 
    return (
      <button type="button" class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><Link href="/addarticle">Add an article</Link></button>
    )
  }
  else{ 
    return null
  }
}


