import { useContext, useState } from "react"
import UserContext from "./UserContext"
import { supabase } from "../pages/api/supabase"
import Gravatar from "react-gravatar"
import { useSupabaseClient } from "@supabase/auth-helpers-react"




export default function Comment({comment, user}){ 

    const supabaseClient = useSupabaseClient()

    const [showModal, setShowModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    

    const [title, setTitle] = useState(comment.title)
    const [content, setContent] = useState(comment.content)
    const [formError, setFormError] = useState(null)

    if (comment.authorEmail == null) comment.authorEmail = "unknown@unknown.com"


    const deleteSubmit = async (e) => {
        e.preventDefault()

        const {data, error} = await supabaseClient
            .from("comments")
            .delete()
            .eq("id", comment.id)

        if (error){ 
            console.log("Error happened")
        }
        else{ 
            console.log("Data :", data)
            setFormError(null)
            setShowModal(false)
            window.location.reload(false)
        }
    }

    const handleSubmit = async (e) => { 
    
        e.preventDefault()
    
        if(!title || !content){
            setFormError("Please fill all of the fields")
            return
        }
    
        const { data, error } = await supabaseClient
            .from("comments")
            .update({content: content, title: title})
            .eq('id', comment.id)
    
        if (error){ 
            console.log("Error happened")
        }
        else{ 
            console.log("Data :", data)
            setFormError(null)
            setShowModal(false)
            //window.location.reload(false)
        }
    }

    function MyTest({commentUserID}){
    
        console.log("comment user id: ", commentUserID)
        console.log("user.id: ", user)
       
        if(user){ 
          if(commentUserID == user.id){
          return (
            <div className="flex-wrap">
                <svg onClick={() => setShowModal(true)} stroke="#2f2f2f" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="my-4 mx-3 w-6 h-6 min-h-min cursor-pointer bg-green-400 rounded-md" >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                </svg>
                <svg onClick={() => setDeleteModal(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="my-4 mx-3 w-6 h-6 cursor-pointer bg-red-400 rounded-md">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>

            </div>)
        }}
        else{ 
          return null
        }
      }

    return (
        <div className='mx-5 my-5'>
          <div className="flex" >
            <Gravatar className="rounded-3xl" email={comment.authorEmail}></Gravatar>
              <label for="message" class="mb-1 mx-3 text-sm font-medium text-gray-900 dark:text-white flex items-center">{comment.authorName}</label>
          </div>
            <div className="flex">
              <textarea id="message" value={content} rows="4" class="cursor-not-allowed block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
              <MyTest commentUserID={comment.author_id}></MyTest>
            </div>
              
              
            
              <hr className="my-8 h-px w-3/4 mx-auto bg-black border-0 dark:bg-black"></hr>

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
                      Edit a comment
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
                      Save
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


        ) : null}
              
        </div>
    )
}