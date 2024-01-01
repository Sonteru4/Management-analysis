import { CalendarMonth,DonutLarge, Person } from "@mui/icons-material";
import React from "react";
import { colors } from "../Constants";
import 'react-circular-progressbar/dist/styles.css';
import CircularGraph from "../common/CircularGraph";


function ProjectPageProjectInfo() {
  
  return (
    <>
      <div className=" flex flex-row items-center"> 

      <div className="flex flex-col w-[75%] ">
      <div className="text-[40px] font-extrabold">Project Name</div>
        <div className="text-[14px] w-[90%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
        <div className="flex flex-row gap-5 py-5 ">
          <div className="flex flex-col">
            <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Project Manager
            </div>
            <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
              <Person sx={{ fontSize: 12, color: colors.C11 }} />
              <div className="p-2 font-semibold ">Emily Chen</div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Start Date
            </div>
            <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
              <CalendarMonth    sx={{ fontSize: 12, color: colors.C11 }} />
              <div className="p-2 font-semibold">12 Dec 2021 </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Project Status
            </div>
            <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
              <DonutLarge sx={{ fontSize: 12, color: colors.C11 }} />
              <div className="p-2 font-semibold">In Progres</div>
            </div>
          </div>

      </div>
       


        </div>
        <CircularGraph color={colors.C11} trackColor={colors.C44} percentage={25}/>
      </div>
    </>
  );
}

export default ProjectPageProjectInfo;
