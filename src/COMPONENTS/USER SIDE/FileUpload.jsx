import React, {useState, useRef} from "react";
import { Link } from "react-router-dom";
import './FileUpload.css';


function FileUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            uploadFile(file);
        }
    };

    const uploadFile = (file) => {
        setIsUploading(true);
        const totalChunks = 100;
        let uploadedChunks = 0;

        const uploadInterval = setInterval(() => {
            uploadedChunks += 1;
            setUploadProgress((uploadedChunks / totalChunks) * 100);

            if (uploadedChunks >= totalChunks) {
                clearInterval(uploadInterval);
                setIsUploading(false);
                setUploadProgress(0);
                alert("File uploaded successfully!");
            }
        }, 50);
    };

    return (
        <div className="file-upload-container">
            <h2>Upload Your File</h2>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                disabled={isUploading}
            />
            {isUploading && (
                <div className="upload-progress">
                    <div
                        className="upload-progress-bar"
                        style={{ width: `${uploadProgress}%` }}
                    ></div>
                    <span>{Math.round(uploadProgress)}%</span>
                </div>
            )}
        </div>
    );
};


export default FileUpload;