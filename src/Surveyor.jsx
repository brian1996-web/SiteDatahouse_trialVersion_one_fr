import React, { useState } from "react";
import "./Surveyor.css";

function Surveyor() {
  const [rows, setRows] = useState([
    { activity: "Sample Activity", achievement: 5, date: new Date().toLocaleDateString() }, // Add date to initial row
  ]);

  const [columns, setColumns] = useState([
    { name: "Activity", field: "activity", hasUnit: false },
    {
      name: "Day's Achievement",
      field: "achievement",
      hasUnit: true,
      units: ["meters", "kilometers", "meters cubed", "liters"],
    },
    { name: "Date", field: "date", hasUnit: false }, // New column for Date
  ]);

  const [siteTitle, setSiteTitle] = useState("Type here: Site Title");
  const [siteType, setSiteType] = useState(
    "Type here: Site nature e.g. Earthworks, buildings"
  );

  // Function to add a new row with the current date
  const addRow = () => {
    setRows([
      ...rows,
      { activity: "New Activity", achievement: "", date: new Date().toLocaleDateString() }, // Add current date to new row
    ]);
  };

  // Function to remove the last row
  const removeLastRow = () => {
    if (rows.length > 0) {
      setRows(rows.slice(0, -1));
    }
  };

  // Function to remove a specific row
  const removeRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  // Function to handle input changes for activity and achievement
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Function to handle sending the data
  const handleSend = () => {
    console.log("Table Data Sent:", rows); // Replace with your send logic
    alert("Data has been sent! Check the console.");
  };

  return (
    <div className="dynamic-table-container">
      {/* Site Title */}
      <div
        className="site-title"
        contentEditable
        onInput={(e) => setSiteTitle(e.target.innerText)}
        suppressContentEditableWarning
      >
        {siteTitle}
      </div>

      {/* Site Type */}
      <div
        className="site-type"
        contentEditable
        onInput={(e) => setSiteType(e.target.innerText)}
        suppressContentEditableWarning
      >
        {siteType}
      </div>

      {/* Dropdown for Add/Remove Actions */}
      <div className="dropdown">
        <button className="dropbtn">Actions</button>
        <div className="dropdown-content">
          <button onClick={addRow}>Add Row</button>
          <button onClick={removeLastRow}>Remove Last Row</button>
        </div>
      </div>

      {/* Table */}
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.name}</th>
            ))}
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {column.hasUnit ? (
                    <div className="input-with-unit">
                      <input
                        type="number"
                        value={row[column.field] || ""}
                        onChange={(e) =>
                          handleInputChange(
                            rowIndex,
                            column.field,
                            e.target.value
                          )
                        }
                        placeholder={column.name}
                      />

                      <select
                        value={row.unit || "meters"}
                        onChange={(e) =>
                          handleInputChange(rowIndex, "unit", e.target.value)
                        }
                      >
                        {column.units?.map((unit, index) => (
                          <option key={index} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : column.field === "date" ? (
                    <div>{row[column.field]}</div> // Display the date without allowing editing
                  ) : (
                    <input
                      type="text"
                      value={row[column.field] || ""}
                      onChange={(e) =>
                        handleInputChange(
                          rowIndex,
                          column.field,
                          e.target.value
                        )
                      }
                      placeholder={column.name}
                    />
                  )}
                </td>
              ))}
              <td>
                <button
                  className="remove-row-btn"
                  onClick={() => removeRow(rowIndex)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Send Button */}
      <div className="send-button-container">
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Surveyor;
