"use client"

import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import MapComponent from "../components/MapComponent"
import HospitalList from "../components/HospitalList"
import { getHospitals } from "../data/hospitals"
import "../styles/dashboard.css"

export default function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [selectedHospital, setSelectedHospital] = useState(null)
  const hospitals = useMemo(() => getHospitals(), [])

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "#22c55e"
      case "Busy":
        return "#f97316"
      case "Full":
        return "#ef4444"
      default:
        return "#666"
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>Hospital Emergency Tracker</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        <aside className="hospital-sidebar">
          <div className="sidebar-header">
            <h2>Hospitals</h2>
            <span className="hospital-count">{hospitals.length}</span>
          </div>
          <HospitalList
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            onSelectHospital={setSelectedHospital}
            getStatusColor={getStatusColor}
          />
        </aside>

        <main className="map-container">
          <MapComponent
            hospitals={hospitals}
            selectedHospital={selectedHospital}
            onSelectHospital={setSelectedHospital}
            getStatusColor={getStatusColor}
          />
        </main>
      </div>
    </div>
  )
}
