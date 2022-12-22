import Link from 'next/link'
import { useState } from 'react'
import Article from './Article'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'






export default function ArticlesProfile({userID}){ 

    const [articles, setArticles] = useState([])

    const supabaseClient = useSupabaseClient()

    useEffect(() =>{
    
        console.log("run a lot")
        async function fetchArticles(){ 
          const { data, error } = await supabaseClient.from('article').select().eq("author_id", userID)
          if(error) console.log(error)
          setArticles(data)
        }
        fetchArticles()
      }, [])
    
    return (
        <div>
          {articles.map(art =>
          <div class="border-solid border-2 rounded-lg my-3 border-black p-2 delay-10 hover:scale-105 duration-50 transition ease-in-out hover:cursor-pointer hover:underline">
            <p className='font-serif'><Link href={`/articles/${art.id}`}>{art.title}</Link></p>
            </div>
        )}
      </div>
    )
}
