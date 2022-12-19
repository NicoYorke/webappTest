import { clearPreviewData } from "next/dist/server/api-utils"
import Link from "next/link"
import { useEffect } from "react"
import { supabase } from "../pages/api/supabase"

export async function getStaticProps(imageID) {
    
    let image = {}
    let { data, error, status } = await supabase.storage
      .from('test')
      .getPublicUrl('qr code')
      
    if (!error){
        
        image = data // handle errors
    } 
    
    else{ 
        console.log("error:", error)
    }

    
    
    return {
      props: {
        image: image
      }
    };
  }

export default function Article({art, image}){ 
    getStaticProps(art.imageID)
    

    
    async function uploadImage(e){ 
        let file = e.target.files[0];
        console.log(file)


        let {data, error} = await supabase
            .storage
            .from("test")
            .upload("articles/"+art.id, file)

        if(data){ 
            window.location.reload(true)
        }
    }

    return(
        <div key={art.id} class="my-0 mx-1 px-0 py-3 h-min break-inside-avoid rounded-lg bg-red transition ease-in-out delay-10 hover:scale-110 duration-50">
             
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="rounded-t-lg w-full" src={`https://hisvmczmnmlimhtxqhvl.supabase.co/storage/v1/object/public/test/articles/${art.id}?${new Date().getMilliseconds()}`} alt="" />
                </a>
                <div class="p-5">
                    
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><Link href={`/articles/${art.id}`}>{art.title}, {art.id}</Link></h5>
                    
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{art.author}</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    
                 </div>
            </div>
        </div>
    )
}