import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Edit from "./components/Edit";
import View from "./components/View";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const App = () => {
  return (
    <>
        <BrowserRouter>
        <AppContent/>
        </BrowserRouter>
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="container-fluid">
      {location.pathname === "/" ? <Header /> : null}

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/view" element={<View />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </div>
  );
};

export default App;
