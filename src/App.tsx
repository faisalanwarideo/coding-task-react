import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Donations from "./components/Donations";
import CreateDonation from "./components/CreateDonation";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Donations />} />
        <Route path="new" element={<CreateDonation />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);