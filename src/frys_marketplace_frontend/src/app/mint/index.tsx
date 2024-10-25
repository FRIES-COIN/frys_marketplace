import React, { useState } from "react";
import MintForm from "./mint-form";
import { IconCloudUpload } from "@tabler/icons-react";

const MintPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-background text-white min-h-screen flex flex-col md:flex-row px-2 gap-8 md:gap-0">
      <div className="w-full md:w-1/2 bg-primary flex justify-center items-center rounded-lg flex-col">
        <IconCloudUpload className="w-1/4 h-1/4" size={24} />
        <h1 className="font-body text-black font-semibold text-xl pt-4">
          Upload/Drag Image
        </h1>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 bg-background flex flex-col justify-center px-2">
        {uploadedImage && (
          <div className="flex justify-center mb-4">
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-24 h-24 rounded-full"
            />
          </div>
        )}
        <MintForm />
      </div>
    </div>
  );
};

export default MintPage;
