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
    <div className=' flex flex-col w-[75%] '>
        <div className=' text-[20px] font-bold'>
            {getTimeToReturnGreeting()}
        </div>
        <div className='text-[40px] font-extrabold'>
            {`${myProfiledata?.firstName} ${myProfiledata?.lastName}`}

        </div>

    </div>
    </>
  )
}

export default DashboardGreeting
