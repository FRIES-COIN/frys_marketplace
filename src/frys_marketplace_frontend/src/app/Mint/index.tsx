import React, { useState } from "react";
import MintForm from "./mint-form";
import { IconCloudUpload } from "@tabler/icons-react";

const MintPage: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageBytes, setImageBytes] = useState<number[][]>([]);

  const handleFileUpload = async (file: File) => {
    // Display preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to bytes for canister
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const chunks = [];
    const chunkSize = 500000; // 500KB chunks

    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = Array.from(uint8Array.slice(i, i + chunkSize));
      chunks.push(chunk);
    }
    setImageBytes(chunks);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="bg-background text-white min-h-screen flex flex-col md:flex-row px-2 gap-8 md:gap-0">
      <div 
        className="w-full md:w-1/2 bg-primary flex justify-center items-center rounded-lg flex-col p-8 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileInput}
        />
        {uploadedImage ? (
          <img 
            src={uploadedImage} 
            alt="NFT Preview" 
            className="max-w-full max-h-[400px] rounded-lg object-contain"
          />
        ) : (
          <>
            <IconCloudUpload className="w-1/4 h-1/4" size={24} />
            <h1 className="font-body text-black font-semibold text-xl pt-4">
              Upload/Drag Image
            </h1>
          </>
        )}
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-16 bg-background flex flex-col justify-center px-2">
        <MintForm imageBytes={imageBytes} />
      </div>
    </div>
  );
};

export default MintPage;