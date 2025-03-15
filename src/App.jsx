import React, { useState, useEffect } from "react";
import DocumentForm from "./components/DocumentForm";
import DocumentList from "./components/DocumentList";

const App = () => {
  const [documents, setDocuments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedDocuments = JSON.parse(localStorage.getItem("documents"));
    if (savedDocuments) {
      setDocuments(savedDocuments);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  const handleUpload = (doc) => {
    setDocuments([...documents, doc]);
  };

  const handleUpdate = (id, updatedDoc) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, ...updatedDoc } : doc))
    );
  };

  const handleDelete = (id) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-center mb-6">Document Upload System</h1>

      <div className="md:hidden text-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Close Form" : "Upload Document"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
       
        <div
          className={`lg:col-span-2 p-4 bg-white shadow-md rounded-md h-auto md:sticky md:top-0 md:h-[calc(90vh-4rem)] 
                      ${showForm ? "block" : "hidden"} md:block`}
        >
          <DocumentForm onUpload={handleUpload} />
        </div>

        <div className="lg:col-span-3 p-4 bg-white shadow-md rounded-md overflow-y-auto max-h-[calc(90vh-4rem)] mt-4 md:mt-0">
          <DocumentList documents={documents} onUpdate={handleUpdate} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default App;
