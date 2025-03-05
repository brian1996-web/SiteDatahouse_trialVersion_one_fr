import React, { useState, useEffect } from "react";
import LineChart from "./charts/LineChart";

function ProjectDetails() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch("http://localhost:3001/siteData/siteData"); // Adjust API URL if needed
        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          // Assuming `rows` exist in each site data entry
          const extractedRows = data.flatMap(site => site.rows || []);
          setRows(extractedRows);
        }
      } catch (error) {
        console.error("Error fetching site data:", error);
      }
    };

    fetchSiteData();
  }, []);

  const chartData = {
    labels: rows.map((row) => row.activity || "Unknown"),
    datasets: [
      {
        label: "Daily Achievement",
        data: rows.map((row) => parseInt(row.achievement) || 0),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Project Details & Data Visualization</h2>
      <div style={{ width: 750 }}>
        <LineChart chartData={chartData} />
      </div>
    </div>
  );
}

export default ProjectDetails;
