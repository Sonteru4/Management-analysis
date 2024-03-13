import { Close } from "@mui/icons-material";
import React from "react";
function ViewMediaModal(props: any) {
  const { setViewMediaModal, mediaData } = props;
  // function to close this modal
  const handleModalClose = () => {
    setViewMediaModal(false);
  };
  return (
    <div className="top-0 left-0 absolute w-[100vw] h-[100vh] bg-[#00000054] flex justify-center items-center">
      <div className="bg-C55 rounded-[8px] p-5 shadow-xl max-h-[500px]">
        <div className="flex flex-row items-center justify-between">
          <div className="font-bold text-[20px] text-C11">
            {mediaData.mediaName}
          </div>
          <button className="cursor-pointer" onClick={handleModalClose}>
            <Close sx={{ fontSize: 20, fontWeight: 800 }} />
          </button>
        </div>

        <div className="flex items-center justify-center mt-3 mb-4 ">
          {mediaData.mediaType === "image/png" ||
          mediaData.mediaType === "image/jpeg" ||
          mediaData.type === "image/jpg" ? (
            <img
              src={mediaData?.mediaURL}
              className="border max-h-[400px] border-black aspect-auto"
              alt=""
            />
          ) : (
            <div className="bg-C44 flex flex-col gap-2  items-center text-inactiveC11 transition-colors duration-[0.5s] justify-center border-inactiveC11 border-2 hover:bg-C44 rounded-[8px]  hover:text-gray-400 font-bold text-[12px] py-2 px-5 cursor-pointer w-full min-h-[100px]">
              <div className="mx-auto">
                {"Only Images can be Viewed Here :("}<br/>
                {"open it in a new window or download it"}
              </div>
              <a href={mediaData?.mediaURL}
              download={true}
              className={`bg-[#012b39f2] hover:bg-[#012B39] rounded-[8px] text-white font-bold text-[12px] py-2 px-5`}
              >
                View File
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewMediaModal;
