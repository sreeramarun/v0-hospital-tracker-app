"use client"

import { Card } from "@/components/ui/card"
import { hospitalData } from "@/data/hospitals"

export function HospitalList() {
  return (
    <Card className="p-6 shadow-lg overflow-y-auto max-h-[500px]">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Nearby Hospitals</h2>
      <div className="space-y-4">
        {hospitalData.map((hospital) => (
          <div key={hospital.id} className="pb-4 border-b border-slate-200 last:border-b-0 last:pb-0">
            <h3 className="font-semibold text-slate-900">{hospital.name}</h3>
            <p className="text-sm text-slate-600 mt-1">{hospital.address}</p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="bg-green-50 p-2 rounded">
                <p className="text-slate-600 text-xs">Available</p>
                <p className="font-semibold text-green-600">
                  {hospital.available}/{hospital.beds}
                </p>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <p className="text-slate-600 text-xs">Occupancy</p>
                <p className="font-semibold text-blue-600">
                  {(((hospital.beds - hospital.available) / hospital.beds) * 100).toFixed(0)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
