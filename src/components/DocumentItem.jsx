import React, { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.js`;

const DocumentItem = ({ doc, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(doc.name);
  const [editDescription, setEditDescription] = useState(doc.description);

  const [isExpanded, setIsExpanded] = useState(false);


  const isPDF = doc.type === "application/pdf";

  const handleView = () => {
    const byteCharacters = atob(doc.fileData.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: doc.type });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const handleSave = () => {
    if (typeof onUpdate === "function" && editName.trim() && editDescription.trim()) {
      onUpdate(doc.id, { name: editName, description: editDescription });
      setIsEditing(false);
    } else {
      console.error("onUpdate is not a function or invalid data!");
    }
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
    <li className=" flex justify-between items-center">
      <div className="flex-grow">
        {isEditing ? (
          <div className="flex flex-col">
            <input
              type="text"
              className="border p-2 rounded mb-2"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <textarea
              className="border p-2 rounded"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            ></textarea>
            <div className="mt-2 flex gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded" onClick={handleSave}>
                Save
              </button>
              <button className="bg-gray-500 text-white px-3 py-1 rounded" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="p-4 border rounded-md shadow-md bg-white">
      <h2 className="font-bold">{doc.name}</h2>
      <br/>
      <hr/>
      <br/>
      <p className={`text-gray-600 ${!isExpanded ? "line-clamp-3" : ""}`}>
        {doc.description}
      </p>

      {doc.description.length > 100 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 mt-2"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </div>
          </>
        )}
      </div>

     
    </li>
     <div className="space-x-2 mt-3">
     {!isEditing && (
       <>
         <button onClick={() => setIsEditing(true)} className="bg-yellow-400 text-white px-3 py-1 rounded-sm hover:bg-yellow-500">
           Edit
         </button>
         <button onClick={handleView} className="bg-green-400 text-white px-3 py-1 rounded-sm hover:bg-green-500">
           View
         </button>
         <button onClick={() => onDelete(doc.id)} className="bg-red-400 text-white px-3 py-1 rounded-sm hover:bg-red-500">
         Delete
         </button>
       </>
     )}
     
   </div>
   </div>
  );
};

export default DocumentItem;
