import { Comment, Done, DonutLarge, Edit, Person } from "@mui/icons-material";
import React from "react";
import { colors } from "../Constants";
import { taskComments } from "../data/data";

function TaskPageTaskStatusMarker() {

  console.log(taskComments);
  
  return (
    <>
      <div className=" w-full h-[300px] mt-5 ">
        <div>
          <div className="text-C11 text-[12px] font-semibold p-1 flex flex-row gap-2 items-center">
          <Comment sx={{ fontSize: 20, color: colors.C11 }} />
            <span>Comments</span>
            </div>

        <div className="flex flex-col gap-3 my-1 bg-gray-50 max-h-[300px] overflow-y-auto p-2">

          {taskComments.map((node:any)=>(
                    <div className="flex flex-col group   text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all p-1 w-fit border-l-4 hover:border-C11 ">
                        <div
                          className={`min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-left items-center p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
                        >
                          <div className=" text-C11 font-bold group-hover:flex duration-[1s] px-1 text-[10px] ">
                            {node.senderName}
                          </div>
                        </div>
                        <div className='flex items-center px-2'>
                        {/* <Person sx={{ fontSize: 10, color: colors.C22 }} /> */}
                          <div className="break-words text-C11">{node.messageContent}</div>
                        </div>
                      </div>
          ))

        }


        </div>
        </div>


        <div className="flex flex-col mt-5">
          <div className=" text-C11 text-[12px] font-bold  w-fit py-1 flex flex-row gap-1 items-center ">
            <Edit sx={{ fontSize: 15, color: colors.C11 }} />
            <div>Leave a comment</div>
          </div>
          <textarea
            rows={4}
            className="bg-C44 resize-none   rounded-[4px] p-2 text-[14px]"
            placeholder="Type a message"
          />
          <div className="flex justify-end py-2">
            <button
              className={`hover:bg-[#09171c]  rounded-[4px] bg-[#012B39]  text-white font-semibold text-[12px] py-1 px-5 `}>
              Post
            </button>
          </div>

        </div>
          <div className="flex flex-col">
          <div className=" text-C11 text-[12px] font-bold  w-fit py-1 flex flex-row gap-1 items-center ">
            <DonutLarge sx={{ fontSize: 15, color: colors.C11 }} />
            <div>Update Status</div>
          </div>
          <button className="text-C11 border-2 border-C11 transition duration-300  hover:text-C55  justify-between text-[14px] font-bold hover:bg-C11  rounded-[4px] py-2 px-4 w-full flex flex-row gap-1 items-center ">
           <span>Mark As Completed</span>
           <Done/> 
          </button>
          </div>
      </div>
    </>
  );
}

export default TaskPageTaskStatusMarker;
