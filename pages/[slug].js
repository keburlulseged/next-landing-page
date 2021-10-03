import Head from 'next/head'
import Layout from '../components/Layout'
import Image from "next/image"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'

export default function Blog({postData, content}) {
  return (
    <Layout>
      <Head>
        <title>KBs Blog</title>
      </Head>
      
      <div id="main" className="alt">
        {/* One */}
        <section id="one">
          <div className="inner">
            <header className="major">
              <h1>{postData.title}</h1>
            </header>
            <span className="image main"><Image src={`/assets/images/${postData.featuredImage}`} alt="" width="1500" height="400" /></span>
            <div dangerouslySetInnerHTML={{ __html: content}}> 

              </div>
          </div>
        </section>
      </div>
      
    </Layout>
  )
}



export const getStaticPaths = async () => {
  const files = fs.readdirSync('posts');
  console.log("Files: ", files);
  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }));
  console.log('paths: ', paths);

  return {
    paths, 
    fallback: false    // if no path, 404 page
  }
}

export const getStaticProps = async ({params: {slug}}) => {
  const post = fs.readFileSync(path.join('posts', `${slug}.md`)).toString();
  const postData = matter(post);  // returns string as object
  const content = marked(postData.content) // parse into html
  console.log(postData.data);
  return {
    props: {
      slug, 
      postData: postData.data,
      content,
    }
  }
}