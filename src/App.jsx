import { BrowserRouter, Routes, Route } from "react-router-dom";

import GeneratedTicket from "./Pages/GeneratedTicket/GeneratedTicket";
import "./App.css";
import "./styles.css";
import HomePage from "./Pages/HomePage/HomePage.jsx";
import { FormProvider } from "./Context/FormContext.jsx";
function App() {
  return (
    <FormProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ticket" element={<GeneratedTicket />} />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
