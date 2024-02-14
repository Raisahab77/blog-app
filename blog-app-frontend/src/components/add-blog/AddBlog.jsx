import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './add-blog.css';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

const AddBlog = () => {
  let navigate = useNavigate(); 
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [image,setImage] = useState('');

  function AddBlog(){
    console.log(JSON.stringify({image,title,description}));
    fetch('http://localhost:5000/blog/add-blog',{
      method:'Post',
      body:JSON.stringify({image,title,description}),
      headers:{'Content-type':'application/json'},
      credentials:'include'
    }).then(response=>{
      response.json().then(res=>{
        console.log(res);
        if(res.status==201){
            navigate('/');
        }
      })
    })
  }

  return (
    <div className='w-full flex justify-center'>
        <div className='w-[90%] md:w-[60%] sm:w-[75%] text-center'>
            <input type="text"
                    className='w-full my-2 p-2 bg-neutral-700 text-gray-300 placeholder:text-gray-300'
                    placeholder='Blog Title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
            />
            <input type="text"
                    className='w-full my-2 p-2 bg-neutral-700 text-gray-300 placeholder:text-gray-300'
                    placeholder='Image Link'
                    value={image}
                    onChange={ev => setImage(ev.target.value)}
            />
            {/* <textarea 
                className='w-full my-2 p-2 bg-neutral-700 text-gray-300 placeholder:text-gray-300'
                name="" id="" rows="10" 
                placeholder='Write Blog'
                value={description}
                onChange={ev => setDescription(ev.target.value)}
            ></textarea> */}
            <ReactQuill
                    className='my-2'
                    theme="snow"
                    modules={modules} 
                    formats={formats} 
                    value={description} 
                    onChange={newValue => setDescription(newValue)}/>

            <button onClick={AddBlog} className='p-2 mt-4 rounded-md w-[80%] bg-orange-500 text-white'>Add blog</button>
        </div>
    </div>
  )
}

export default AddBlog
