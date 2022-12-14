import Head from 'next/head'
import Layout from '../components/Layout.js'
import { useState, useEffect, useSyncExternalStore } from 'react';
import { supabase } from './api/supabase';
import { useRouter } from 'next/router'

export default function Addarticle() {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [formError, setFormError] = useState(null)

    const router = useRouter()

    const handleSubmit = async (e) => { 
        e.preventDefault()

        if(!title || !author){
            setFormError("Please fill all of the fields")
            return
        }

        const { data, error } = await supabase
            .from("article")
            .insert([{title, author}])

        if (error){ 
            console.log("Error happened")
        }
        else{ 
            console.log("Data :", data)
            setFormError(null)
            router.push('/articles')
        }
    }

    
  return (
    <Layout>
      <Head>
        <title>WebTech - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='wt-title'>
        Add Article
      </h1>
      <p>
        We are going to add an article
      </p>
      <form onSubmit={handleSubmit}>
        <div className="ml-60 mr-60">
            <div class="w-1/2 mb-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">title</label>
                <input 
                    type="text" 
                    id="title" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
            </div>
            <div class="mb-6">
                <label for="author" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                <input 
                    type="text" 
                    id="author" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    />
            </div>
            <div>
                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <input 
                    type="text" 
                    id="content" 
                    class="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            </div>
            <button>Save</button>
            {formError && <p className='error'>{formError}</p>}
        </div>
    </form>

    </Layout>
  )
}
