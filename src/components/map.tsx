'use client'

import { useEffect, useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

type Sighting = {
  id: string
  species: string
  lat: number
  lng: number
}

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapComponent() {
  const [sightings, setSightings] = useState<Sighting[]>([])
  const [map, setMap] = useState<L.Map | null>(null)

  // Fetch sightings data on mount
  useEffect(() => {
    async function fetchSightings() {
      const res = await fetch('/api/sightings')
      const data = await res.json()
      setSightings(data)
    }
    fetchSightings()
  }, [])

  // Invalidate map size once map is set
  useEffect(() => {
    if (map) {
      map.invalidateSize()
    }
  }, [map])

  // Memoize MapContainer to avoid reinitialization
  const mapComponent = useMemo(
    () => (
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={10}
        style={{ height: '400px', width: '100%' }}
        whenReady={e => setMap(e.target)} // Updated to use whenReady
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {sightings.map(sighting => (
          <Marker key={sighting.id} position={[sighting.lat, sighting.lng]}>
            <Popup>{sighting.species} sighting</Popup>
          </Marker>
        ))}
      </MapContainer>
    ),
    [sightings] // only re-render map when sightings data changes
  )

  return <>{mapComponent}</>
}
