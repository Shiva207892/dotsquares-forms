import { useState, useEffect, useCallback } from "react";
import "../App.css";

const BasicInfoStep = ({ data, onChange, setValidation }) => {
  const [valid, setValid] = useState({
    firstName: true,
    lastName: true,
    mobileNumber: true,
    emailAddress: true,
    dateOfBirth: true,
    gender: true,
  });

  const validateStep = useCallback(() => {
    // Basic Information validation logic
    const validations = {
      firstName: validateFirstName,
      lastName: validateLastName,
      mobileNumber: validateMobileNumber,
      emailAddress: validateEmailAddress,
      dateOfBirth: validateDateOfBirth,
      gender: validateGender,
    };

    const isValid = Object.keys(validations).every((field) => {
      const fieldIsValid = validations[field](data[field]);
      setValid((prevValid) => ({ ...prevValid, [field]: fieldIsValid }));
      return fieldIsValid;
    });

    console.log(
      isValid,
      "  Basic Information Validation: " + JSON.stringify(data)
    );

    setValidation(isValid);
  }, [data]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;

      // For checkboxes, use the 'checked' property instead of 'value'
      const newValue = type === "checkbox" ? checked : value;

      onChange((prevData) => ({
        ...prevData,
        basicInfo: {
          ...prevData.basicInfo,
          [name]: newValue,
        },
      }));
    },
    [onChange]
  );

  const validateFirstName = (value) => {
    // Add your validation logic for the first name
    const isValid = value.trim() !== "";
    setValid((prevValid) => ({ ...prevValid, firstName: isValid }));
    return isValid;
  };

  const validateLastName = (value) => {
    // Add your validation logic for the last name
    const isValid = value.trim() !== "";
    setValid((prevValid) => ({ ...prevValid, lastName: isValid }));
    return isValid;
  };

  const validateMobileNumber = (value) => {
    // Add your validation logic for the mobile number
    const isValid = /^\d{10}$/.test(value);
    setValid((prevValid) => ({ ...prevValid, mobileNumber: isValid }));
    return isValid;
  };

  const validateEmailAddress = (value) => {
    // Add your validation logic for the email address
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setValid((prevValid) => ({ ...prevValid, emailAddress: isValid }));
    return isValid;
  };

  const validateGender = (value) => {
    // Add your validation logic for the gender
    const isValid = ["Male", "Female", "Other"].includes(value);
    setValid((prevValid) => ({ ...prevValid, gender: isValid }));
    return isValid;
  };

  const validateDateOfBirth = (value) => {
    // Add your validation logic for the date of birth
    const isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
    setValid((prevValid) => ({ ...prevValid, dateOfBirth: isValid }));
    return isValid;
  };

  return (
    <div
      className="step-inner-container"
    >
      <div style={{ padding: "5px" }}>
        <input
          className={"text-input"}
          type="text"
          name="firstName"
          placeholder=" First Name..."
          value={data.firstName}
          onChange={handleChange}
        />
        {!valid.firstName && (
          <p className="error-message">Please enter a valid first name.</p>
        )}
      </div>
      <div style={{ padding: "5px" }}>
        <input
          className={"text-input"}
          type="text"
          name="lastName"
          placeholder="Last Name..."
          value={data.lastName}
          onChange={handleChange}
        />
        {!valid.lastName && (
          <p className="error-message">Please enter a valid last name.</p>
        )}
      </div>

      <div style={{ padding: "5px" }}>
        <input
          className={"text-input"}
          type="tel"
          name="mobileNumber"
          placeholder="Mobile Number..."
          value={data.mobileNumber}
          onChange={handleChange}
          maxLength={10}
        />
        {!valid.mobileNumber && (
          <p className="error-message">Please enter a valid mobile number.</p>
        )}
      </div>

      <div style={{ padding: "5px" }}>
        <input
          className={"text-input"}
          type="email"
          name="emailAddress"
          placeholder="Email..."
          value={data.emailAddress}
          onChange={handleChange}
        />
        {!valid.emailAddress && (
          <p className="error-message">Please enter a valid email address.</p>
        )}
      </div>

      <div style={{ textAlign: "left", padding: "5px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <label className="label-basic">Date of Birth</label>
          <input
            className="text-input-dob"
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            value={data.dateOfBirth}
            onChange={handleChange}
            min="1970-01-01" // Set the minimum date
            max={new Date().toISOString().split("T")[0]} // Set the maximum date (current date)
          />
        </div>
        {!valid.dateOfBirth && (
          <p className="error-message">Please enter a valid date of birth.</p>
        )}
      </div>

      <div
        style={{
          padding: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <label className="label-basic">Gender :</label>
          <div className="label-basic">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={data.gender === "Male"}
              onChange={handleChange}
            />
            <label htmlFor="Male">Male</label>
          </div>
          <div className="label-basic">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={data.gender === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="Female">Female</label>
          </div>
          <div className="label-basic">
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={data.gender === "Other"}
              onChange={handleChange}
            />
            <label htmlFor="Other">Other</label>
          </div>
        </div>
        {!valid.gender && (
          <p className="error-message">Please select a valid gender.</p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;