import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { projectMembers } from "../data/data";
import ErrorBox from "../common/ErrorBox";

function CreateNewProjectModal(props: any) {
  const { setCreateNewProjectModal } = props;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 5000);

    // Clear the timeout if the component unmounts or if there's a new error
    return () => clearTimeout(timer);
  }, [error]);

  const emptyState = {
    projectName: "",
    projectDescription: "",
  };

  const [createProjectFormData, setCreateProjectFormData]: any = useState<any>({
    projectName: "",
    projectDescription: "",
  });

  const handleInputChange = (e: any) => {
    setCreateProjectFormData({
      ...createProjectFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateBeforeSubmit = () => {
    // Check if username and password are not empty
    if (!createProjectFormData.projectName.trim()) {
      setError('Project Name cannot be empty');
      return false;
    }
    else if(!createProjectFormData.projectDescription.trim()){
      setError('Project Description cannot be empty')
      return false
    }
    // Add any other specific validation rules here
    // If all validations pass, return true
    return true;
    };

  const handleSubmit = () => {
    // Add your validation logic here
    if (validateBeforeSubmit()) {
      // Perform registration logic here call API
      console.log("Perform registration logic");
      setCreateProjectFormData(emptyState)
    } else {
      // Display error message
      console.error("Validation failed. Display error message.");
    }
  };

  // function to close this modal
  const handleModalClose = () => {
    setCreateProjectFormData(emptyState)
    setCreateNewProjectModal(false);
  };

  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 w-[700px] ">
        <div className="font-bold text-[20px] text-C11">New Project</div>
        <div className="my-1 mt-2 text-[14px] flex flex-col gap-2 ">
          <div className="flex flex-col flex-1 gap-2">
            <div className="flex flex-col gap-1">
              <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
                Project Name
              </div>
              <input
                type="text"
                className="bg-C44 rounded-[8px]  p-2 text-[14px]"
                name="projectName"
                id="projectName"
                value={createProjectFormData.projectName}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className=" text-C11 text-[10px] font-bold  w-fit  select-none">
                Project Description
              </div>
              <textarea
                rows={7}
                className="bg-C44 rounded-[8px]  p-2 text-[14px] resize-none"
                name="projectDescription"
                id="projectDescription"
                value={createProjectFormData.projectDescription}
                onChange={handleInputChange}
              />
            </div>
          </div>
          {error?
            // Section to implement the logic for validation
            <ErrorBox message={error} />:null
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

export default CreateNewProjectModal;
