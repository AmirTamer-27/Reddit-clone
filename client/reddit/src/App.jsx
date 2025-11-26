import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CreationWizard from '../components/CommunityCreation/CreationWizard';
import CommunityDetails from '../components/CommunityCreation/CommunityDetails/CommunityDetails';
import Login from '../components/Pages/Login';
import Signup from "../components/Pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />            {/* Login page */}
        <Route path="/signup" element={<Signup />} />     {/* Signup page */}
        <Route path="/create" element={<CreationWizard />} /> {/* Creation wizard */}
        <Route path="/community/:id" element={<CommunityDetails />} /> {/* Community details */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
