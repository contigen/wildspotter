import { NextResponse } from 'next/server'

const sightings = [
  {
    id: '1',
    species: 'Lion',
    lat: 37.7749,
    lng: -122.4194,
    date: '2023-01-01',
  },
  {
    id: '2',
    species: 'Elephant',
    lat: 37.8049,
    lng: -122.4094,
    date: '2023-01-02',
  },
  {
    id: '3',
    species: 'Giraffe',
    lat: 37.7649,
    lng: -122.4294,
    date: '2023-01-03',
  },
]

export async function GET() {
  return NextResponse.json(sightings)
}

export async function POST(request: Request) {
  const sighting = await request.json()
  sighting.id = String(sightings.length + 1)
  sighting.date = new Date().toISOString().split('T')[0]
  sightings.push(sighting)
  return NextResponse.json(sighting, { status: 201 })
}
