import React from "react";
import AccessibilityPanel from "./components/AccessibilityPanel";
import {
  AccessibilityProvider,
  useAccessibility,
} from "./context/AccessibilityContext";

const ContentWrapper = ({ children }) => {
  const { settings } = useAccessibility();

  const classes = [
    "accessible-content",
    settings.highlightTitle && "highlight-titles",
    settings.highlightLinks && "highlight-links",
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

const App = () => {
  return (
    <AccessibilityProvider>
      <ContentWrapper>
        <div className="container py-5">
          <h1 className="display-4 mb-3">My Accessible Vite App</h1>
          <p>
            This is an example paragraph with a <a href="#">link</a>.
          </p>
        </div>
      </ContentWrapper>
      <AccessibilityPanel />
    </AccessibilityProvider>
  );
};

export default App;
