import React, { createContext, useContext, useState } from "react";

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0,
    fontWeight: 400,
    dyslexiaFont: false,
    theme: "light",
    saturation: "normal",
    highlightTitle: false,
    highlightLinks: false,
    stopAnimations: false,
    bigCursor: false,
  });

  return (
    <AccessibilityContext.Provider value={{ settings, setSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
