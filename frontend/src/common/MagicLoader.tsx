import React from 'react'

function MagicLoader(props:any) {
   const {message,size}=props

  return (
    <>
    {
      size==="large"?
      <div className='h-[300px]   relative mx-auto w-1/2 mt-16 justify-center flex items-center'>
      <div className='absolute z-[1] magic-loader min-w-[110px] min-h-[5px] speed1 opacity-[0.6]'></div>
      <div className='absolute z-[2] magic-loader min-w-[100px] min-h-[5px] speed2 opacity-[0.7]'></div>
      <div className='absolute z-[3] magic-loader min-w-[90px] min-h-[5px]  speed3 opacity-[0.8]'></div>
      <div className='absolute z-[4] magic-loader min-w-[70px] min-h-[5px]  speed4 opacity-[0.9]'></div>
      <div className='absolute z-[5] magic-loader min-w-[60px] min-h-[5px]  speed5 opacity-[1]'></div>
      <div className='absolute z-[6] magic-loader min-w-[50px] min-h-[5px]  speed6 opacity-[0.6]'></div>
      <div className='absolute z-[7] magic-loader min-w-[40px] min-h-[5px]  speed7 opacity-[0.7]'></div>
      <div className='absolute z-[5] magic-loader min-w-[30px] min-h-[5px]  speed5 opacity-[0.8]'></div>
      <div className='absolute z-[6] magic-loader min-w-[20px] min-h-[5px]  speed6 opacity-[0.9]'></div>
      <div className='absolute z-[7] magic-loader min-w-[10px] min-h-[5px]  speed7 opacity-[1]'></div>
      {/* <div className='absolute z-[8] magic-loader min-w-[10px] min-h-[10px]  speed8'></div> */}
      <div className='absolute z-[9] font-semibold  text-[14px] text-C11'>
          {message}
      </div>
</div>


      :size==="medium"?
      <div className='h-[300px]   relative mx-auto w-1/2 mt-16 justify-center flex items-center'>
      <div className='absolute z-[1] magic-loader min-w-[70px] min-h-[3px]  speed1 opacity-[0.6]'></div>
      <div className='absolute z-[2] magic-loader min-w-[60px] min-h-[3px]  speed2 opacity-[0.7]'></div>
      <div className='absolute z-[3] magic-loader min-w-[50px] min-h-[3px]  speed3 opacity-[0.8]'></div>
      <div className='absolute z-[4] magic-loader min-w-[40px] min-h-[3px]  speed4 opacity-[0.9]'></div>
      <div className='absolute z-[5] magic-loader min-w-[30px] min-h-[3px]  speed5 opacity-[0.8]'></div>
      <div className='absolute z-[6] magic-loader min-w-[20px] min-h-[3px]  speed6 opacity-[0.9]'></div>
      <div className='absolute z-[7] magic-loader min-w-[10px] min-h-[3px]  speed7 opacity-[1]'></div>
      {/* <div className='absolute z-[8] magic-loader min-w-[10px] min-h-[10px]  speed8'></div> */}
      <div className='absolute z-[9] font-semibold  text-[12px] text-C11'>
          {message}
      </div>
</div>

      :size==="small"?
      <div className='h-[300px]   relative mx-auto w-1/2 mt-16 justify-center flex items-center'>
      <div className='absolute z-[1] magic-loader min-w-[30px] min-h-[2px]  speed1 opacity-[0.6]'></div>
      <div className='absolute z-[2] magic-loader min-w-[25px] min-h-[2px]  speed2 opacity-[0.8]'></div>
      <div className='absolute z-[3] magic-loader min-w-[20px] min-h-[2px]  speed3 opacity-[1]'></div>
      <div className='absolute z-[4] magic-loader min-w-[15px] min-h-[2px]  speed4 opacity-[0.6]'></div>
      <div className='absolute z-[5] magic-loader min-w-[10px] min-h-[2px]  speed5 opacity-[0.8]'></div>
      <div className='absolute z-[6] magic-loader min-w-[5px]  min-h-[2px]  speed6 opacity-[1]'></div>
      {/* <div className='absolute z-[8] magic-loader min-w-[10px] min-h-[10px]  speed8'></div> */}
      <div className='absolute z-[9] font-semibold  text-[10px] text-C11'>
          {message}
      </div>
</div>

      :null
    }

    </>
  )
}

export default MagicLoader
