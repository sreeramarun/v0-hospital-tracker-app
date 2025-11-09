"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { MapComponent } from "@/components/map-component"
import { HospitalList } from "@/components/hospital-list"
import { HospitalStats } from "@/components/hospital-stats"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto p-6">
        <HospitalStats />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="p-0 overflow-hidden h-[500px] shadow-lg">
              <MapComponent />
            </Card>
          </div>

          {/* Hospital List Sidebar */}
          <div className="lg:col-span-1">
            <HospitalList />
          </div>
        </div>
      </main>
    </div>
  )
}
