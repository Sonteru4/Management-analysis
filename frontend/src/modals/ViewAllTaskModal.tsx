import {
  Add,
  CheckCircle,
  Close,
  Done,
  Pending,
  Rule,
} from "@mui/icons-material";
import React, { useState } from "react";
import { dummyTasks, projectMembers } from "../data/data";
import { Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import NoDataMessage from "../common/NoDataMessage";
import moment from "moment";
import { colors } from "../Constants";

function ViewAllTaskModal(props: any) {
  const { setViewAllTaskModal, activeProject } = props;

  const [searchKey, setSearchKey] = useState<string>("");
  const [filteredTasks, setFilteredTasks] = useState<any>([]);

  // function to close the modal
  const handleModalClose = () => {
    setViewAllTaskModal(false);
  };

  const handleInputChange = (e: any) => {
    const input = e.target.value.toLowerCase();

    const tempTasks = activeProject?.allTasks?.filter((task: any) => {
      const taskTitle = task.taskTitle.toLowerCase();
      const taskId = task._id.toLowerCase();

      return taskTitle.includes(input) || taskId.includes(input);
    });
    setSearchKey(input);
    setFilteredTasks(tempTasks);
  };
  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 w-[90%] md:w-[700px]  md:min-h-[550px] md:max-h-[550px] shadow-xl ">
        <div className="flex flex-row items-center justify-between pb-3 ">
          <div className="font-bold text-[20px] text-C11">All Tasks</div>
          <button className="cursor-pointer" onClick={handleModalClose}>
            <Close sx={{ fontSize: 20, fontWeight: 800 }} />
          </button>
        </div>
        {/* tasks  */}
        <input
          type="text"
          value={searchKey}
          placeholder="Filter by task ID or Task Title"
          onChange={handleInputChange}
          className="bg-C44 rounded-[8px]  p-2 text-[14px] w-full"
        />
        <div className="flex items-center justify-center p-1 py-4">
          {activeProject?.allTasks?.length !== 0 ? (
            <div className="flex flex-col overflow-y-auto max-h-[400px] gap-2 w-full">
              {searchKey === "" ? (
                <>
                  {activeProject?.allTasks?.map((node: any) => (
                    <Tooltip title="View Task" arrow placement="right">
                      <Link to={`/task-page?id=${node._id}`}>
                        <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all w-full items-center">
                          <div className="flex flex-row flex-1">
                            <div
                              className={`group-hover:px-2 min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center  ${
                                node?.taskPriority === "High"
                                  ? "bg-highPriority"
                                  : node.taskPriority === "Medium"
                                  ? "bg-mediumPriority"
                                  : "bg-lowPriority"
                              } p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
                            >
                              <div className="hidden text-C55 font-semibold group-hover:flex duration-[1s]">
                                {moment(node?.dueDate).format("LL")}
                              </div>
                            </div>

                            <div
                              className={`hidden group-hover:flex  min-w-[10px] group-hover:min-w-[80px] duration-200 justify-center items-center p-1   group-hover:rounded-r-[0px] bg-[#dedede] `}
                            >
                              <div className="hidden text-C11 font-semibold group-hover:flex duration-[1s]">
                                {node?.taskStatus}
                              </div>
                            </div>
                            <div className="p-2 max-w-[80%] break-words">
                              {node?.taskTitle}
                            </div>
                          </div>

                          <div className="mr-2">
                            {node?.taskStatus === "Completed" ? (
                              <CheckCircle
                                sx={{
                                  fontSize: 15,
                                  color: colors.SucessGreen,
                                  fontWeight: 300,
                                }}
                              />
                            ) : (
                              <Pending
                                sx={{
                                  fontSize: 15,
                                  color: colors.highPriority,
                                  fontWeight: 300,
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </Link>
                    </Tooltip>
                  ))}
                </>
              ) : (
                <>
                  {filteredTasks.length !== 0 ? (
                    <>
                      {filteredTasks?.map((node: any) => (
                        <Tooltip title="View Task" arrow placement="right">
                          <Link to={`/task-page?id=${node._id}`}>
                            <div className="flex flex-row group rounded-[4px]  text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all w-full items-center">
                              <div className="flex flex-row flex-1">
                                <div
                                  className={`group-hover:px-2 min-w-[10px] group-hover:min-w-[80px] duration-200 flex justify-center items-center  ${
                                    node?.taskPriority === "High"
                                      ? "bg-highPriority"
                                      : node.taskPriority === "Medium"
                                      ? "bg-mediumPriority"
                                      : "bg-lowPriority"
                                  } p-1 rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
                                >
                                  <div className="hidden text-C55 font-semibold group-hover:flex duration-[1s]">
                                    {moment(node?.dueDate).format("LL")}
                                  </div>
                                </div>

                                <div
                                  className={`hidden group-hover:flex  min-w-[10px] group-hover:min-w-[80px] duration-200 justify-center items-center p-1   group-hover:rounded-r-[0px] bg-[#dedede] `}
                                >
                                  <div className="hidden text-C11 font-semibold group-hover:flex duration-[1s]">
                                    {node?.taskStatus}
                                  </div>
                                </div>
                                <div className="p-2 max-w-[80%] break-words">
                                  {node?.taskTitle}
                                </div>
                              </div>

                              <div className="mr-2">
                                {node?.taskStatus === "Completed" ? (
                                  <CheckCircle
                                    sx={{
                                      fontSize: 15,
                                      color: colors.SucessGreen,
                                      fontWeight: 300,
                                    }}
                                  />
                                ) : (
                                  <Pending
                                    sx={{
                                      fontSize: 15,
                                      color: colors.highPriority,
                                      fontWeight: 300,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </Link>
                        </Tooltip>
                      ))}
                    </>
                  ) : (
                    <div className="mt-[20%]">
                      <NoDataMessage
                        size="small"
                        message={`No Tasks Found based on "${searchKey}"`}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <div className="mt-[20%]">
              <NoDataMessage
                size="small"
                message="Currently No Tasks in this Project"
              />
            </div>
          )}
        </div>

        {/*  */}
        {/* <div className='flex justify-end gap-4 mt-2'>
      <button className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[14px] py-2 px-5`} onClick={handleModalClose}>Cancel</button>
        <button className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[14px] py-2 px-5`} >Save</button>
      </div> */}
      </div>
    </div>
  );
}

export default ViewAllTaskModal;
