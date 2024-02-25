import { Close } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ErrorBox from "../common/ErrorBox";

function EditTaskModal(props: any) {
  const { setEditTaskModal } = props;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const emptyState = {
    taskTitle: "",
    taskDescription: "",
    taskStatus: "",
  };

  const [editTaskFormData, setEditTaskFormData]: any = useState<any>({
    taskTitle: "",
    taskDescription: "",
    taskStatus: "",
  });

  const validateBeforeSubmit = () => {
    if (!editTaskFormData.taskTitle.trim()) {
      setError("Task Title cannot be empty");
      return false;
    } else if (!editTaskFormData.taskDescription.trim()) {
      setError("Task Description cannot be Empty");
      return false;
    } else if (!editTaskFormData.taskStatus.trim()) {
      setError("Please select Task Status");
      return false;
    }
    return true;
  };
  const handleInputChange = (e: any) => {
    setEditTaskFormData({
      ...editTaskFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Add your validation logic here
    if (validateBeforeSubmit()) {
      // Perform registration logic here call API
      console.log("Perform registration logic");
      setEditTaskFormData(emptyState);
      // setAddNewTaskFormData(emptyState);
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  // function to close this modal
  const handleModalClose = () => {
    setEditTaskFormData(emptyState);
    setEditTaskModal(false);
  };
  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 w-[700px]">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-[20px] text-C11">Edit Task Info</div>
          <button className="cursor-pointer" onClick={handleModalClose}>
            <Close sx={{ fontSize: 20, fontWeight: 800 }} />
          </button>
        </div>
        <div className="my-1 mt-2 text-[14px] flex flex-row gap-2">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-col gap-1">
              <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
                Task Name
              </div>
              <input
                type="text"
                name="taskTitle"
                id="taskTitle"
                className="bg-C44 rounded-[8px]  p-2 text-[14px]"
                value={editTaskFormData.taskTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
                Task Description
              </div>
              <textarea
                rows={5}
                name="taskDescription"
                id="taskDescription"
                className="bg-C44 rounded-[8px]  p-2 text-[14px] resize-none"
                value={editTaskFormData.taskDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
                Task Status
              </div>
              <select
                name="taskStatus"
                id="taskStatus"
                className="bg-C44 rounded-[8px]  p-2 text-[14px]"
                value={editTaskFormData.taskStatus}
                onChange={handleInputChange}
              >
                <option value="" selected>
                  None Selected
                </option>
                <option value="In Progress" >
                  In Progress
                </option>
                <option value="Completed" >
                  Completed
                </option>
                
              </select>
            </div>
          </div>
        </div>
        <div className="mt-2">
        {error&&
          <ErrorBox message={error} />
        }
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            className={` hover:bg-[#012b3927] rounded-[8px] text-C11 font-bold text-[12px] py-2 px-5`}
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
          onClick={handleSubmit}
            className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[12px] py-2 px-5`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskModal;
