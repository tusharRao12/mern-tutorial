import React from "react";
import PDFItem from "./PDFItem";

const PDFList = ({ pdfs, onSelect }) => (
  <div className="grid grid-cols-1 gap-4">
    {pdfs.map((pdf, index) => (
      <PDFItem key={index} pdf={pdf} onSelect={onSelect} />
    ))}
  </div>
);

export default PDFList;
