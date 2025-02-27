"use client";

import { useState } from "react";

export default function PdfUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        alert("Please upload a valid PDF file.");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload.");
    }
    
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <input type="file" accept="application/pdf" onChange={handleFileChange} className="border p-2 rounded-md" />
      {file && <p className="text-sm">Selected file: {file.name}</p>}
      <button 
        onClick={handleUpload} 
        disabled={!file || uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </div>
  );
}
