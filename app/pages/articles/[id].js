import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import { useContext } from 'react'
import UserContext from '../../components/UserContext.js'
import { useRouter } from 'next/router.js'
import { redirect } from 'next/dist/server/api-utils/index.js'
import CommentList from '../../components/CommentList.js'
import Gravatar from 'react-gravatar'
import { SupabaseClient } from '@supabase/supabase-js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link.js'



export default function Article({
  article, comments
}) {

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const supabaseClient = useSupabaseClient()

  const [file, setFile] = useState()
  
  const [commentModal, setCommentModal] = useState(false);
  const a = 1

  const [articleTitle, setArticleTitle] = useState(article.title)
  const [articleContent, setArticleContent] = useState(article.content)

  const [title, setTitle] = useState('')
  const {user, logout, loading} = useContext(UserContext)
  const [content, setContent] = useState('')
  const [nbLikes, setNbLikes] = useState(0)
  const [nbDislikes, setNbDislikes] = useState(0)
  const [liked, setLiked] = useState(false)
  
  const [formError, setFormError] = useState(null)

  const router = useRouter()


  useEffect(() =>{
    
    console.log("run a lot")
    async function fetchReactions(){ 
      let {count, error } = await supabaseClient
      .from('reactions')
      .select('*', { count: 'exact' })
      .eq("article_id", article.id)
      .eq("type", 'like')


      if(count){ 
        console.log("nbLikes: ", count)
        setNbLikes(count)
      }
      else{
        console.log("error: ", error)
      }

      count = await supabaseClient
        .from('reactions')
        .select('*', { count: 'exact' })
        .eq("article_id", article.id)
        .eq("author_id", article.author_id)

      console.log("count of liked : ", count.count)

      if(count.count == 1){
        setLiked(true)
      }

      else if(count.count == 0){
        setLiked(false)
      }
    
     
    }
    fetchReactions()
  }, [])

  const handleSubmit = async (e) => {

    let article_id = article.id
    let author_id, authorName, authorEmail
    if (user) {
      authorName = user.email
      authorEmail = user.email
    }
    else {
      authorName = "Unknown"
      authorEmail = null
    }

    if (user) {
      author_id = user.id
      console.log("author_id : ", author_id)
    }
    else {
      author_id = null
    }

    e.preventDefault()

    if (!title || !content) {
      setFormError("Please fill all of the fields")
      return
    }

    const { data, error } = await supabaseClient
      .from("comments")
      .insert({ title, authorName, content, article_id, author_id, authorEmail })

    if (error) {
      console.log("Error happened : ", error)
    }
    else {
      console.log("Data :", data)
      setFormError(null)
      window.location.reload(false)
    }

    if(file){ 
      uploadImage(article.id)
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    
    if(!articleTitle || !articleContent){
        setFormError("Please fill all of the fields")
        return
    }

    const { data, error } = await supabaseClient
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

  const deleteSubmit = async (e) => { 
    e.preventDefault()
    
    let { error } = await supabaseClient
        .from("comments")
        .delete()
        .eq('article_id', article.id)

    error = await supabaseClient
      .from('reactions')
      .delete()
      .eq("article_id", article.id)


    error = await supabaseClient
      .from("article")
      .delete()
      .eq("id", article.id)
    
    router.push('/articles')
    
  }

  async function uploadImage(article_id){ 
    console.log("file id: ", file )
    let { data, error } = await supabaseClient
      .storage
      .from("test")
      .update("articles/"+article_id, file, {
    cacheControl: '3600',
    upsert: false
  })

    if(!error){
      window.location.reload(false)
    }
    else{
      console.log("error upload")
      createImage(article_id)
    }
  }

  async function createImage(article_id){ 
    let {data, error} = await supabase
      .storage
      .from("test")
      .upload("articles/"+article_id, file)

    if(error){
      console.log("error: ", error)
    }

  }

  async function react(reaction){

    let article_id = article.id
    let author_id = article.author_id
    
    if(reaction == "like"){ 
      let type = "like"
      setNbLikes(nbLikes+1)
      setLiked(true)
      const {data, error} = await supabaseClient
        .from("reactions")
        .insert( { "type": "like", 'article_id': article_id, "author_id": author_id } )

      if(data){ 
        console.log(data)
      }
      else{ 
        console.log(error)
      }
    }

    if(reaction == "unlike"){
      setNbLikes(nbLikes-1)
      setLiked(false)
      let { error } = await supabaseClient
        .from("reactions")
        .delete()
        .eq('article_id', article_id)
        .eq('author_id', author_id)
        
    }
  }

  function MyTest({commentUserID}){
    if(user){
      console.log("article_id:", commentUserID)
      console.log("actualUserID:", user.id)
    if(user.id == commentUserID){
    return (
      <div className='my-4'>
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
          onClick={() => setDeleteModal(true)}
        >
          Delete the article
        </button>
      </div>
    )}
    else{
      return(null)
    }}
   
    
  }



  function Reactions(){ 

    if(!liked){
      return (
        <div className='flex'>
          <button onClick={() => react("like")} style={{'margin': "0 auto"}} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Like ! 
          </span>
          </button>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-600 md:text-4xl lg:text-4xl dark:text-white">{nbLikes} Likes !</h1>

      </div>
      )
    }

    else{
      return (
      <div className='flex'>
        <button onClick={() => react("unlike")} style={{'margin': "0 auto"}} type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Like !</button>

        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-600 md:text-4xl lg:text-4xl dark:text-white">{nbLikes} Likes !</h1>
        </div>
      )
    }
  }


  return (
    <Layout>

      <Head>
        <title>WebTech - {article.title}</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      <div className='flex py-9 bg-slate-300'>
        <div className='w-1/3 mx-10'>
          <img className='hover:bg-black' src={`https://hisvmczmnmlimhtxqhvl.supabase.co/storage/v1/object/public/test/articles/${article.id}`} alt=""/>
        </div>

        <div className='w-2/3 flex-wrap'>

        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white text-center">{article.title}</h1>
        <h3 class="text-3xl font-bold dark:text-white text-center my-6">La suprématie de larmée Allemande sur la seconde guerre Mondiale qui s&apos;est déroulée de 1939 à 1945</h3>
            
              <figure class="mx-auto max-w-screen-md text-center">
            
                <figcaption class="flex justify-center items-center mt-6 space-x-3">

                  

                  <button class="p-2 hover:scale-105 relative inline-flex items-center justify-center mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                  <Gravatar className='rounded-3xl mx-2' email={article.author}></Gravatar>
                    <Link href={{pathname:"/profile",query:{userID:article.author_id}}} class=" px-5 py-2.5  bg-white dark:bg-gray-900 rounded-md ">
                        {article.author}
                    </Link>
                  </button>

                </figcaption>
                
                <MyTest commentUserID={article.author_id}></MyTest>
              </figure>
              
          
        </div>
      </div>
      <div className='border-solid border-2  my-5 rounded-md py-9 px-9 border-black'>
        <p class="mb-3 font-light text-gray-900 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">{article.content}</p>

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
                      Add the comment
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
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-slate-300"
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

      {deleteModal ? (
        <>
        <form onSubmit={deleteSubmit}>
          <div
            className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none  bg-slate-300"
          >
            <div className="relative my-6 max-w-3xl w-3/4">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete a comment
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDeleteModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="m-4">
                    <div class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                        <span class="font-medium">Danger !</span> Do you confirm to remove this comment ?
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  //onClick={() => setShowModal(false)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          </form>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null }

    {user ? (
      <Reactions></Reactions> 
    ) : null }
     
    
    <hr class="my-12 h-px bg-black border-2 w-3/4 mx-auto"></hr>

    

    <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-5xl dark:text-white text-center">Comments</h1>
    <div className="flex">
      <button
      style={{"margin": "0 auto"}}
            className="bg-gray-300 mx-auto text-pink active:bg-black font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={() => setShowModal(true)}
          >
            Add a new comment
      </button> 
    </div>

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
    .eq('article_id', ctx.params.id)
  if (!error) {
    comments = data.data // handle errors
  }

  console.log("Datacom: ", data.data)

  return {
    props: {
      article: article,
      comments: comments
    },
    revalidate: 10,
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
    fallback: 'blocking'
  };
}
