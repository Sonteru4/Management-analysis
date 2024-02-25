import React, { useEffect, useState } from "react";
import { projectMembers } from "../data/data";
import { Add, Close } from "@mui/icons-material";
import ErrorBox from "../common/ErrorBox";

function AddNewMemberModal(props: any) {
  const { setAddMemberModal } = props;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const emptyState = {
    userId: "",
  };

  const [addMemberFormData, setAddMemberFormData]: any = useState<any>({
    userId: "",
  });

  const validateBeforeSubmit = () => {

    if(!addMemberFormData.userId.trim()){
      setError( "Please Choose a Member");
      return false;
    }
    return true
  }
  const handleInputChange = (e: any) => {
    setAddMemberFormData({
      ...addMemberFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Add your validation logic here
    if (validateBeforeSubmit()) {
      // Perform registration logic here call API
      console.log("Perform registration logic");
      setAddMemberFormData(emptyState)
      // setAddNewTaskFormData(emptyState);
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  const handleModalClose = () => {
    setAddMemberFormData(emptyState)
    setAddMemberModal(false);
  };

  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 w-[500px]">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-[20px] text-C11">Add New Member</div>
          <button className="cursor-pointer" onClick={handleModalClose}>
            <Close sx={{ fontSize: 20, fontWeight: 800 }} />
          </button>
        </div>
        <div className="my-4 text-[14px] flex flex-row gap-2 ">
          <div className="flex flex-col w-full gap-1 mt-2">
            <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
              Choose a member
            </div>
            <select
              name="userId"
              id="userId"
              className="bg-C44 rounded-[8px]  p-2 text-[14px]"
              value={addMemberFormData.userId}
              onChange={handleInputChange}
            >
              <option value="none" selected>
                None Selected
              </option>
              {projectMembers.map((node: any) => (
                <option value={node.id} className="text-C11">
                  {node.memberName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error?
          <ErrorBox message={error} />:null
        }
        <div className="flex justify-end gap-4 mt-2">
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

export default AddNewMemberModal;
