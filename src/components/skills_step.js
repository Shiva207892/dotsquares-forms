import React, { useState, useEffect, useCallback } from 'react';
import "../App.css";

const SkillsStep = ({ data, onChange, setValidation }) => {
  const [valid, setValid] = useState(false);

  const validateStep = useCallback(() => {
    // Skills validation logic
    const isValid = data.every(skill => skill.toString().trim() !== ''); // Check if every skill is non-empty

    if(JSON.stringify(data) != '[]') {
    console.log(isValid, '  Skill Validation: ' + JSON.stringify(data));
    setValid(isValid);
    setValidation(isValid);
    }
  }, [data]);

  useEffect(() => {
    validateStep();
  }, [validateStep]);

  const handleAddSkill = () => {
    onChange((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ''],
    }));
  };

  const handleRemoveSkill = (index) => {
    onChange((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index, value) => {
    onChange((prevData) => {
      const updatedSkills = [...prevData.skills];
      updatedSkills[index] = value;
      return {
        ...prevData,
        skills: updatedSkills,
      };
    });
  };

  return (
    <div className='step-inner-container'>
      {data.map((skill, index) => (
        <div className='row-skill' key={index}>
          <input
            className='text-input-skill'
            type="text"
            placeholder='Type skill Name...'
            value={skill}
            onChange={(e) => handleSkillChange(index, e.target.value)}
          />
          <button className='btn-remove-skill' onClick={() => handleRemoveSkill(index)}>Remove</button>
        </div>
      ))}
      <button
      className='btn-add'
      onClick={handleAddSkill}>Add Skill</button>
      {valid ? null : <p style={{ color: 'black' }}>* Please fill in all the required fields for each skill entry.</p>}
    </div>
  );
};

export default SkillsStep;