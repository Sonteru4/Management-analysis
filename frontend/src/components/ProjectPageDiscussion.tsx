import { Comment, Edit } from '@mui/icons-material'
import { error } from 'console'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { colors } from '../Constants'
import ErrorBox from '../common/ErrorBox'
import NoDataMessage from '../common/NoDataMessage'
import { addCommentToProjectById } from '../services/projectServices'

function ProjectPageDiscussion(props:any) {
   


    const {activeProject,myProfiledata,triggerRerender}=props
    const [postCommentStatus, setPostCommentStatus] = useState<string>("not-posted");
    const [error, setError] = useState<string | null>(null);
    const commentsContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
          setError(null);
        }, 5000);
    
        // Clear the timeout if the component unmounts or if there's a new error
        return () => clearTimeout(timer);
      }, [error]);


    const emptyState = {
        senderName: `${myProfiledata?.firstName} ${myProfiledata?.lastName}`,
        messageContent: "",
        senderId: myProfiledata?._id,
        timeStamp: moment.utc().toISOString(),
      };
    
      const [projectCommentFormData, setProjectCommentFormData] = useState(emptyState);
    
      const validateBeforeSubmit = () => {
        if (!projectCommentFormData.messageContent.trim()) {
          setError("Cannot post an empty comment");
          return false;
        }
        return true;
      };
    
      const handleInputChange = (e: any) => {
        setProjectCommentFormData({
          ...projectCommentFormData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async () => {
        setPostCommentStatus("post-loading");
        if (validateBeforeSubmit()) {
          console.log("Perform Comment Posting logic");
          await addCommentToProjectById(activeProject?._id, projectCommentFormData)
            .then((res: any) => {
              console.log("(INREACT) ADD COMMENT RESULT :", res);
              if (res.addStatus) {
                setPostCommentStatus("not-posted");
                triggerRerender();
              } else {
                console.log("(INREACT)ADD COMMENT ERROR", res);
                setError("Comment Could Not be Posted");
                setProjectCommentFormData(emptyState);
                setPostCommentStatus("post-failure")
              }
            })
            .catch((err: any) => {
              console.log("(INREACT) in catch ADD COMMENT ERROR", err);
            });
    
          setProjectCommentFormData(emptyState);
        } else {
          console.error("Validation failed. Display error message.");
        }
      };
    
      useEffect(() => {
        // Scroll to the bottom of the comments container after rendering
        if (commentsContainerRef.current) {
          commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
        }
      }, [activeProject?.projectComments]);
    



  return (
    <div className="flex flex-col  w-full lg:w-1/2 ">
    <div className="">
      <div className="text-C11 text-[12px] font-semibold p-1 flex flex-row gap-2 items-center">
        <Comment sx={{ fontSize: 20, color: colors.C11 }} />
        <span>Discussion</span>
      </div>

      <div className="flex flex-col gap-3 my-1 bg-gray-50 min-h-[200px] items-center md:min-h-[300px] overflow-y-auto p-2 max-h-[300px]" ref={commentsContainerRef}>
        {activeProject?.projectComments.map((node: any) => (
          <>
            {node?.senderId === myProfiledata?._id ? (
              <div className="flex flex-col group text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all p-2 w-full border-r-4 hover:border-C11 ">
                <div
                  className={`min-w-[10px] group-hover:min-w-[80px]  duration-200 flex  text-right flex-row-reverse justify-between w-full items-center  rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
                >
                  <div className=" text-C11 font-bold group-hover:flex duration-[1s] text-[10px] ">
                    {node?.senderName}
                  </div>
                  <div className="text-[8px] font-medium">
                    {moment(node?.timeStamp).format("lll")}
                  </div>
                </div>
                <div className="flex items-center justify-end ">
                  {/* <Person sx={{ fontSize: 10, color: colors.C22 }} /> */}
                  <div className="break-words text-C11 bg-gray-200 px-[4px] rounded-[2px]">
                    {node?.messageContent}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col group text-[12px] max-w-full break-words hover:bg-C44 cursor-pointer transition-all p-2 w-full border-l-4 hover:border-C11 ">
                <div
                  className={`min-w-[10px] group-hover:min-w-[80px]  duration-200 flex  text-left flex-row justify-between w-full items-center  rounded-[4px] group-hover:rounded-l-[4px] group-hover:rounded-r-[0px] `}
                >
                  <div className=" text-C11 font-bold group-hover:flex duration-[1s] text-[10px] ">
                    {node?.senderName}
                  </div>
                  <div className="text-[8px] font-medium">
                    {moment(node?.timeStamp).format("lll")}
                  </div>
                </div>
                <div className="flex items-center ">
                  {/* <Person sx={{ fontSize: 10, color: colors.C22 }} /> */}
                  <div className="break-words text-C11">
                    {node?.messageContent}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}

        {activeProject?.projectComments.length === 0 && (
          <div className="w-full  mt-[18%]">
            <NoDataMessage message={"Discussion has not started"} size="small" />
          </div>
        )}
      </div>
    </div>

    <div className="flex flex-col ">
      <div className=" text-C11 text-[12px] font-bold  w-fit py-1 flex flex-row gap-1 items-center ">
        <Edit sx={{ fontSize: 15, color: colors.C11 }} />
        <div>Talk to the team</div>
      </div>
      <textarea
        rows={4}
        className="bg-C44 resize-none   rounded-[4px] p-2 text-[14px]"
        placeholder="Share your thoughts"
        name="messageContent"
        id="messageContent"
        value={projectCommentFormData.messageContent}
        onChange={handleInputChange}
      >
        projectCommentFormData.messageContent
      </textarea>
      <div className="flex justify-end py-2">
        <button
          disabled={postCommentStatus === "post-loading"?true:false}
          onClick={handleSubmit}
          className={`hover:bg-[#09171c]  rounded-[4px] disabled:cursor-not-allowed bg-[#012B39]  text-white font-semibold text-[12px] py-1 px-5 `}
        >
          {postCommentStatus === "post-loading" ? "Posting ..." : "Post"}
        </button>
      </div>
      {error ? <ErrorBox message={error} /> : null}
    </div>
    </div>
  )
}

export default ProjectPageDiscussion
