import Link from 'next/link'
import Article from './Article'






export default function ArticleList({articles, user}){ 

    
    return (
        <div class="grid my-0 mx-auto px-0 py-10 grid grid-cols-3 gap-4">
          {articles.map(art =>
          <Article art={art}></Article>
        )}
      </div>
    )
}
