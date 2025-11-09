"use client"

import { Card } from "@/components/ui/card"
import { hospitalData } from "@/data/hospitals"

export function HospitalStats() {
  const totalBeds = hospitalData.reduce((sum, h) => sum + h.beds, 0)
  const totalAvailable = hospitalData.reduce((sum, h) => sum + h.available, 0)
  const averageOccupancy = ((1 - totalAvailable / totalBeds) * 100).toFixed(1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <p className="text-sm text-slate-600 font-medium">Total Hospitals</p>
        <p className="text-3xl font-bold text-blue-600 mt-2">{hospitalData.length}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <p className="text-sm text-slate-600 font-medium">Available Beds</p>
        <p className="text-3xl font-bold text-green-600 mt-2">{totalAvailable}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <p className="text-sm text-slate-600 font-medium">Total Beds</p>
        <p className="text-3xl font-bold text-slate-600 mt-2">{totalBeds}</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <p className="text-sm text-slate-600 font-medium">Avg. Occupancy</p>
        <p className="text-3xl font-bold text-orange-600 mt-2">{averageOccupancy}%</p>
      </Card>
    </div>
  )
}
