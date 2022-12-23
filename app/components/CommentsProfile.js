import Link from 'next/link'
import { useState } from 'react'
import Article from './Article'
import { useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'


export default function CommentsProfile({userID}){ 

    const [comments, setComments] = useState([])

    const supabaseClient = useSupabaseClient()

    useEffect(() =>{
    
        console.log("run a lot")
        async function fetchComments(){ 
          const { data, error } = await supabaseClient.from('comments').select().eq("author_id", userID)
          if(error) console.log(error)
          setComments(data)
        }
        fetchComments()
      }, [])
    
    return (
        <div>
          {comments.map(comment =>
          <div key={comment.id} class="hover:underline">
            <p className='font-serif'><Link href={`/articles/${comment.article_id}`}>{comment.content}</Link></p>
            
                <hr className="my-2 h-px w-3/4 mx-auto bg-black border-0 dark:bg-black"></hr>

            </div>
            
        )}
      </div>
    )
}
