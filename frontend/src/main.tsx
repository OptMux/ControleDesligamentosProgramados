import ptBR from "date-fns/locale/pt-BR";
import React from "react";
import { registerLocale } from "react-datepicker";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("pt-BR", ptBR);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
