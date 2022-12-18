import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import { useContext } from 'react'
import UserContext from '../../components/UserContext.js'
import { useRouter } from 'next/router.js'
import { redirect } from 'next/dist/server/api-utils/index.js'
import CommentList from '../../components/CommentList.js'



export default function Article({
  article, comments
}) {

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [file, setFile] = useState()


  const [commentModal, setCommentModal] = useState(false);
  const a = 1

  const [articleTitle, setArticleTitle] = useState(article.title)
  const [articleContent, setArticleContent] = useState(article.content)

  const [title, setTitle] = useState('')
  const {user, logout, loading} = useContext(UserContext)
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState(null)

  const router = useRouter()


  const handleSubmit = async (e) => {

    const articleID = article.id
    let authorID;
    let authorName;
    if (user) {
      authorName = user.email
    }
    else {
      authorName = "Unknown"
    }

    if (user) {
      authorID = user.id
      console.log("authorID : ", authorID)
    }
    else {
      authorID = null
    }

    e.preventDefault()

    if (!title || !content) {
      setFormError("Please fill all of the fields")
      return
    }

    const { data, error } = await supabase
      .from("comments")
      .insert({ title, authorName, content, articleID, authorID })

    if (error) {
      console.log("Error happened : ", error)
    }
    else {
      console.log("Data :", data)
      setFormError(null)
      window.location.reload(false)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if(!articleTitle || !articleContent){
        setFormError("Please fill all of the fields")
        return
    }

    const { data, error } = await supabase
        .from("article")
        .update({content: articleContent, title: articleTitle})
        .eq('id', article.id)

    if (error){ 
        console.log("Error happened")
    }
    else{ 
        console.log("Data :", data)
        setFormError(null)
        setEditModal(false)
       // window.location.reload(false)
    }

    if(file){ 
      uploadImage(article.id)
    }
  }

  async function uploadImage(articleID){ 
    console.log("file id: ", file )
    let { data, error } = await supabase
      .storage
      .from("test")
      .update("articles/"+articleID, file, {
    cacheControl: '3600',
    upsert: false
  })

    if(!error){
      window.location.reload(false)
    }
    else{
      console.log("error upload")
      createImage(articleID)
    }
  }

  async function createImage(articleID){ 
    let {data, error} = await supabase
      .storage
      .from("test")
      .upload("articles/"+articleID, file)

    if(error){
      console.log("error: ", error)
    }

  }

 
  function MyTest({commentUserID}){
    const user = useContext(UserContext)

    return (
      <div>
      <button
          className="bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setEditModal(true)}
        >
          Edit the article
        </button>
        <button
          className="bg-red-500 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setEditModal(true)}
        >
          Delete the article
        </button>
      </div>
    )
   
    
  }


  return (
    <Layout>

      <Head>
        <title>WebTech - {article.title}</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className='text-4xl flex justify-center py-9  bg-slate-300'>
       
     

      <figure class="mx-auto max-w-screen-md text-center">
        <svg aria-hidden="true" class="mx-auto mb-3 w-12 h-12 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" /></svg>
        <blockquote>
          <p className='text-2xl italic font-medium text-gray-900 dark:text-white bg-slate-300'>
            {article.content}
          </p>
        </blockquote>
        <figcaption class="flex justify-center items-center mt-6 space-x-3">
          <img class="w-6 h-6 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png" alt="profile picture"></img>
          <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite class="pr-3 font-medium text-gray-900 dark:text-white"> {article.title}</cite>
            <cite class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400"> {article.author}</cite>
          </div>
        </figcaption>
      </figure>
 </h1>

      <div className='flex py-9 bg-slate-300 justify-end'>
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 bg-slate-400"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add a new comment
        </button>
        <MyTest></MyTest>
      </div>
      

      {showModal ? (
        <>
          <form onSubmit={handleSubmit}>
            <div
              className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none  bg-slate-300"
            >
              <div className="relative my-6 max-w-3xl w-3/4">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Add a new comment
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
                        onChange={(e) => setContent(e.target.value)} />
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

      {editModal ? (
        <>
        <form onSubmit={handleUpdate}>
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
                    onClick={() => setEditModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-4">
            <div className="my-3">
            
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Change the picture of your article</label>
          <input onChange={(e) => setFile(e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>

            </div>
            <div class="w-1/2 mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
                <input 
                    type="text" 
                    id="title" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-1"
                    value={articleTitle}
                    onChange={(e) => setArticleTitle(e.target.value)}
                    />
            </div>
            
            <div>
              
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <input 
                    type="text" 
                    id="content" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-1/2"
                    value={articleContent}
                    onChange={(e) => setArticleContent(e.target.value)}/>
            </div>
            
            {formError && <p className='error'>{formError}</p>}
        </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                    //onClick={() => setShowModal(false)}
                  >
                    Edit the article
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <CommentList comments={comments} user={user}/>

    </Layout>
  )
}



export async function getStaticProps(ctx) {
  let article = {}
  console.log("GETPROPS")
  let { data, error } = await supabase
    .from('article')
    .select()
    .eq('id', ctx.params.id)
    .single()
  if (!error) {
    article = data // handle errors
  }
  console.log("arti: ", data)
  let comments = []
  data = await supabase
    .from('comments')
    .select()
    .eq('articleID', ctx.params.id)
  if (!error) {
    comments = data.data // handle errors
  }

  console.log("Datacom: ", data.data)

  return {
    props: {
      article: article,
      comments: comments
    }
  };

}

export async function getStaticPaths(ctx) {
  let articles = []
  let { data, error, status } = await supabase
    .from('article')
    .select(`id`)
  if (!error) articles = data // handle errors
  return {
    paths: articles.map(article => `/articles/${article.id}`),
    fallback: false
  };
}
