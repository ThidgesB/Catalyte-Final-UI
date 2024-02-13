import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import './PatientDetails.css';
import PatientEncounters from '../PatientEncounters/PatientEncounters';

/**
 * Component for displaying patient details
 */
const PatientDetails = () => {
  const { id: patientId } = useParams();

  /**
   * Fetches patient by id, controls loading or error messages
   */
  const {
    data: patient, error, loading
  } = useFetch(`http://localhost:8085/patients/${patientId}`);

  if (loading) return <div className="error-cont">Loading...</div>;

  if (error) {
    return (
      <div className="error-cont">
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div className="patient-box">
      <h1>Patient Details</h1>
      <div className="patient-data">
        <p>
          ID:
          {' '}
          {patient.id}
        </p>
        <p>
          Name:
          {' '}
          {patient.firstName}
          {' '}
          {patient.lastName}
        </p>
        <p>
          SSN:
          {' '}
          {patient.ssn}
        </p>
        <p>
          Email:
          {' '}
          {patient.email}
        </p>
        <p>
          Street:
          {' '}
          {patient.street}
        </p>
        <p>
          City:
          {' '}
          {patient.city}
        </p>
        <p>
          State:
          {' '}
          {patient.state}
        </p>
        <p>
          Zip Code:
          {' '}
          {patient.postal}
        </p>
        <p>
          Age:
          {' '}
          {patient.age}
        </p>
        <p>
          Height:
          {' '}
          {patient.height}
        </p>
        <p>
          Weight:
          {' '}
          {patient.weight}
        </p>
        <p>
          Insurance:
          {' '}
          {patient.insurance}
        </p>
        <p>
          Gender:
          {' '}
          {patient.gender}
        </p>
      </div>
      <Link to={`/editpatient/${patientId}`}>
        <button type="button" className="edit-btn">Edit Patient</button>
      </Link>
      <PatientEncounters patientId={patientId} />
      <Link to={`/patients/${patientId}/encounters`}>
        <button type="button" className="add-btn">Create Encounter</button>
      </Link>
    </div>
  );
};

export default PatientDetails;
