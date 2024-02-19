import {
  Person,
  CalendarMonth,
  DonutLarge,
  EmojiEvents,
  Info,
  LabelImportant,
  Edit,
  Delete,
} from "@mui/icons-material";
import React from "react";
import { colors } from "../Constants";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

function TaskPageTaskInfo(props:any) {
    const {setEditTaskModal,setDeleteTaskModal,setViewMemberModal}=props
    const priority = "high"
  return (
    <>
      <div className="flex flex-row items-center ">
        <div className="flex flex-col ">
          <div className="flex flex-col w-fit">
            <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Project
            </div>
            <Tooltip title="View Project" arrow placement="right">
            <Link to="/project-page">
            <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
              <EmojiEvents sx={{ fontSize: 15, color: colors.C11 }} />
              <div className="p-2 font-semibold">Project Name</div>
            </div>
            </Link>
            </Tooltip>
          </div>
          <div className="text-[40px] font-extrabold">Task Name</div>
          <div className="text-[14px] w-[90%]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <div className="flex flex-row flex-wrap gap-5 py-5 ">

            {/* Task ID  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Task ID
              </div>
              <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
                <Info sx={{ fontSize: 15, color: colors.C11 }} />
                <div className="p-2 font-semibold ">223165</div>
              </div>
            </div>

            {/* Priority  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
                Priority
              </div>
              <div className={`flex flex-row items-center px-2 rounded-[4px] text-[12px]
              ${ priority === "high"
                ? "bg-highPriority":
                priority === "medium"? 
                "bg-mediumPriority"
                : "bg-lowPriority"
              }
               cursor-pointer bg-C44 justify-between`}>
                <LabelImportant sx={{ fontSize: 15, color: colors.C55 }} />
                <div className="p-2 font-semibold text-C55">High</div>
              </div>
            </div>

            {/* Assigned To  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
                Assigned To
              </div>
              <Tooltip title="View Profile" arrow placement="top-end">
              <button
              onClick={()=>setViewMemberModal(true)}
              className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C11 ">
                <Person sx={{ fontSize: 15, color: colors.C55 }} />
                <div className="p-2 font-semibold text-C55">George Tom </div>
              </button>
              </Tooltip>
            </div>

             {/* Assigned By  */}
             <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
                Assigned By
              </div>
              <Tooltip title="View Profile" arrow placement="top-end">
              <button 
              onClick={()=>setViewMemberModal(true)}
              className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
                <Person sx={{ fontSize: 15, color: colors.C11 }} />
                <div className="p-2 font-semibold ">Tania Vazquez</div>
              </button>
              </Tooltip>
            </div>

             

             {/* Assigned On */}
             <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
                Assigned On
              </div>
              <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
                <CalendarMonth sx={{ fontSize: 15, color: colors.C11 }} />
                <div className="p-2 font-semibold ">12 Dec 2023</div>
              </div>
            </div>

            {/* Deadline  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Deadline
              </div>
              <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C11 ">
                <CalendarMonth sx={{ fontSize: 15, color: colors.C55 }} />
                <div className="p-2 font-semibold text-C55">24 Dec 2023</div>
              </div>
            </div>

            {/* Status  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Status
              </div>
              <div className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
                <DonutLarge sx={{ fontSize: 15, color: colors.C11 }} />
                <div className="p-2 font-semibold ">Assigned</div>
              </div>
            </div>

            {/* Edit Task Assigner Privilege  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Edit
              </div>
              
              <Tooltip title="Edit Task Info" arrow placement="bottom">
              <button
               onClick={()=>setEditTaskModal(true)}
               className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-C44 ">
                <Edit sx={{ fontSize: 15, color: colors.C11 }} />
                <div className="p-2 font-semibold ">Info</div>
              </button>
              </Tooltip>
            </div>

            {/* Delete Task Assigner Privilege  */}
            <div className="flex flex-col">
              <div className=" text-C11 text-[8px] font-bold  w-fit py-1">
              Delete
              </div>
              <Tooltip title="Delete Task" arrow placement="bottom">
              <button
               onClick={()=>setDeleteTaskModal(true)}
               className="flex flex-row items-center px-2 rounded-[4px] text-[12px] cursor-pointer bg-inactiveRed text-highPriority ">
                <Delete sx={{ fontSize: 15 }} />
                <div className="p-2 font-semibold ">Delete Task</div>
              </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskPageTaskInfo;
