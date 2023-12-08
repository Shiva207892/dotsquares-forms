import React, { useState, useEffect, useCallback } from "react";
import "../App.css";

const EducationStep = ({ data, onChange, setValidation }) => {
  const [valid, setValid] = useState(false);

  const validateStep = useCallback(() => {
    // Education validation logic
    const isValid = data.every((edu) => {
      if (edu.course && edu.universityName && edu.yearOfCompletion) {
        // Ensure it's a valid year between 1900 and 2024
        const yearValue = parseInt(edu.yearOfCompletion, 10);
        if (isNaN(yearValue) || yearValue < 1900 || yearValue > 2024) {
          return false;
        }
        return true;
      }
    });

    if (JSON.stringify(data) != "[]") {
      console.log(isValid, "  Education Validation: " + JSON.stringify(data));
      setValid(isValid);
      setValidation(isValid);
    }
  }, [data]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  const handleAddEducation = () => {
    onChange((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        { course: "", universityName: "", yearOfCompletion: "" },
      ],
    }));
  };

  const handleRemoveEducation = (index) => {
    onChange((prevData) => ({
      ...prevData,
      education: prevData.education.filter((_, i) => i !== index),
    }));
  };

  const handleEducationChange = (index, field, value) => {
    let newValue = value;

    onChange((prevData) => ({
      ...prevData,
      education: prevData.education.map((edu, i) =>
        i === index ? { ...edu, [field]: newValue } : edu
      ),
    }));
  };

  return (
    <div className="step-inner-container">
      {data.map((edu, index) => (
        <div key={index}>
          <input
            className="text-input-education"
            type="text"
            placeholder="Course..."
            value={edu.course}
            onChange={(e) =>
              handleEducationChange(index, "course", e.target.value)
            }
          />
          <input
            className="text-input-education"
            type="text"
            placeholder="University..."
            value={edu.universityName}
            onChange={(e) =>
              handleEducationChange(index, "universityName", e.target.value)
            }
          />
          <div className="row-skill" key={index}>
            <input
              className="text-input-skill"
              type="number"
              placeholder="Completion Year..."
              value={edu.yearOfCompletion}
              onChange={(e) =>
                handleEducationChange(index, "yearOfCompletion", e.target.value)
              }
              min="1900"
              max="2024"
              maxLength={4}
            />
            <button
              className="btn-remove-skill"
              onClick={() => handleRemoveEducation(index)}
            >
              Remove
            </button>
          </div>
          {!valid && (
        <p style={{ color: "black" }}>
          * Please fill in all the required fields for each education entry and year of completion must be in range (1900-2023).
        </p>
      )}
        </div>
      ))}
     <div className="btn-row">
     <button className="btn-add" onClick={handleAddEducation}>
        Add Education
      </button>
     </div>
    </div>
  );
};

export default EducationStep;
