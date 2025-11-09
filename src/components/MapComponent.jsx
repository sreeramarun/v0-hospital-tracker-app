"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../styles/map.css"

// Fix leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
})

export default function MapComponent({ hospitals, selectedHospital, onSelectHospital, getStatusColor }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef({})

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([15.2993, 74.124], 6)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(mapInstance.current)
    }

    const map = mapInstance.current

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => map.removeLayer(marker))
    markersRef.current = {}

    // Add new markers
    hospitals.forEach((hospital) => {
      const statusColor = getStatusColor(hospital.status)

      const html = `
        <div style="
          width: 30px;
          height: 30px;
          background-color: ${statusColor};
          border: 3px solid white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      `

      const icon = L.divIcon({
        html,
        iconSize: [30, 30],
        className: "custom-marker",
      })

      const marker = L.marker([hospital.lat, hospital.lon], { icon })
        .addTo(map)
        .on("click", () => {
          onSelectHospital(hospital.id)
          map.setView([hospital.lat, hospital.lon], 12)
        })

      // Bind popup
      marker.bindPopup(`
        <div style="padding: 8px; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px;">${hospital.name}</h3>
          <p style="margin: 4px 0; font-size: 14px;">
            <strong>Location:</strong> ${hospital.lat.toFixed(4)}, ${hospital.lon.toFixed(4)}
          </p>
          <p style="margin: 4px 0; font-size: 14px;">
            <strong>Status:</strong> 
            <span style="
              display: inline-block;
              width: 12px;
              height: 12px;
              background-color: ${statusColor};
              border-radius: 50%;
              margin-left: 6px;
              vertical-align: middle;
            "></span>
            ${hospital.status}
          </p>
        </div>
      `)

      markersRef.current[hospital.id] = marker
    })

    // Highlight selected hospital
    if (selectedHospital && markersRef.current[selectedHospital]) {
      markersRef.current[selectedHospital].openPopup()
    }
  }, [hospitals, selectedHospital, onSelectHospital, getStatusColor])

  return <div ref={mapRef} className="map" />
}
