import React from "react";

const PDFItem = ({ pdf, onSelect }) => {
  return (
    <div
      className="p-4 border rounded cursor-pointer hover:bg-gray-100 flex items-center gap-4"
      onClick={() => onSelect(pdf)}>
      <div>
        <h2 className="font-bold">{pdf.name}</h2>
        <p>{pdf.author}</p>
      </div>
    </div>
  );
};

export default PDFItem;
