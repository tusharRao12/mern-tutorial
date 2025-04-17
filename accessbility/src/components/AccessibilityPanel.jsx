import React, { useEffect, useState } from "react";
import { useAccessibility } from "../context/AccessibilityContext";

const AccessibilityPanel = () => {
  const { settings, setSettings } = useAccessibility();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--font-size",
      `${settings.fontSize}px`
    );
    document.documentElement.style.setProperty(
      "--line-height",
      settings.lineHeight
    );
    document.documentElement.style.setProperty(
      "--letter-spacing",
      `${settings.letterSpacing}px`
    );
    document.documentElement.style.setProperty(
      "--font-weight",
      settings.fontWeight
    );
    document.documentElement.style.setProperty(
      "--font-family",
      settings.dyslexiaFont ? "OpenDyslexic, sans-serif" : "Arial, sans-serif"
    );

    const themes = {
      light: ["#ffffff", "#000000"],
      dark: ["#121212", "#ffffff"],
      "high-contrast": ["#000000", "#FFD700"],
    };
    const [bg, text] = themes[settings.theme];
    document.documentElement.style.setProperty("--bg-color", bg);
    document.documentElement.style.setProperty("--text-color", text);

    document.body.style.filter =
      settings.saturation === "low"
        ? "saturate(50%)"
        : settings.saturation === "high"
        ? "saturate(200%)"
        : "saturate(100%)";

    document.body.style.cursor = settings.bigCursor
      ? "url('https://cur.cursors-4u.net/cursors/cur-11/cur1030.cur'), auto"
      : "auto";

    document.body.classList.toggle("stop-animations", settings.stopAnimations);
    document.body.classList.toggle("highlight-titles", settings.highlightTitle);
    document.body.classList.toggle("highlight-links", settings.highlightLinks);
  }, [settings]);

  return (
    <div
      className="position-fixed bottom-0 end-0 m-3"
      style={{ zIndex: 1050, maxWidth: "300px" }}
    >
      <button
        className="btn btn-primary w-100 mb-2"
        onClick={() => setOpen(!open)}
      >
        🧩 Accessibility
      </button>

      {open && (
        <div className="card p-3 shadow bg-light">
          <h5 className="mb-3">Accessibility Settings</h5>

          <div className="mb-2">
            <label>Font Size</label>
            <input
              type="range"
              min="12"
              max="32"
              value={settings.fontSize}
              className="form-range"
              onChange={(e) =>
                setSettings({ ...settings, fontSize: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="mb-2">
            <label>Line Height</label>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={settings.lineHeight}
              className="form-range"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  lineHeight: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="mb-2">
            <label>Letter Spacing</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={settings.letterSpacing}
              className="form-range"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  letterSpacing: parseFloat(e.target.value),
                })
              }
            />
          </div>

          <div className="mb-2">
            <label>Font Weight</label>
            <input
              type="range"
              min="100"
              max="900"
              step="100"
              value={settings.fontWeight}
              className="form-range"
              onChange={(e) =>
                setSettings({
                  ...settings,
                  fontWeight: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.dyslexiaFont}
              onChange={(e) =>
                setSettings({ ...settings, dyslexiaFont: e.target.checked })
              }
            />
            <label className="form-check-label">Dyslexia Font</label>
          </div>

          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.highlightTitle}
              onChange={(e) =>
                setSettings({ ...settings, highlightTitle: e.target.checked })
              }
            />
            <label className="form-check-label">Highlight Titles</label>
          </div>

          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.highlightLinks}
              onChange={(e) =>
                setSettings({ ...settings, highlightLinks: e.target.checked })
              }
            />
            <label className="form-check-label">Highlight Links</label>
          </div>

          <div className="form-check form-switch mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.stopAnimations}
              onChange={(e) =>
                setSettings({ ...settings, stopAnimations: e.target.checked })
              }
            />
            <label className="form-check-label">Stop Animations</label>
          </div>

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={settings.bigCursor}
              onChange={(e) =>
                setSettings({ ...settings, bigCursor: e.target.checked })
              }
            />
            <label className="form-check-label">Big Cursor</label>
          </div>

          <div className="mb-2">
            <label>Theme</label>
            <select
              className="form-select"
              value={settings.theme}
              onChange={(e) =>
                setSettings({ ...settings, theme: e.target.value })
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="high-contrast">High Contrast</option>
            </select>
          </div>

          <div>
            <label>Saturation</label>
            <select
              className="form-select"
              value={settings.saturation}
              onChange={(e) =>
                setSettings({ ...settings, saturation: e.target.value })
              }
            >
              <option value="normal">Normal</option>
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessibilityPanel;
