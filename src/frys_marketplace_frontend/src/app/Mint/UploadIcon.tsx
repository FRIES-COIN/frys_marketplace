import React, { useCallback } from "react";

interface UploadIconProps {
  className?: string;
  onFileUpload?: (file: File) => void;
}

const UploadIcon: React.FC<UploadIconProps> = ({ className, onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload?.(event.target.files[0]);
    }
  };

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        onFileUpload?.(event.dataTransfer.files[0]);
      }
    },
    [onFileUpload]
  );

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-white ${className}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <svg
          className="w-32 h-32 md:w-48 md:h-48"
          viewBox="0 0 334 321"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            width="334"
            height="321"
            rx="15"
            fill="url(#pattern0_159_536)"
            fillOpacity="0.49"
          />
          <defs>
            <pattern
              id="pattern0_159_536"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use
                xlinkHref="#image0_159_536"
                transform="matrix(0.01 0 0 0.010405 0 -0.0202492)"
              />
            </pattern>
            <image
              id="image0_159_536"
              width="100"
              height="100"
              xlinkHref="data:image/png;base64,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"
            />
          </defs>
        </svg>
        <div className="text-lg md:text-2xl text-black mt-2">Upload/drag</div>
      </label>
    </div>
  );
};

export default UploadIcon;
