import React from 'react'
import { useSelector } from 'react-redux';


function DashboardGreeting() {

    const myProfiledata = useSelector(
        (state: any) => state.authReducer.myUserProfile
      );

    const getTimeToReturnGreeting = ()=>{
        if(new Date().getHours() < 12)
            return 'Good Morning,';
        else if(new Date().getHours() < 17)
            return 'Good Afternoon,'
        else
            return 'Good Evening,'
    }
  return (
    <>
    <div className=' flex flex-col w-full sm:w-[75%] '>
        <div className='text-[18px] md:text-[20px] font-bold'>
            {getTimeToReturnGreeting()}
        </div>
        <div className='text-[35px] md:text-[40px] font-extrabold w-full sm:w-[75%] '>
            {`${myProfiledata?.firstName} ${myProfiledata?.lastName}`}

        </div>

    </div>
    </>
  )
}

export default DashboardGreeting
