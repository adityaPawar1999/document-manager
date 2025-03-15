import React from "react";
import DocumentItem from "./DocumentItem";

const DocumentList = ({ documents, onUpdate, onDelete }) => {
  return (
    <div className="max-w-2xl mx-auto mt-6 ">
      
      <h2 className="text-xl font-semibold mb-4">Uploaded Documents</h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <DocumentItem key={doc.id} doc={doc} onUpdate={onUpdate} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
