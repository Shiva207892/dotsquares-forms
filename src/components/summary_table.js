import React, { useEffect, useState } from "react";
import { db } from "../configs/firebase";
import { getDocs, deleteDoc, collection, doc } from "firebase/firestore";
import { formatTimestamp } from "../utils/format_dates";
import "../App.css";

const SummaryTable = ({ refreshTable }) => {
  const [formsList, setFormsList] = useState([]);

  const formsCollectionRef = collection(db, "FormsData");

  const deleteFormsData = async (id) => {
    const formDoc = doc(db, "FormsData", id);
    try {
      await deleteDoc(formDoc);
      await getFormsData();
    } catch (err) {
      console.error(err);
    }
  };

  const getFormsData = async () => {
    // Read data from the database
    try {
      const data = await getDocs(formsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

    // Sort the data based on the descending order of formNo
    const sortedData = filteredData.sort((a, b) => b.formNo - a.formNo);

    console.log(sortedData);

    // Set forms data
    setFormsList(sortedData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFormsData();
  }, [refreshTable]);

  const renderEducationHeader = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3>Education</h3>
        <div style={{ ...educationRowStyle, flex: 1 }}>
          <div style={educationCellStyle}>Course</div>
          <div style={educationCellStyle}>University</div>
          <div style={educationCellStyle}>Year of Completion</div>
        </div>
      </div>
    );
  };

  const renderEducation = (educations) => {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {educations.map((education, index) => (
          <div
            key={`education-${index}`}
            style={{ ...educationRowStyle, flex: 1 }}
          >
            <div style={educationCellStyle}>{education.course}</div>
            <div style={educationCellStyle}>{education.universityName}</div>
            <div style={educationCellStyle}>{education.yearOfCompletion}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderSkills = (skills) => {
    return (
      <tr>
        {skills.map((skill, index) => (
          <td
            key={`skill-${index}`}
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              padding: 5,
            }}
          >
            <div
              style={{
                padding: 5,
                border: "2px solid",
                backgroundColor: "lightblue",
                borderRadius: "5px",
                color: "#8aaaff",
              }}
            >
              {skill}
            </div>
          </td>
        ))}
      </tr>
    );
  };

  const renderActions = (formID) => {
    return (
      <div>
        <button className='btn-remove-form' onClick={() => deleteFormsData(formID)}>Delete</button>
      </div>
    );
  };

  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: "10%",
        minWidth: "90%",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    >
      <div className="table-responsive">
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Sr No</th>
              <th style={tableHeaderStyle}>First Name</th>
              <th style={tableHeaderStyle}>Last Name</th>
              <th style={tableHeaderStyle}>Mobile Number</th>
              <th style={tableHeaderStyle}>Gender</th>
              <th style={tableHeaderStyle}>Email Address</th>
              <th style={tableHeaderStyle}>Date of Birth</th>
              <th style={{ ...tableHeaderStyle, padding: "0px" }}>
                {renderEducationHeader()}
              </th>
              <th style={tableHeaderStyle}>Skills</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Render form data */}
            {formsList.map((form, index) => (
              <tr key={`form-${index}`} style={tableRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{form.firstName}</td>
                <td style={tableCellStyle}>{form.lastName}</td>
                <td style={tableCellStyle}>{form.mobNumber}</td>
                <td style={tableCellStyle}>{form.gender}</td>
                <td style={tableCellStyle}>{form.email}</td>
                <td style={tableCellStyle}>{formatTimestamp(form.dob)}</td>
                <td>{renderEducation(form.education)}</td>
                <td style={tableCellStyle}>{renderSkills(form.skills)}</td>
                <td style={tableCellStyle}>{renderActions(form.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// CSS styles
const tableHeaderStyle = {
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "8px",
};

const tableRowStyle = {
  border: "1px solid #dddddd",
  backgroundColor: "#4abba1",
};

const tableCellStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "#4abba1",
};

const educationRowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "stretch", // Ensures cells take up the available space
};

const educationCellStyle = {
  flex: 1, // Each cell takes up an equal portion of the available space
  border: "1px solid #dddddd",
  textAlign: "center",
  padding: "8px",
  backgroundColor: "#4abba1",
};

export default SummaryTable;
