import React, { useState } from 'react'

const Button = () => {
    const [count, setCount] = useState(0)

  return (
    <div className='flex flex-col mt-10'>
      <p className='flex justify-center'>
        Button Clicked: {count}
      </p>
     <div className='flex flex-col text-center gap-6'>
      <div className='flex gap-6 justify-center'>
         <button className='font-semibold h-10 w-20 bg-green-700 hover:bg-green-500 rounded'
      onClick={() => setCount(count + 1)}
      >
        Increase
      </button>
       <button className='font-semibold h-10 w-20 bg-yellow-400 hover:bg-yellow-300 rounded' 
      onClick={() => setCount(count - 1)}
      >
        Decrease
      </button>
      </div>
     <div >
       <button className='font-semibold h-10 w-20 bg-red-600 hover:bg-red-500 rounded' 
      onClick={() => setCount(0)}
      >
        Reset
      </button>
     </div>
     </div>
    </div>
  )
}

export default Button
