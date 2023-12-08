import React, { useState, useCallback, useMemo } from "react";
import BasicInfoStep from "./basic_info_step";
import EducationStep from "./education_step";
import SkillsStep from "./skills_step";
import SummaryTable from "./summary_table";
import { db } from "../configs/firebase";
import { addDoc, collection } from "firebase/firestore";
import "../App.css";

const StepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    basicInfo: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      gender: "",
      emailAddress: "",
      dateOfBirth: "",
    },
    education: [],
    skills: [],
  });

  const [basicInfoValid, setBasicInfoValid] = useState(false);
  const [educationValid, setEducationValid] = useState(false);
  const [skillsValid, setSkillsValid] = useState(false);

  const formsCollectionRef = collection(db, "FormsData");
  const [refreshTable, setRefreshTable] = useState(false);

  const toggleRefreshTable = () => {
    setRefreshTable((prevRefresh) => !prevRefresh);
  };

  const validateStep = useCallback(() => {
    switch (currentStep) {
      case 1:
        // Basic Information validation logic
        return basicInfoValid;
      case 2:
        // Education validation logic
        return educationValid;
      case 3:
        // Skills validation logic
        return skillsValid;
      default:
        return false;
    }
  }, [currentStep, basicInfoValid, educationValid, skillsValid]);

  const handleNext = useCallback(() => {
    if (validateStep()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  }, [validateStep]);

  const handlePrev = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const onSubmitForm = async () => {
    try {
      await addDoc(formsCollectionRef, {
        firstName: formData.basicInfo.firstName,
        lastName: formData.basicInfo.lastName,
        gender: formData.basicInfo.gender,
        mobNumber: formData.basicInfo.mobileNumber,
        email: formData.basicInfo.emailAddress,
        dob: new Date(Date.parse(formData.basicInfo.dateOfBirth)),
        education: formData.education,
        skills: formData.skills,
        formNo: Date.now(),
      });

      // Reset form data
      setFormData({
        basicInfo: {
          firstName: "",
          lastName: "",
          mobileNumber: "",
          gender: true,
          emailAddress: "",
          dateOfBirth: "",
        },
        education: [],
        skills: [],
      });

      // Reset validation states
      setBasicInfoValid(false);
      setEducationValid(false);
      setSkillsValid(false);

      // Move to the first step
      setCurrentStep(1);

      // Show a success alert
      alert("Form submitted successfully!");

      toggleRefreshTable();
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = useCallback(async () => {
    // Check if all three steps are valid
    if (basicInfoValid && educationValid && skillsValid) {
      // Perform form submission logic
      console.log("Form submitted:", formData);

      await onSubmitForm();
    } else {
      // If any step is not valid, you can handle it accordingly
      console.log("Form submission failed. Please complete all steps.");
    }
  }, [basicInfoValid, educationValid, skillsValid, formData]);

  const steps = useMemo(
    () => [
      {
        step: 1,
        component: (
          <BasicInfoStep
            data={formData.basicInfo}
            onChange={setFormData}
            setValidation={setBasicInfoValid}
          />
        ),
      },
      {
        step: 2,
        component: (
          <EducationStep
            data={formData.education}
            onChange={setFormData}
            setValidation={setEducationValid}
          />
        ),
      },
      {
        step: 3,
        component: (
          <SkillsStep
            data={formData.skills}
            onChange={setFormData}
            setValidation={setSkillsValid}
          />
        ),
      },
    ],
    [formData]
  );

  return (
    <div
      className="step-form"
    >
      {steps.map((stepData) =>
        stepData.step === currentStep ? (
          <div
            key={stepData.step}
            className="step-outer-container"
          >
            <h3>
              {currentStep == 1
                ? "Basic Information"
                : currentStep == 2
                ? "Education"
                : "Skills"}
            </h3>
            {stepData.component}

            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="step-btn-primary"
            >
              Previous
            </button>
            <button
              onClick={
                currentStep === steps.length ? handleFormSubmit : handleNext
              }
              className="step-btn-primary"
            >
              {currentStep === steps.length ? "Submit" : "Next"}
            </button>
          </div>
        ) : null
      )}

      <h2>Existing Forms</h2>

      <div
        className="step-outer-container"
      >
        <SummaryTable refreshTable={refreshTable} />
      </div>
    </div>
  );
};

export default StepForm;