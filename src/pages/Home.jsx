import React from "react";
import { useState, useEffect } from "react";
import DocumentForm from "../components/DocumentForm";
import DocumentList from "../components/DocumentList";

const Home = () => {
  const [documents, setDocuments] = useState([]);

  // Load documents from local storage on mount
  useEffect(() => {
    const savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    setDocuments(savedDocuments);
  }, []);

  // Save documents to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(documents));
  }, [documents]);

  // Handle document upload
  const handleUpload = (newDocument) => {
    setDocuments([...documents, newDocument]);
  };

  // Handle document update
  const handleUpdate = (id, newName, newDescription) => {
    const updatedDocs = documents.map((doc) =>
      doc.id === id ? { ...doc, name: newName, description: newDescription } : doc
    );
    setDocuments(updatedDocs);
  };

  // Handle document deletion
  const handleDelete = (id) => {
    const filteredDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(filteredDocs);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Document Manager</h1>

      <DocumentForm onUpload={handleUpload} />
      <DocumentList documents={documents} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Home;
