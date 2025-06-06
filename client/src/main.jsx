import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/components/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
