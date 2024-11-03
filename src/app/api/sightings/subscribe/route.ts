import { NextResponse } from 'next/server'

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const sendEvent = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }

      // Simulate new sightings every 5 seconds
      const interval = setInterval(() => {
        const sighting = {
          id: Date.now().toString(),
          message: `New ${
            ['Lion', 'Elephant', 'Giraffe'][Math.floor(Math.random() * 3)]
          } sighting!`,
        }
        sendEvent(JSON.stringify(sighting))
      }, 5000)

      return () => {
        clearInterval(interval)
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
