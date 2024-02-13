import React from 'react';

/**
 * Component for displaying an encounter's details
 * @param {Object} Encounter Encounter object to dsiplay it's details
 */
const EncounterDetails = ({ encounter }) => {
  if (!encounter) return null;

  return (
    <div>
      <h2>
        Encounter Details
      </h2>
      <p>
        Id:
        {' '}
        {encounter.id}
      </p>
      <p>
        Notes:
        {' '}
        {encounter.notes}
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
        Billing Code:
        {' '}
        {encounter.billingCode}
      </p>
      <p>
        ICD10:
        {' '}
        {encounter.icd10}
      </p>
      <p>
        Total Cost:
        {' '}
        {encounter.totalCost}
      </p>
      <p>
        Copay:
        {' '}
        {encounter.copay}
      </p>
      <p>
        Chief Complaint:
        {' '}
        {encounter.chiefComplaint}
      </p>
      <p>
        Pulse:
        {' '}
        {encounter.pulse}
      </p>
      <p>
        Systolic Pressure:
        {' '}
        {encounter.systolic}
      </p>
      <p>
        Diastolic Pressure:
        {' '}
        {encounter.diastolic}
      </p>
      <p>
        Date:
        {' '}
        {encounter.date}
      </p>
    </div>
  );
};

export default EncounterDetails;
