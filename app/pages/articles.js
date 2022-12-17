import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import UserContext from '../components/UserContext'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router.js'

import ArticleList from '../components/ArticleList.js'





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


  const [showModal, setShowModal] = useState(false);
  const [art, setArt] = useState('')
  const [file, setFile] = useState()
  
  const user = useContext(UserContext)
  let author;
  let imageURL;

  const router = useRouter()

  const [title, setTitle] = useState('')
  
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => { 
    author = user.user.email
    console.log("author :", user.user.email)
    e.preventDefault()

    if(!title || !content){
        setFormError("Please fill all of the fields")
        return
    }

    let { data, error } = await supabase
        .from("article")
        .insert([{title, author, content}])
        .select()


    imageURL = data[0].id
    
    if(file)
      uploadImage(imageURL);

    if (error){ 
        console.log("Error happened")
    }
    else{ 
        console.log("Data :", data)
        setFormError(null)
        setShowModal(false)
        setTitle('')
        setContent('')
        router.push('/articles')
    }
}


  function MyTest(){
  
    const { user, logout, loading } = useContext(UserContext)
  
    if(user){ 
      return (
      <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add a new comment
        </button>    )
    }
    else{ 
      return null
    }
  }


  async function uploadImage(imageURL){ 

    console.log("file :", file)
    const {data, error} = await supabase
    .storage
    .from("test")
    .upload("articles/"+imageURL, file)
}

  

  return (
    <Layout>
      <Head>
        <title>WebTech - articles</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main class="flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16 bg-slate-300" >
      <h1 class="flex items-center text-5xl font-extrabold dark:text-white">Articles<span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">WebTech</span></h1>
      <ArticleList articles={articles}></ArticleList>
        </main>
        <MyTest></MyTest>

        {showModal ? (
        <>
        <form onSubmit={handleSubmit}>
          <div
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 max-w-3xl w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add a new Article
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-4">
            <div className="my-3">
            
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Select a picture for your article</label>
          <input onChange={(e) => setFile(e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

            </div>
            <div class="w-1/2 mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
                <input 
                    type="text" 
                    id="title" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
            </div>
            
            <div>
              
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <input 
                    type="text" 
                    id="content" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-1/2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}/>
            </div>
            
            {formError && <p className='error'>{formError}</p>}
        </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    //onClick={() => setShowModal(false)}
                  >
                    Add the article
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
        
        
    </Layout>
  )
}



