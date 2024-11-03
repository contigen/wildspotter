'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '&/components/ui/dialog'
import { Button } from '&/components/ui/button'
import { Input } from '&/components/ui/input'
import { Textarea } from '&/components/ui/textarea'
import { Label } from '&/components/ui/label'

type SightingFormProps = {
  isOpen: boolean
  onClose: () => void
}

export default function SightingFormModal({
  isOpen,
  onClose,
}: SightingFormProps) {
  const [formData, setFormData] = useState({
    species: '',
    lat: 0,
    lng: 0,
    conditionNotes: '',
  })

  const handleSubmit = async () => {
    await fetch('/api/sightings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Report a Sighting</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='species' className='text-right'>
              Species
            </Label>
            <Input
              id='species'
              className='col-span-3'
              onChange={e =>
                setFormData({ ...formData, species: e.target.value })
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='lat' className='text-right'>
              Latitude
            </Label>
            <Input
              id='lat'
              type='number'
              className='col-span-3'
              onChange={e =>
                setFormData({ ...formData, lat: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='lng' className='text-right'>
              Longitude
            </Label>
            <Input
              id='lng'
              type='number'
              className='col-span-3'
              onChange={e =>
                setFormData({ ...formData, lng: parseFloat(e.target.value) })
              }
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='notes' className='text-right'>
              Notes
            </Label>
            <Textarea
              id='notes'
              className='col-span-3'
              onChange={e =>
                setFormData({ ...formData, conditionNotes: e.target.value })
              }
            />
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
