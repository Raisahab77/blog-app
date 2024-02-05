import Blog from '../components/blog/Blog';
// import blogs from '../assets/data/blogs';
import { useEffect, useState } from "react";
import BlogLoading from '../components/blog/blog-loading';

export default function LandingPage() {
	const [blogs,setBlogs] = useState('');
	useEffect(()=>{
		fetch(`http://localhost:5000/blog/get-blogs`,{
		  method:'Get',
		  credentials:'include'
		}).then(response=>{
		  response.json().then(res=>{
			console.log(res);
			setBlogs(res);
		  })
		})
	  },[])
  return (
    <div>
		{
			blogs &&
			(blogs.map((item,i)=>{
				return <Blog className="w-full" key={i} data={item}/> 
			}))
		}

		{
			!blogs &&
			(
				// <h1 className='text-5xl'>Loading</h1>
				<div>
					<BlogLoading/>
					<BlogLoading/>
					<BlogLoading/>
				</div>
			)
		}
	</div>
  );
}
