"use client"

import { useState } from "react"
import { Button } from "&/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "&/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "&/components/ui/dialog"
import { Input } from "&/components/ui/input"
import { Label } from "&/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "&/components/ui/select"
import { Textarea } from "&/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "&/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { MapPin, Camera, Bell, Filter, Upload, ChevronDown } from "lucide-react"
import { Badge } from "&/components/ui/badge"

// Sample data for charts
const speciesDistributionData = [
  { name: "Elephant", count: 200 },
  { name: "Lion", count: 150 },
  { name: "Giraffe", count: 300 },
  { name: "Rhino", count: 100 },
  { name: "Zebra", count: 250 },
]

export function WildSpotterComponent() {
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false)

  return (
    <div className="flex h-screen bg-stone-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">WildSpotter</h1>
        <nav>
          <ul className="space-y-2">
            <li><Button variant="ghost" className="w-full justify-start"><MapPin className="mr-2" />Map</Button></li>
            <li><Button variant="ghost" className="w-full justify-start"><Camera className="mr-2" />Sightings</Button></li>
            <li><Button variant="ghost" className="w-full justify-start"><Bell className="mr-2" />Notifications</Button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
  <div className="mb-6 flex justify-between items-center">
    <h2 className="text-3xl font-bold text-green-800">Wildlife Map</h2>
    <Button onClick={() => setIsSubmissionModalOpen(true)} className="bg-green-600 hover:bg-green-700">
      Report Sighting
    </Button>
  </div>

  {/* Map */}
  <div className="bg-green-200 h-96 rounded-lg mb-6 relative">
    <div className="absolute top-4 right-4 z-10">
      <Select>
        <SelectTrigger className="w-[180px] bg-white">
          <SelectValue placeholder="Filter by species" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Species</SelectItem>
          <SelectItem value="elephant">Elephant</SelectItem>
          <SelectItem value="lion">Lion</SelectItem>
          <SelectItem value="giraffe">Giraffe</SelectItem>
          <SelectItem value="rhino">Rhino</SelectItem>
          <SelectItem value="zebra">Zebra</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-green-800">Interactive Map Goes Here</p>
    </div>
    {/* Sample markers */}
    <div className="absolute top-1/4 left-1/4 text-red-500" title="Endangered species"><MapPin size={24} /></div>
    <div className="absolute top-1/2 left-1/2 text-green-500" title="Common species"><MapPin size={24} /></div>
    <div className="absolute bottom-1/4 right-1/4 text-yellow-500" title="Rare species"><MapPin size={24} /></div>
  </div>

  {/* Recent Sightings */}
  <Card className="mb-6">
    <CardHeader>
      <CardTitle>Recent Sightings</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
            <Camera className="text-green-700" />
          </div>
          <div>
            <h4 className="font-semibold">Elephant Herd</h4>
            <p className="text-sm text-gray-500">Spotted by John Doe, 2 hours ago</p>
          </div>
          <Badge className="ml-auto">Healthy</Badge>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
            <Camera className="text-yellow-700" />
          </div>
          <div>
            <h4 className="font-semibold">Black Rhino</h4>
            <p className="text-sm text-gray-500">Spotted by Jane Smith, 5 hours ago</p>
          </div>
          <Badge variant="outline" className="ml-auto">Endangered</Badge>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Dashboard for Conservationists */}
  <Tabs defaultValue="distribution" className="w-full mb-6">
    <TabsList>
      <TabsTrigger value="distribution">Species Distribution</TabsTrigger>
      <TabsTrigger value="timeline">Sightings Timeline</TabsTrigger>
    </TabsList>
    <TabsContent value="distribution">
      <Card>
        <CardHeader>
          <CardTitle>Species Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={speciesDistributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#2F855A" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="timeline">
      <Card>
        <CardHeader>
          <CardTitle>Sightings Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Timeline chart would go here</p>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>

  {/* Notification Panel */}
  <Card>
    <CardHeader>
      <CardTitle>Recent Notifications</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        <li className="flex items-center text-red-600">
          <Bell className="mr-2" /> Endangered species sighting: Black Rhino at coordinates 1.23, 4.56
        </li>
        <li className="flex items-center text-yellow-600">
          <Bell className="mr-2" /> High pollution levels reported near Elephant habitat
        </li>
        <li className="flex items-center text-green-600">
          <Bell className="mr-2" /> New conservation area established for Giraffe population
        </li>
      </ul>
    </CardContent>
  </Card>
</main>

      {/* Sighting Submission Form Modal */}
      <Dialog open={isSubmissionModalOpen} onOpenChange={setIsSubmissionModalOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Report Wildlife Sighting</DialogTitle>
    </DialogHeader>
    <form className="space-y-4">
      <div>
        <Label htmlFor="species">Species</Label>
        <Select>
          <SelectTrigger id="species">
            <SelectValue placeholder="Select species" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="elephant">Elephant</SelectItem>
            <SelectItem value="lion">Lion</SelectItem>
            <SelectItem value="giraffe">Giraffe</SelectItem>
            <SelectItem value="rhino">Rhino</SelectItem>
            <SelectItem value="zebra">Zebra</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <div className="flex space-x-2">
          <Input id="location" placeholder="Enter coordinates or address" className="flex-grow" />
          <Button type="button" variant="outline" className="flex-shrink-0">
            <MapPin className="mr-2 h-4 w-4" />
            Use Current
          </Button>
        </div>
      </div>
      <div>
        <Label htmlFor="photo">Photo</Label>
        <div className="mt-1 flex items-center space-x-2">
          <Input id="photo" type="file" className="hidden" />
          <Button asChild variant="outline">
            <label htmlFor="photo" className="cursor-pointer">
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </label>
          </Button>
          <span className="text-sm text-gray-500">No file chosen</span>
        </div>
      </div>
      <div>
        <Label htmlFor="condition">Habitat Condition</Label>
        <Select>
          <SelectTrigger id="condition">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="excellent">Excellent</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="fair">Fair</SelectItem>
            <SelectItem value="poor">Poor</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea id="notes" placeholder="Describe the sighting, behavior, or any concerns..." />
      </div>
      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Submit Sighting</Button>
    </form>
  </DialogContent>
</Dialog>
    </div>
  )
}