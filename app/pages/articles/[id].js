import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase'

export default function Article({
  article
}) {
  return (
    <Layout>
      <Head>
        <title>WebTech - {article.title}</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='text-4xl'>
        {article.title}
      </h1>
      
      <p>
        {article.content}
      </p>
    </Layout>
  )
}

export async function getStaticProps(ctx) {
  let article = {}
  console.log("GETPROPS")
  let { data, error, status } = await supabase
    .from('article')
    .select()
    .eq('id', ctx.params.id)
    .single()
  if (!error) article = data // handle errors
  return {
    props: {
      article: article
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
    paths: articles.map( article => `/articles/${article.id}`),
    fallback: false
  };
}
