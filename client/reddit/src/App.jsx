import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import CommunityDetails from '../components/CommunityCreation/CommunityDetails/CommunityDetails';
import CommunitiesPage from '../components/DisplayCommunities/CommunitiesPage'
import CommunityPage from '../components/CommunityPage/CommunityPage';
import ExploreCommunities from '../components/ExploreCommunities/ExploreCommunities'
import CreationWizard from '../components/CommunityCreation/CreationWizard';
import { BrowserRouter } from "react-router-dom";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';



function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
        <Route path="/api/communities/:communityId" element={<CommunityPage />} />
        <Route path="/api/communities/best/:number" element= {<CommunitiesPage />} />
        <Route path="/api/communities/category" element= {<ExploreCommunities />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}
export default App;
