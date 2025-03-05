import React, { useState, useEffect } from "react";
import "./SiteEngineer.css";
import ProjectDetails from "./ProjectDetails"; // ✅ Ensure the path is correct

function SiteEngineer() {
  const [rows, setRows] = useState([
    {
      activity: "site activity",
      dailyTarget: "",
      achievement: "",
      date: new Date().toLocaleDateString(),
    },
  ]);

  const [columns, setColumns] = useState([
    { name: "Activity", field: "activity", hasUnit: false },
    { name: "Daily Target", field: "dailyTarget", hasUnit: false },
    { name: "Day's Achievement", field: "achievement", hasUnit: false },
    { name: "Date", field: "date", hasUnit: false },
  ]);

  const [siteTitle, setSiteTitle] = useState("Type here: Site Title");
  const [siteType, setSiteType] = useState(
    "Type here: Site nature e.g. Earthworks, buildings"
  );

  // Function to add a new row
  const addRow = () => {
    setRows([
      ...rows,
      {
        activity: "New Activity",
        dailyTarget: "",
        achievement: "",
        date: new Date().toLocaleDateString(),
      },
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

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  // Function to add a new column
  const addColumn = () => {
    const newField = `newColumn${columns.length + 1}`;
    const newColumn = { name: "New Column", field: newField, hasUnit: false };

    setColumns([...columns, newColumn]);

    // Add new empty data for each row for the new column
    setRows(
      rows.map((row) => ({
        ...row,
        [newField]: "",
      }))
    );
  };

  // Function to remove a column
  const removeColumn = (index) => {
    const columnToRemove = columns[index];
    setColumns(columns.filter((_, i) => i !== index));

    // Remove the corresponding field from all rows
    setRows(
      rows.map((row) => {
        const { [columnToRemove.field]: _, ...remainingRow } = row;
        return remainingRow;
      })
    );
  };

  // Function to handle column name change
  const handleColumnNameChange = (index, newName) => {
    const updatedColumns = [...columns];
    updatedColumns[index].name = newName;
    setColumns(updatedColumns);
  };

  // Function to aggregate data for the same activity on different dates
  const aggregateData = () => {
    const aggregatedRows = {};

    rows.forEach((row) => {
      const { activity, dailyTarget, achievement, date } = row;
      if (!aggregatedRows[activity]) {
        aggregatedRows[activity] = [];
      }
      aggregatedRows[activity].push({ dailyTarget, achievement, date });
    });

    return aggregatedRows;
  };

  useEffect(() => {
    // Update the graph with the aggregated data
    const aggregatedRows = aggregateData();
    console.log("Aggregated Data:", aggregatedRows);
    // Call a function to update the graph here with aggregatedRows
  }, [rows]);

  const handleSend = async () => {
    try {
      const response = await fetch("http://localhost:3001/siteData/siteData", {
        // Replace with your actual backend URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ siteTitle, siteType, rows }), // Send site title, type, and table data
      });

      if (!response.ok) {
        throw new Error("Failed to send data");
      }

      const result = await response.json();
      console.log("Response from server:", result);
      alert("Data has been successfully sent!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to send data. Check the console for details.");
    }
  };

  return (
    <div className="dynamic-table-container">
      {/* Site Title */}
      <div
        className="site-title"
        contentEditable
        onBlur={(e) => setSiteTitle(e.target.innerText)}
        suppressContentEditableWarning
      >
        {siteTitle}
      </div>

      {/* Site Type */}
      <div
        className="site-type"
        contentEditable
        onBlur={(e) => setSiteType(e.target.innerText)}
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
          <button onClick={addColumn}>Add Column</button>
        </div>
      </div>

      {/* Table */}
      <table className="dynamic-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>
                <div
                  contentEditable
                  onInput={(e) =>
                    handleColumnNameChange(index, e.target.innerText)
                  }
                  suppressContentEditableWarning
                >
                  {column.name}
                </div>
                <button
                  className="remove-column-btn"
                  onClick={() => removeColumn(index)}
                >
                  Remove
                </button>
              </th>
            ))}
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {column.field === "date" ? (
                    row.date
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

export default SiteEngineer;
