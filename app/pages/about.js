import Head from 'next/head'
import Layout from '../components/Layout.js'



export default function About() {
  return (
    <Layout>
      <Head>
        <title>WebTech - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    

<div class="grid grid-cols-1 md:grid-cols-2 mb-20">
<div className='px-10'>
  <h1 class="mb-10 font-extrabold tracking-tight leading-none text-gray-900 text-5xl lg:text-6xl dark:text-white text-center">Who are we ?</h1>
  
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">We are young students from ECE Paris who aim to give a voice to everyone. On Sparticles, you can create an article and share your knowledge and your passions as soon as you have an account. </p>
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">Once you have created an article, you will be able to see the feedback of other users who have read your article. Take them into consideration to improve your writing or to update your knowledge! </p>
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">As a next step, read the articles that are continuously posted and comment on the articles of other users to give them constructive feedback.</p>


</div>
<img class="rounded-lg w-full" src="/images/articles.jpg" alt="" />
 
</div>

<div class="grid grid-cols-1 md:grid-cols-2">
<img class="rounded-lg w-full" src="/images/journalism.jpg" alt="" />
<div className='px-10'>
  <h1 class="mb-10 font-extrabold tracking-tight leading-none text-gray-900 text-5xl lg:text-6xl dark:text-white text-center">How does the site work ?</h1>
  
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">On Sparticles, you can create an article only and only if you are authenticated. Once done, you can add, edit, and delete your articles.</p>
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">At Sparticles, we advocate freedom of expression within a constructive framework, without violent or hateful speech, and that's why you can read and comment on articles for free, without being authenticated.</p>
  <p class="mb-10 text-lg font-light text-gray-800 md:text-xl dark:text-gray-400">Do not hesitate to contact us if you have any concerns or questions regarding the operation of the site and its terms of use.</p>

</div>

 
</div>


    </Layout>
  )
}
