'use client'

import {
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

type ChartComponentProps = {
  data: any[]
  type: 'speciesDistribution' | 'timeSeries'
}

export default function ChartComponent({ data, type }: ChartComponentProps) {
  if (type === 'speciesDistribution') {
    const speciesCounts = data.reduce((acc, item) => {
      acc[item.species] = (acc[item.species] || 0) + 1
      return acc
    }, {})

    const pieData = Object.entries(speciesCounts).map(([name, value]) => ({
      name,
      value,
    }))

    return (
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey='value'
            nameKey='name'
            cx='50%'
            cy='50%'
            outerRadius={80}
            fill='#8884d8'
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    )
  } else {
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const timelineData = sortedData.map((item, index) => ({
      date: item.date,
      sightings: index + 1,
    }))

    return (
      <ResponsiveContainer width='100%' height={300}>
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type='monotone' dataKey='sightings' stroke='#8884d8' />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}
