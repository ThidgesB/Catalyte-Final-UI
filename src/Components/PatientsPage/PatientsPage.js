import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import styles from './PatientsPage.module.css';

/**
 * Home Page component, shows every patient
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const { data: fetchedPatients, error: patientsError, loading: patientsLoading } = useFetch('http://localhost:8085/patients');
  const [errorMessages, setErrorMessages] = useState({});

  /**
   * Fetches every patient from the database
   */
  useEffect(() => {
    if (fetchedPatients) {
      setPatients(fetchedPatients);
    }
  }, [fetchedPatients]);

  if (patientsLoading) return <div className="error-cont">Loading...</div>;
  if (patientsError) {
    return (
      <div className="error-cont">
        Error fetching patients:
        {' '}
        {patientsError}
      </div>
    );
  }

  /**
   * Deletes a patient from the database by it's Id
   *
   * @param {property} patientId The id of the patient object
   */
  const deletePatient = (patientId) => {
    fetch(`http://localhost:8085/patients/${patientId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.status === 204) {
          return null;
        }
        if (response.ok) {
          return response.json();
        }
        if (response.status === 409) {
          return response.json().then((data) => {
            throw new Error(data.message);
          });
        }
        throw new Error('An unexpected error occurred');
      })
      .then(() => {
        setPatients((prevPatients) => prevPatients.filter((patient) => patient.id !== patientId));
      })
      .catch((error) => {
        setErrorMessages((prevErrors) => ({
          ...prevErrors,
          [patientId]: error.message
        }));
      });
  };

  return (
    <div className={styles['patients-list']}>
      <h1 className={styles['patients-header']}>All Patients</h1>
      <div>
        {patients.map((patient) => (
          <div key={patient.id} className={styles['patient-box']}>
            <p>
              Name:
              {' '}
              {patient.firstName}
              {' '}
              {patient.lastName}
            </p>
            <p>
              Age:
              {' '}
              {patient.age}
            </p>
            <p>
              Gender:
              {' '}
              {patient.gender}
            </p>
            <Link to={`/patients/${patient.id}`}>
              <button type="button" className={styles['view-btn']}>View</button>
            </Link>
            <button onClick={() => deletePatient(patient.id)} type="button" className={styles['del-btn']}>Delete</button>
            {errorMessages[patient.id] && <span className={styles['error-msg']}>{errorMessages[patient.id]}</span>}
          </div>
        ))}
      </div>
      <Link to="/patientform">
        <button type="button" className={styles['add-btn']}>Add New Patient</button>
      </Link>
    </div>
  );
};

export default PatientsPage;
