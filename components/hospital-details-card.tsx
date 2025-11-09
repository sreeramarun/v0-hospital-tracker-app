"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface HospitalDetailsCardProps {
  hospital: {
    id: string
    name: string
    address: string
    beds: number
    available: number
  }
}

export function HospitalDetailsCard({ hospital }: HospitalDetailsCardProps) {
  const occupancyRate = (((hospital.beds - hospital.available) / hospital.beds) * 100).toFixed(1)

  return (
    <Card className="p-6 hover:shadow-lg transition">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{hospital.name}</h3>
          <p className="text-sm text-slate-600 mt-1">{hospital.address}</p>
        </div>
        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
          {occupancyRate}% Full
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-700">Bed Availability</span>
            <span className="text-sm font-bold text-slate-900">
              {hospital.available}/{hospital.beds}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(hospital.available / hospital.beds) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-slate-600">Available Beds</p>
            <p className="text-xl font-bold text-green-600">{hospital.available}</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-xs text-slate-600">Occupied Beds</p>
            <p className="text-xl font-bold text-red-600">{hospital.beds - hospital.available}</p>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
          View Details
        </Button>
      </div>
    </Card>
  )
}
