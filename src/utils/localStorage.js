const STORAGE_KEY = "documents";

// Load documents from localStorage
export const loadDocuments = () => {
  try {
    const savedDocuments = localStorage.getItem(STORAGE_KEY);
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
    return [];
  }
};

// Save documents to localStorage
export const saveDocuments = (documents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};

// Delete a document from localStorage
export const deleteDocument = (id) => {
  const documents = loadDocuments();
  const updatedDocs = documents.filter((doc) => doc.id !== id);
  saveDocuments(updatedDocs);
};

// Clear all documents (optional)
export const clearDocuments = () => {
  localStorage.removeItem(STORAGE_KEY);
};
const handleUpload = (doc) => {
  const metadata = { id: doc.id, name: doc.name, description: doc.description, fileUrl: doc.fileUrl };
  const updatedDocuments = [...documents, metadata];

  setDocuments(updatedDocuments);
  localStorage.setItem("documents", JSON.stringify(updatedDocuments)); // Store only metadata
};

