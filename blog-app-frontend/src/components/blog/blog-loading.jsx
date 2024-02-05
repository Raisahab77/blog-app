import React from 'react';


const BlogLoading = () => {
  return (  
          <div className='flex justify-center py-2 w-full text-black'>
            <div className='md:w-[70%] w-[90%] rounded-md overflow-hidden bg-slate-100'>
                <div className='flex max-sm:flex-col max-sm:itemss-center gap-3'>
                    <div className='md:w-[40%] sm:w-[50%] w-full h-auto relative overflow-hidden'>
                        <img className='w-full h-full aspect-[2/1] bg-cover bg-gray-400' alt="" />
                        <div className='shimmer'></div>
                    </div>
                    <div className='md:w-[60%] sm:w-[50%] w-full p-2'>

                        {/* Title */}
                        <div className='w-[70%] h-7 relative overflow-hidden'>
                            <h2 className='w-full h-full text-2xl font-bold bg-gray-400'></h2>
                            <div className='shimmer'></div>
                        </div>

                        <p className='flex justify-between relative py-2 pr-6 font-bold'>
                            <div className='w-10 h-6 relative overflow-hidden'>
                                <div className='w-full h-full bg-gray-400'></div> 
                                <div className='shimmer'></div>
                            </div>   

                            <div className='w-10 h-6 relative overflow-hidden'>
                                <div className='w-full h-full bg-gray-400'></div> 
                                <div className='shimmer'></div>
                            </div>   
                            
                        </p>

                        <div>
                            <div className='w-full h-8 mt-2 relative overflow-hidden'>
                                <div className='w-full h-full bg-gray-400'></div> 
                                <div className='shimmer'></div>
                            </div> 

                            <div className='w-full h-8 mt-2 relative overflow-hidden'>
                                <div className='w-full h-full bg-gray-400'></div> 
                                <div className='shimmer'></div>
                            </div> 

                            <div className='w-[70%] h-8 mt-2 relative overflow-hidden'>
                                <div className='w-full h-full bg-gray-400'></div> 
                                <div className='shimmer'></div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
          </div>


  )
}

export default BlogLoading;
