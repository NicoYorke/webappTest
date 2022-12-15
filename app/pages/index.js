import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>WebTech</title>
        <meta name="description" content="Web technologies blogging application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main class="flex flex-col items-center justify-center flex-grow min-h-screen px-0 py-16" style={{ backgroundImage: `url(${"images/image1.png"})` }}>
          <h1 class="overline text-white text-6xl m-0 absolute top-28 leading-tight">
            Welcome to <a href="https://www.adaltas.com">web technologies!</a>
          </h1>

          <div class="flex flex-wrap items-center justify-centergrid my-0 mx-auto px-0 py-10 grid grid-cols-3 gap-4">


            <div class="rounded-lg shadow-lg bg-red transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100">
              <a href="" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="" alt="" />
              </a>
              <div class="p-6">
                <li>
                  <Link href="/about">
                    A propos de nous
                  </Link>
                </li>
              </div>
            </div>


            <div class="rounded-lg shadow-lg bg-red transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100">
              <a href="" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="" alt="" />
              </a>
              <div class="p-6">
                <li>
                  <Link href="/contact">
                    Nous contacter
                  </Link>
                </li>
              </div>
            </div>




            <div class="rounded-lg shadow-lg bg-red transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-100">
              <a href="" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="" alt="" />
              </a>
              <div class="p-6">
                <li>
                  <Link href="/articles">
                    Nos articles
                  </Link>
                </li>
              </div>
            </div>
          </div>

        </main>
      </div>
    </Layout>
  )
}
