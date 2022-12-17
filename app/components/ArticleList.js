import Link from 'next/link'
import Article from './Article'






export default function ArticleList({articles, user}){ 

    
    return (
        <div class="columns-3 gap-10">
          {articles.map(art =>
          <Article art={art}></Article>
        )}
      </div>
    )
}
