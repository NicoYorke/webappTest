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
        <div key={art.id} class="my-0 mx-1 px-0 py-3 h-min break-inside-avoid rounded-lg bg-red transition ease-in-out delay-10 hover:scale-105 duration-50">
             
            <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    {/* <img class="rounded-t-lg w-full" src={`https://hisvmczmnmlimhtxqhvl.supabase.co/storage/v1/object/public/test/articles/${art.id}?${new Date().getMilliseconds()}`} alt="" /> */}
                    <img class="rounded-t-lg w-full" src={`https://hisvmczmnmlimhtxqhvl.supabase.co/storage/v1/object/public/test/articles/${art.id}`} alt="" />
                </a>
                <div class="p-5">
                    
                    <h5 class="mb-2 hover:underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><Link href={`/articles/${art.id}`} as={`/articles/${art.id}`}>{art.title}</Link></h5>
                    
                    <Link href={{pathname: "/profile", query: {userID: art.author_id}}} as="" class="mb-3 font-normal hover:underline hover:text-blue-600 cursor-pointer text-gray-700 dark:text-gray-400">{art.author}</Link>
                    
                    
                 </div>
            </div>
        </div>
    )
}