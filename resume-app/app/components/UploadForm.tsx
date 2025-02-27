"use client";

import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      setMetadata(data.metadata);
    } else {
      alert("Error extracting metadata!");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg shadow-md">
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} className="border p-2 rounded-md" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Upload Resume
      </button>

      {metadata && (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          <h3 className="font-bold">Extracted Metadata:</h3>
          <pre className="text-sm">{metadata}</pre>
        </div>
      )}
    </div>
  );
}
