import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Prevent multiple widget injections
if (!document.getElementById("accessibility-widget-root")) {
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "accessibility-widget-root";
  document.body.appendChild(widgetContainer);

  function renderWidget() {
    ReactDOM.createRoot(widgetContainer).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  // Ensure the DOM is ready before rendering
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    renderWidget();
  } else {
    window.addEventListener("DOMContentLoaded", renderWidget);
  }
}
