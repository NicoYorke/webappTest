import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../components/Layout.js'
import UserContext from '../components/UserContext'
import Gravatar from 'react-gravatar'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import ArticlesProfile from '../components/ArticlesProfile.js'
import CommentsProfile from '../components/CommentsProfile.js'




export default function Contact(actualUser) {
  const { user, logout, loading } = useContext(UserContext)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()

      
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  
  useEffect(() => {
    
    if (!(user || loading)) {
      router.push('/login')
    }
    else{ 
      getActualUser();
    }

  }, [user, loading, router])


  async function getActualUser(){
    
    if(router.query.userID){
      const {data, error, status} = await supabaseClient
      .from("profiles")
      .select()
      .eq("id", router.query.userID)
      .single()


      if(data){ 
        console.log("data: ",data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(user.email)
        setUsername(data.username)
      }
      else{ 
        console.log("error:", error)
      }
    }
    else if(user){
      const {data, error, status} = await supabaseClient
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single()


      if(data){ 
        console.log("data: ",data)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(user.email)
        setUsername(data.username)
      }
      else{ 
        console.log("error:", error)
      }
    }
  }

  
  const handleSubmit = async (e) => {

    e.preventDefault();

    console.log("handle entered")
    const { data, error } = await supabaseClient
    .from('profiles')
    .update({ first_name: firstName, last_name: lastName, username: username })
    .match({ id: user.id })


    console.log("email:", email)
    //updateUser()
  }

  async function updateUser(){
    console.log("update entered")
    const {user_, error_}  = await supabaseClient
      .updateUser({email: email})

    if(error_){ 
      console.log(error_)
    }
    if(user_){ 
      console.log("user updated !")
    }
  }

  const onClickLogout = function() {
    logout()
  }


if(!router.query.userID){
  return (
    <Layout>
      <Head>
        <title>WebTech - user signedin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { !(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
         <p>{JSON.stringify(user.email)}</p>
          <button
            className="rounded px-3 py-2 text-white bg-slate-500 hover:bg-blue-500"
            onClick={onClickLogout}
          >
            Logout
          </button>
        <main className='p-5 bg-slate-300'>
      <div className='flex'>
        <div className='w-1/4 bg-white p-7 rounded-xl text-center'>
            <Gravatar className="items-center inline-block rounded-lg" email={user.email} size={150}></Gravatar>
            <p className='font-bold my-4'>{firstName} {lastName}</p>
            <p className='my-3 text-blue-600'>@{username}</p>
        </div>

          <div className='w-3/4 mx-3 bg-white p-7 rounded-xl'>
            <form onSubmit={handleSubmit}>
              <div class="relative z-0 mb-4 w-full group">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="floating_email" id="floating_email" class="cursor-not-allowed block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " disabled />
                  <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
              </div>
              
              
              
                <div class="relative z-0 mb-2 w-full group">
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" class=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                </div>
                
                <div class="relative z-0 mb-2 w-full group">
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                
              </div>
              <div class="relative z-0 mb-2 w-full group">
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                </div>
              
              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
          </div>
        </div>
        <div className='flex my-3 h-96'>
          <div className='w-1/3 bg-white p-5 rounded-xl'>
            <ul class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="py-5 px-2 h-1/5 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">Twitter
            </li>
              <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">Instagram</li>
              <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">Facebook</li>
              <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">LinkedIn</li>
              <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">GitHub</li>
            </ul>
          </div> 
        <div className='w-1/3 mx-3 bg-white p-3 rounded-xl text-center max-h-screen overflow-y-auto'>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">My articles</h1>
            <ArticlesProfile userID={user.id}></ArticlesProfile>
        </div>
        <div className='w-1/3 mx-3 bg-white p-3 rounded-xl max-h-screen overflow-y-auto'>
          <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white text-center">My comments</h1>
          <CommentsProfile userID={user.id}></CommentsProfile>
        </div>
          
        </div>

       </main>

          
        </>
      }
    </Layout>
  )}

  else{ 
    return (
      <Layout>
      <Head>
        <title>WebTech - user signedin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { !(user || loading) ?
        <p>Redirecting...</p>
        :
        <>
        <main className='p-5 bg-slate-300'>
      <div className='flex'>
        <div className='w-1/4 bg-white p-7 rounded-xl text-center'>
            <Gravatar className="items-center inline-block rounded-lg" email={user.email} size={150}></Gravatar>
            <p>{firstName} {lastName}</p>
            <p className='my-3'>@{username}</p>
        </div>

          <div className='w-3/4 mx-3 bg-white p-7 rounded-xl'>
              <div class="relative z-0 mb-2 w-full group">
                <label for="floating_email">First Name</label>
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={firstName} disabled></input>
              </div>
              <div class="relative z-0 mb-2 w-full group">
              <label for="floating_email">Last name</label>
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={lastName} disabled></input>
              </div>
              <div class="relative z-0 mb-2 w-full group">
                <label for="floating_email">Username</label>                
                <input type="text" id="disabled-input" aria-label="disabled input" class="mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} disabled></input>
              </div>            
          </div>
        </div>
        <div className='flex my-3'>
        <div className='w-1/3 bg-white p-5 rounded-xl'>
          <ul class="w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li class="py-5 px-2 h-1/5 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600">Twitter
           </li>
            <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">Instagram</li>
            <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">Facebook</li>
            <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">LinkedIn</li>
            <li class="py-5 px-2 w-full border-b border-gray-200 dark:border-gray-600">GitHub</li>
          </ul>
        </div> 
        <div className='w-1/3 mx-3 bg-white p-3 rounded-xl text-center max-h-screen overflow-y-auto'>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Articles</h1>

            <ArticlesProfile userID={router.query.userID}></ArticlesProfile>
            
        </div>

        <div className='w-1/3 mx-3 bg-white p-3 rounded-xl max-h-screen overflow-y-auto'>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-2xl dark:text-white">Comments</h1>

            <CommentsProfile userID={router.query.userID}></CommentsProfile>
            
        </div>
          
        </div>

       </main>
        </>
      }
    </Layout>
    )
  }
}
