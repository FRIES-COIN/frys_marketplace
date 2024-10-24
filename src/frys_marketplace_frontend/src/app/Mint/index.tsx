import React, { useState } from "react";
import UploadIcon from "./UploadIcon";
import MintForm from "./MintForm";

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
    <div className="bg-gray-900 text-white min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-primary flex justify-center items-center">
        <UploadIcon className="w-3/4 h-3/4" onFileUpload={handleFileUpload} />
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 bg-gray-800 flex flex-col justify-center">
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
