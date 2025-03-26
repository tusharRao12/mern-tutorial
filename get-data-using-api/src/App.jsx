import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import PDFList from "./components/PDFList";
import PDFReader from "./components/PDFReader"; 

const API_URL = "https://api.npoint.io/dee51ea017d20efdfcc8";

const App = () => {
  const [pdfs, setPdfs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setPdfs(response.data || []); 
      })
      .catch((error) => console.error("Error fetching PDFs:", error));
  }, []);

  const filteredPdfs = pdfs.filter((pdf) =>
    pdf.name?.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  return (
    <div className="p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {selectedPdf ? (
        <PDFReader pdf={selectedPdf} onBack={() => setSelectedPdf(null)} />
      ) : (
        <PDFList pdfs={filteredPdfs} onSelect={setSelectedPdf} />
      )}
    </div>
  );
};

export default App;
