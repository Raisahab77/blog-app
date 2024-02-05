import React from 'react';
import { Link } from "react-router-dom";
const Blog = (props) => {
  return (  
          <div className='flex justify-center py-2 w-full text-black'>
            <Link className='md:w-[70%] w-[90%] rounded-md overflow-hidden bg-slate-100 backdrop-blur-md' to={{pathname:`/blog-dtl/${props.data._id}`}}>
                <div className='flex max-sm:flex-col max-sm:itemss-center gap-3'>
                    <img className='md:w-[40%] sm:w-[50%] w-full h-auto aspect-[2/1] bg-cover bg-orange-400' src={props.data.image} alt="" />
                    <div className='md:w-[60%] sm:w-[50%] w-full p-2'>
                        <h2 className='text-2xl font-bold text-[#FF69B4]'>{props.data.title}</h2>
                        <p className='py-2 font-bold'><span>Date <span className='text-sm font-normal'>{props.data.createdAt.split('T')[0]}
                            </span></span> <span className='float-right pr-4'>Author <span className='text-sm font-normal'>@
                            {props.data.author}</span></span></p>
                        <p className='line-clamp-3' dangerouslySetInnerHTML={{__html:props.data.description}}></p>
                    </div>
                </div>
            </Link>
          </div>


  )
}

export default Blog;
