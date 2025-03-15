// import React from "react";

// const DocumentViewer = ({ fileData, fileType, onClose }) => {
//   return (
//     <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-4 rounded shadow-lg max-w-3xl w-full">
//         <div className="flex justify-between items-center mb-2">
//           <h2 className="text-lg font-semibold">Document Preview</h2>
//           <button
//             className="bg-red-500 text-white px-3 py-1 rounded"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>

//         <div className="border p-2 rounded max-h-[80vh] overflow-auto">
//           {fileType === "application/pdf" ? (
//             <iframe
//               src={fileData}
//               className="w-full h-[500px]"
//               title="PDF Viewer"
//             ></iframe>
//           ) : (
//             <img
//               src={fileData}
//               alt="Document Preview"
//               className="max-w-full max-h-[500px] mx-auto"
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DocumentViewer;
