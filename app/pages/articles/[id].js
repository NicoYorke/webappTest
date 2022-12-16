import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'
import { useContext } from 'react'
import UserContext from '../../components/UserContext'
import { useRouter } from 'next/router.js'
import { redirect } from 'next/dist/server/api-utils/index.js'




export default function Article({
  article, comments
}) {

  const [showModal, setShowModal] = useState(false);
  const { user, logout, loading } = useContext(UserContext)

  const [title, setTitle] = useState('')
  let authorName
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState(null)

  const router = useRouter()


  const handleSubmit = async (e) => {

    const articleID = article.id
    let authorID;
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

      <div className='flex justify-center py-9  bg-slate-300'>
        <button
          className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150  bg-slate-300"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add a new comment
        </button>
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

      {comments.map(comment =>
        <div className='mx-5 my-5'>

          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{comment.authorName} </label>
          <textarea id="message" value={comment.content} rows="4" class="cursor-not-allowed block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
          </svg>
          <hr className="my-8 h-px w-3/4 mx-auto bg-black border-0 dark:bg-black"></hr>
        </div>

      )}

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
  console.log("GETPATHS")
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
