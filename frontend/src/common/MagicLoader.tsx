import React from 'react'

function MagicLoader(props:any) {
   const {message}=props

  return (
    <div className='h-[300px]   relative mx-auto w-1/2 mt-16 justify-center flex items-center'>
            <div className='absolute z-[1] magic-loader min-w-[80px] min-h-[80px] bg-transparent speed1 '></div>
            <div className='absolute z-[2] magic-loader min-w-[70px] min-h-[70px] bg-transparent speed2'></div>
            <div className='absolute z-[3] magic-loader min-w-[60px] min-h-[60px] bg-transparent speed3 '></div>
            <div className='absolute z-[4] magic-loader min-w-[50px] min-h-[50px] bg-transparent speed4 '></div>
            <div className='absolute z-[5] magic-loader min-w-[40px] min-h-[40px] bg-transparent speed5 '></div>
            <div className='absolute z-[6] magic-loader min-w-[30px] min-h-[30px] bg-transparent speed6'></div>
            <div className='absolute z-[7] magic-loader min-w-[20px] min-h-[20px] bg-transparent speed7 '></div>
            <div className='absolute z-[8] magic-loader min-w-[10px] min-h-[10px] bg-transparent speed8'></div>
            <div className='absolute z-[9] font-semibold  text-[14px] text-C11'>
                {message}
            </div>
    </div>
  )
}

export default MagicLoader
