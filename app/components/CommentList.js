import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from './Layout'
import { supabase } from '../pages/api/supabase'
import Comment from './Comment'





export default function CommentList({comments, user}){ 

    
    return (
        <div className='py-10 px-10 min-h-screen max-w-full md:mx-auto'>
        {comments.map(comment =>
            <Comment key={comment.id} comment={comment} user={user} />
    
          )}
        </div>
    )
}
