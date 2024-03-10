import React, { useState } from "react";
import { CLOUDINARY_CLOUDNAME } from "../env/environment";
import axios from "axios";

function FileDemo() {
  const [img, setImg] = useState<any>(null);
  const [vid, setVid] = useState<any>(null);
  const [doc, setDoc] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const uploadFile = async (type: string) => {
    const data = new FormData();
    data.append("file", type === "image" ? img : doc);
    data.append("upload_preset", "image_preset");

    try {
      let resourceType = "auto";
      let api = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/${resourceType}/upload`;
      const response = await axios.post(api, data);
      // console.log("RESPONSE : ",response)
      const { secure_url } = response.data;
      setLoading(false);
      return secure_url;
    } catch (err: any) {
      console.log("Error", err);
      alert(err?.message || "Something went wrong");
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      // const imageURL = await uploadFile("image")
      const documentURL = await uploadFile("document");
      // console.log("IMAGE URL : ",imageURL);
      console.log("DOCUMENT URL : ", documentURL);
    } catch (err: any) {
      console.log("Error : ", err);
    }
  };

  return (
    <div className="flex justify-center w-full">
      {!loading ? (
        <div className="w-[50%] flex flex-col gap-2 p-5 border-2 border-black rounded-md mt-10">
          <label htmlFor="image">Image</label>
          <input
            onChange={(e: any) => setImg((prev: any) => e.target.files[0])}
            type="file"
            name="image"
            id=""
            accept="image/*"
          />
          <br />
          <br />
          <label htmlFor="document">Document</label>
          <input
            onChange={(e: any) => setDoc((prev: any) => e.target.files[0])}
            type="file"
            name="document"
            id=""
            accept=".pps,
            .txt,
            application/pdf,
            application/vnd.ms-powerpoint,
            application/vnd.openxmlformats-officedocument.presentationml.slideshow,
            application/vnd.openxmlformats-officedocument.presentationml.presentation"
          />
          <button
            className="p-2 mt-5 text-white bg-black rounded-md"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      ) : (
        <div>Loading. . .</div>
      )}
    </div>
  );
}

export default FileDemo;
