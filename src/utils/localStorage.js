const STORAGE_KEY = "documents";

export const loadDocuments = () => {
  try {
    const savedDocuments = localStorage.getItem(STORAGE_KEY);
    return savedDocuments ? JSON.parse(savedDocuments) : [];
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    localStorage.removeItem(STORAGE_KEY); 
    return [];
  }
};

export const saveDocuments = (documents) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};

export const deleteDocument = (id) => {
  const documents = loadDocuments();
  const updatedDocs = documents.filter((doc) => doc.id !== id);
  saveDocuments(updatedDocs);
};

export const clearDocuments = () => {
  localStorage.removeItem(STORAGE_KEY);
};const handleUpload = (doc) => {
  const metadata = {
    id: doc.id,
    name: doc.name,
    description: doc.description,
    fileUrl: doc.fileUrl, 
  };

  const updatedDocuments = [...documents, metadata];
  setDocuments(updatedDocuments);

  try {
    localStorage.setItem("documents", JSON.stringify(updatedDocuments)); 
  } catch (error) {
    console.error("LocalStorage quota exceeded:", error);
  }
};


