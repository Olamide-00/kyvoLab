import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/global.css";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Services from "./pages/Services.tsx";
import Work from "./pages/Work.tsx";
import CaseStudy from "./pages/CaseStudy.tsx";
import Referral from "./pages/Referral.tsx";
import Commission from "./pages/Commission.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/commission" element={<Commission />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
