import { useState } from "react";
import React from "react";

const DocumentForm = ({ onUpload }) => {
  const [documentName, setDocumentName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("Please select a file.");
      return;
    }

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF, JPEG, and PNG files are allowed.");
      setFile(null);
      return;
    }

    setError("");
    setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!documentName.trim() || !description.trim() || !file) {
      setError("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const documentData = {
        id: Date.now(),
        name: documentName,
        description,
        fileData: reader.result,
        type: file.type, 
      };

      onUpload(documentData);
      resetForm();
    };
  };

  const resetForm = () => {
    setDocumentName("");
    setDescription("");
    setFile(null);
    setError("");
  };

  return (
    <form className="bg-white p-6  max-w-lg mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <div className="mb-4">
        <label className="block font-medium mb-1">Document Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          placeholder="Enter document name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Description</label>
        <textarea
          className="w-full p-2 border rounded-md"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter document description"
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Upload File (PDF, JPEG, PNG)</label>
        <input type="file" accept=".pdf,.jpeg,.jpg,.png" onChange={handleFileChange} className="w-full border p-2 rounded-md" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700">
        Upload
      </button>
    </form>
  );
};

export default DocumentForm;
