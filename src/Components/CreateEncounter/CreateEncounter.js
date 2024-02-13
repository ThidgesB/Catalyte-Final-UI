import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../Input/Input';
import './CreateEncounter.css';

/**
 *
 * Form for creating an encounter
 */
const CreateEncounter = () => {
  const { id: patientId } = useParams();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [encounterData, setEncounterData] = useState({
    notes: '',
    visitCode: '',
    provider: '',
    billingCode: '',
    icd10: '',
    totalCost: '',
    copay: '',
    chiefComplaint: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    date: ''
  });

  /**
   * Handles changes to input fields
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEncounterData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validates form input data
   *
   * @returns Booleean if form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    const visitCodePattern = /^[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d$/;
    if (!encounterData.visitCode.trim()) {
      newErrors.visitCode = 'Visit Code is required';
    } else if (!visitCodePattern.test(encounterData.visitCode.trim())) {
      newErrors.visitCode = 'Visit Code must be in the format LDL DLD (ex. A1S 2D3)';
    }

    if (!encounterData.provider.trim()) {
      newErrors.provider = 'Provider is required';
    }

    if (!encounterData.billingCode.trim()) {
      newErrors.billingCode = 'Billing Code is required';
    } else {
      const billingCodePattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!billingCodePattern.test(encounterData.billingCode.trim())) {
        newErrors.billingCode = 'Billing Code must be in the format xxx.xxx.xxx-xx';
      }
    }

    if (!encounterData.icd10.trim()) {
      newErrors.icd10 = 'ICD10 Code is required';
    } else {
      const icd10Pattern = /^[A-Z]\d{2}$/;
      if (!icd10Pattern.test(encounterData.icd10.trim())) {
        newErrors.icd10 = 'ICD10 Code must be in the format LDD (e.g. A12)';
      }
    }

    if (!encounterData.totalCost.trim()) {
      newErrors.totalCost = 'Total Cost is required';
    } else {
      const totalCostValue = parseFloat(encounterData.totalCost.trim());
      if (Number.isNaN(totalCostValue) || totalCostValue <= 0 || totalCostValue > 999999) {
        newErrors.totalCost = 'Total Cost must be a valid positive number and less than $999,999';
      }
    }

    if (!encounterData.copay.trim()) {
      newErrors.copay = 'Copay is required';
    } else {
      const copayValue = parseFloat(encounterData.copay.trim());
      if (Number.isNaN(copayValue) || copayValue < 0 || copayValue > 999999) {
        newErrors.copay = 'Copay must be a valid number and less than $999,999';
      }
    }

    if (!encounterData.chiefComplaint.trim()) {
      newErrors.chiefComplaint = 'Chief Complaint is required';
    }

    if (encounterData.pulse) {
      const pulseValue = parseInt(encounterData.pulse, 10);
      if (Number.isNaN(pulseValue) || pulseValue < 1 || pulseValue > 500
        || pulseValue.toString() !== encounterData.pulse.trim()) {
        newErrors.pulse = 'Pulse must be a whole number between 1 and 500';
      }
    }

    if (encounterData.systolic) {
      const systolicValue = parseInt(encounterData.systolic, 10);
      if (Number.isNaN(systolicValue) || systolicValue < 1 || systolicValue > 500
        || systolicValue.toString() !== encounterData.systolic.trim()) {
        newErrors.systolic = 'Systolic must be a whole number between 1 and 500';
      }
    }

    if (encounterData.diastolic) {
      const diastolicValue = parseInt(encounterData.diastolic, 10);
      if (Number.isNaN(diastolicValue) || diastolicValue < 1 || diastolicValue > 500
        || diastolicValue.toString() !== encounterData.diastolic.trim()) {
        newErrors.diastolic = 'Diastolic must be a whole number between 1 and 500';
      }
    }

    const datePattern = /^\d{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)$|^(?:19|20)(?:[02468][048]|[13579][26])-02-29$/;
    if (!encounterData.date.trim()) {
      newErrors.date = 'Date is required';
    } else if (!datePattern.test(encounterData.date.trim())) {
      newErrors.date = 'Invalid date format (YYYY-MM-DD), or date value';
    } else {
      const providedDate = new Date(`${encounterData.date.trim()}T00:00:00Z`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (providedDate > today) {
        newErrors.date = 'Date cannot be in the future';
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   *
   * @param {Object} e Event object from form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://localhost:8085/patients/${patientId}/encounters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          notes: encounterData.notes.trim(),
          visitCode: encounterData.visitCode.trim(),
          provider: encounterData.provider.trim(),
          billingCode: encounterData.billingCode.trim(),
          icd10: encounterData.icd10.trim(),
          totalCost: encounterData.totalCost,
          copay: encounterData.copay,
          chiefComplaint: encounterData.chiefComplaint.trim(),
          pulse: encounterData.pulse,
          systolic: encounterData.systolic,
          diastolic: encounterData.diastolic,
          date: encounterData.date.trim()
        })
      })
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          }
          throw new Error('Failed to create encounter');
        })
        .then(() => {
          navigate(`/patients/${patientId}`);
        });
    }
  };

  return (
    <div className="form-box">
      <form onSubmit={handleSubmit}>
        <h2 className="enc-header">Add Encounter</h2>
        <Input
          type="text"
          label="Notes"
          name="notes"
          value={encounterData.notes}
          onChange={handleInputChange}
          error={errors.notes}
        />
        <Input
          type="text"
          label="Visit Code"
          name="visitCode"
          value={encounterData.visitCode}
          onChange={handleInputChange}
          error={errors.visitCode}
        />
        <Input
          type="text"
          label="Provider"
          name="provider"
          value={encounterData.provider}
          onChange={handleInputChange}
          error={errors.provider}
        />
        <Input
          type="text"
          label="Billing Code"
          name="billingCode"
          value={encounterData.billingCode}
          onChange={handleInputChange}
          error={errors.billingCode}
        />
        <Input
          type="text"
          label="ICD10"
          name="icd10"
          value={encounterData.icd10}
          onChange={handleInputChange}
          error={errors.icd10}
        />
        <Input
          type="number"
          label="Total Cost"
          name="totalCost"
          value={encounterData.totalCost}
          onChange={handleInputChange}
          error={errors.totalCost}
        />
        <Input
          type="number"
          label="Copay"
          name="copay"
          value={encounterData.copay}
          onChange={handleInputChange}
          error={errors.copay}
        />
        <Input
          type="text"
          label="Chief Complaint"
          name="chiefComplaint"
          value={encounterData.chiefComplaint}
          onChange={handleInputChange}
          error={errors.chiefComplaint}
        />
        <Input
          type="number"
          label="Pulse"
          name="pulse"
          value={encounterData.pulse}
          onChange={handleInputChange}
          error={errors.pulse}
        />
        <Input
          type="number"
          label="Systolic"
          name="systolic"
          value={encounterData.systolic}
          onChange={handleInputChange}
          error={errors.systolic}
        />
        <Input
          type="number"
          label="Diastolic"
          name="diastolic"
          value={encounterData.diastolic}
          onChange={handleInputChange}
          error={errors.diastolic}
        />
        <Input
          type="text"
          label="Date"
          name="date"
          value={encounterData.date}
          onChange={handleInputChange}
          error={errors.date}
        />
        <button type="submit" className="form-btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateEncounter;
