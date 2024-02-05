import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


const BlogDtl = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/blog/get-blog/${id}`, {
      method: 'Get',
      credentials: 'include'
    }).then(response => {
      response.json().then(blog => {
        console.log(blog);
        setBlogData(blog);
      })
    })
  }, [])
  return (
    <>
      { blogData &&
        (<div className="flex justify-center">
          <div className="w-[90%] md:w-[60%] sm:w-[75%] text-center bg-slate-100">
            <h2 className='text-3xl font-bold text-[#FF69B4]'>{blogData.title}</h2>

            <p className="font-bold">Date 
              <span className='text-xs font-normal pl-1'>
                {blogData.createdAt.split('T')[0]}
              </span>
            </p>

            <p className="font-bold">Author 
              <span className='text-xs font-normal pl-1'>
                {blogData.author}
              </span>
            </p>

            <img className='w-full h-auto aspect-[2/1] bg-cover bg-orange-400' src={blogData.image} alt="" />
            <p className="mt-3" dangerouslySetInnerHTML={{__html:blogData.description}}></p>
          </div>
        </div>)
      }

      {
        !blogData && (
          <div>
              Loading
          </div>
        )
      }

    </>

  )
}

export default BlogDtl;
