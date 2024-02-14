import React from 'react';
import { Link } from "react-router-dom";
const Blog = (props) => {
  function formatDate(inputDate) {
    // Split the input date string into year, month, and day
    const [year, month, day] = inputDate.split('-');

    // Create a new Date object using the input date components
    const dateObj = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript
    
    // Get the month name
    const monthNames = [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[dateObj.getMonth()];

    // Format the date string with month name and year
    const formattedDate = `${dateObj.getDate()} ${monthName} ${dateObj.getFullYear()}`;

    return formattedDate;
  }
  return (  
          <div className='flex justify-center py-2 w-full text-black'>
            <Link className='md:w-[70%] w-[90%] rounded-md overflow-hidden bg-slate-100 backdrop-blur-md' to={{pathname:`/blog-dtl/${props.data._id}`}}>
                <div className='flex max-sm:flex-col max-sm:itemss-center gap-3'>
                    <img className='md:w-[40%] sm:w-[50%] w-full h-auto aspect-[2/1] bg-cover bg-orange-400' src={props.data.image} alt="" />
                    <div className='md:w-[60%] sm:w-[50%] w-full p-2'>
                        <p className='py-2'>
                            <span>{formatDate(props.data.createdAt.split('T')[0])}</span>
                            <strong> · </strong>
                            <span>@{props.data.author}</span>
                        </p>
                        <h2 className='text-2xl font-bold text-[#FF69B4]'>{props.data.title}</h2>
                        <p className='line-clamp-3' dangerouslySetInnerHTML={{__html:props.data.description}}></p>
                    </div>
                </div>
            </Link>
          </div>


  )
}

export default Blog;
