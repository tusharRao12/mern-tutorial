import React from "react";

const PDFReader = ({ pdf, onBack }) => {
  if (!pdf) return null; 

  return (
    <div className="p-4 border rounded">
      <button onClick={onBack} className="mb-2 p-2 border rounded bg-gray-200">
        Back
      </button>
      <h2 className="font-bold mb-2">{pdf.name}</h2>
      <p className="mb-2">By {pdf.author}</p>
      <iframe
        src={pdf.link}
        title={pdf.name}
        className="w-full h-96"
      ></iframe>
    </div>
  );
};

export default PDFReader;
