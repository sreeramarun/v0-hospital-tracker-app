"use client"

import "../styles/hospital-list.css"

export default function HospitalList({ hospitals, selectedHospital, onSelectHospital, getStatusColor }) {
  return (
    <div className="hospital-list">
      {hospitals.map((hospital) => (
        <div
          key={hospital.id}
          className={`hospital-item ${selectedHospital === hospital.id ? "selected" : ""}`}
          onClick={() => onSelectHospital(hospital.id)}
        >
          <div className="hospital-status-indicator">
            <div className="status-dot" style={{ backgroundColor: getStatusColor(hospital.status) }} />
          </div>
          <div className="hospital-info">
            <h3>{hospital.name}</h3>
            <p className="hospital-location">
              {hospital.lat.toFixed(2)}, {hospital.lon.toFixed(2)}
            </p>
            <span className={`status-badge status-${hospital.status.toLowerCase()}`}>{hospital.status}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
