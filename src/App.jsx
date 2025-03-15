import React, { useState, useEffect } from "react";
import DocumentForm from "./components/DocumentForm";
import DocumentList from "./components/DocumentList";

const App = () => {
  const [documents, setDocuments] = useState([]);

  // Load documents from localStorage on mount
  useEffect(() => {
    const savedDocuments = JSON.parse(localStorage.getItem("documents"));
    if (savedDocuments) {
      setDocuments(savedDocuments);
    }
  }, []);

  // Save documents to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleUpload = (doc) => {
    setDocuments([...documents, doc]);
  };

  const handleUpdate = (id, updatedDoc) => {
    setDocuments(documents.map((doc) =>
      doc.id === id ? { ...doc, ...updatedDoc } : doc
    ));
  };

  const handleDelete = (id) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Document Upload System</h1>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Left Side - Document Form (40% on large screens) */}
        <div className="lg:col-span-2 p-4 bg-white shadow-md rounded-md sticky top-0 h-[calc(90vh-4rem)]">
          <DocumentForm onUpload={handleUpload} />
        </div>

        {/* Right Side - Document List (60% on large screens) */}
        <div className="lg:col-span-3 p-4 bg-white shadow-md rounded-md overflow-y-auto max-h-[calc(90vh-4rem)]">
          <DocumentList documents={documents} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>

      </div>
    </div>
  );
};
export default App;