import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import EncounterDetails from '../EncounterDetails/EncounterDetails';
import './PatientEncounters.css';

/**
 * Component displaying encounters related to a patient by id
 *
 * @param {property} patientId The id of the patient for fetching related encounters
 */
const PatientEncounters = ({ patientId }) => {
  const { data: encounters, error, loading } = useFetch(`http://localhost:8085/patients/${patientId}/encounters`);
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2>Patient Encounters</h2>
      <ul>
        {encounters.map((encounter) => (
          <li key={encounter.id}>
            <p>
              Id:
              {' '}
              {encounter.id}
            </p>
            <p>
              Visit Code:
              {' '}
              {encounter.visitCode}
            </p>
            <p>
              Provider:
              {' '}
              {encounter.provider}
            </p>
            <p>
              Date:
              {' '}
              {encounter.date}
            </p>
            <button type="button" onClick={() => setSelectedEncounter(encounter)} className="view-btn">View Details</button>
          </li>
        ))}
      </ul>
      {selectedEncounter && (
        <div className="modal">
          <EncounterDetails encounter={selectedEncounter} />
          <button type="button" onClick={() => setSelectedEncounter(null)} className="close-btn">Close</button>
          <Link to={`/patients/${patientId}/encounters/${selectedEncounter.id}`}>
            <button type="button" className="edit-btn">Edit Encounter</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default PatientEncounters;
