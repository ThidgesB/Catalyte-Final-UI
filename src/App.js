import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer/Footer';
import NotFound from './Components/NotFound/NotFound';
import NavBar from './Components/NavBar/NavBar';
import PatientsPage from './Components/PatientsPage/PatientsPage';
import PatientDetails from './Components/PatientsDetails/PatientsDetails';
import PatientForm from './Components/PatientForm/PatientForm';
import EditPatientDetails from './Components/EditPatientDetails/EditPatientDetails';
import CreateEncounter from './Components/CreateEncounter/CreateEncounter';
import EditEncounter from './Components/EditEncounter/EditEncounter';

const App = () => (
  <BrowserRouter>
    <div className="content">
      <NavBar />
      <Routes>
        <Route path="/" element={<PatientsPage />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/patientform" element={<PatientForm />} />
        <Route path="/editpatient/:id" element={<EditPatientDetails />} />
        <Route path="/patients/:id/encounters" element={<CreateEncounter />} />
        <Route path="/patients/:patientId/encounters/:encounterId" element={<EditEncounter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;
