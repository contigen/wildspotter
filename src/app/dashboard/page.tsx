'use client'

import { useEffect, useState } from 'react'
import ChartComponent from '&/components/chart'

export default function DashboardPage() {
  const [sightingData, setSightingData] = useState([])

  useEffect(() => {
    async function fetchSightings() {
      const res = await fetch('/api/sightings')
      const data = await res.json()
      setSightingData(data)
    }
    fetchSightings()
  }, [])

  return (
    <main className='p-4'>
      <h1 className='text-3xl font-bold text-green-800 mb-4'>
        Conservation Dashboard
      </h1>
      <div className='grid gap-4 md:grid-cols-2'>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Species Distribution</h2>
          <ChartComponent data={sightingData} type='speciesDistribution' />
        </div>
        <div>
          <h2 className='text-xl font-semibold mb-2'>Sightings Timeline</h2>
          <ChartComponent data={sightingData} type='timeSeries' />
        </div>
      </div>
    </main>
  )
}
