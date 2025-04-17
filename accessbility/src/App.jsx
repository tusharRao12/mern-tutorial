import React from "react";
import AccessibilityPanel from "./components/AccessibilityPanel";
import { AccessibilityProvider } from "./context/AccessibilityContext";

const App = () => {
  return (
    <AccessibilityProvider>
      <div className="container py-5">
        <h1 className="display-4 mb-3">My Accessible Vite App</h1>
        <p>
          This is an example paragraph with a <a href="#">link</a>.
        </p>
        <AccessibilityPanel />
      </div>
    </AccessibilityProvider>
  );
};

export default App;
