'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import SightingFormModal from '&/components/sighting-form'
import NotificationComponent from '&/components/notification'
import { Button } from '&/components/ui/button'

const MapComponent = dynamic(() => import('&/components/map'), {
  loading: () => <p>A map is loading</p>,
  ssr: false,
})

export default function HomePage() {
  const [isModalOpen, setModalOpen] = useState(false)

  return (
    <main className='flex flex-col items-center min-h-screen bg-green-50 p-4'>
      <h1 className='text-3xl font-bold text-green-800 mb-4'>WildSpotter</h1>
      <div className='w-full max-w-4xl'>
        <MapComponent />
        <Button
          onClick={() => setModalOpen(true)}
          className='mt-4 bg-green-600 hover:bg-green-700'
        >
          Report Sighting
        </Button>
        <NotificationComponent />
      </div>
      <SightingFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </main>
  )
}
