import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ClientList from "./components/ClientList";
import VoitureList from "./components/VoitureList";
import AddClient from "./components/AddClient";
import AddVoiture from "./components/AddVoiture";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients" element={<ClientList />} />
          <Route path="/voitures" element={<VoitureList />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/add-voiture" element={<AddVoiture />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
