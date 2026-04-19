// ReactDOM is what connects React to the actual HTML page
import ReactDOM from "react-dom/client";

// Import the root component
import App from "./App";

// Import global styles
import "./app.css";


// ─────────────────────────────────────────
// ENTRY POINT
// This is the only file that touches the real DOM directly.
// It finds the <div id="root"> in your index.html file
// and mounts the entire React app inside it.
//
// You will almost never need to edit this file.
// ─────────────────────────────────────────
ReactDOM.createRoot(document.getElementById("root")).render(
  // StrictMode is a development tool — it runs checks and
  // warns you about potential problems in your code.
  // It has no effect in production.
  <StrictMode>
    <App />
  </StrictMode>
);