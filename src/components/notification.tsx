'use client'

import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '&/components/ui/alert'
import { Bell } from 'lucide-react'

type Notification = {
  id: string
  message: string
}

export default function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    const eventSource = new EventSource('/api/sightings/subscribe')
    eventSource.onmessage = event => {
      const newNotification = JSON.parse(event.data)
      setNotifications(prev => [...prev.slice(-2), newNotification])
    }
    return () => eventSource.close()
  }, [])

  return (
    <div className='notification-panel mt-4 space-y-2'>
      {notifications.map(notif => (
        <Alert key={notif.id}>
          <Bell className='h-4 w-4' />
          <AlertTitle>New Sighting</AlertTitle>
          <AlertDescription>{notif.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
