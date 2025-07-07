"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", dog: 33, cat: 222, mouse: 150 },
  { date: "2024-05-02", dog: 34, cat: 97, mouse: 180 },
  { date: "2024-06-03", dog: 35, cat: 167, mouse: 120 },
  { date: "2024-07-04", dog: 36, cat: 242, mouse: 260 },
  { date: "2024-08-05", dog: 37, cat: 373, mouse: 290 },
  { date: "2024-09-06", dog: 77, cat: 301, mouse: 340 },
  { date: "2024-10-07", dog: 89, cat: 245, mouse: 180 },
  { date: "2024-11-08", dog: 15, cat: 67, mouse: 12 },
  { date: "2024-12-08", dog: 66, cat: 77, mouse: 99 },
  { date: "2025-01-08", dog: 12, cat: 23, mouse: 55 },
  { date: "2025-02-08", dog: 14, cat: 23, mouse: 55 },
  { date: "2025-03-08", dog: 16, cat: 23, mouse: 55 },
  { date: "2025-04-08", dog: 17, cat: 23, mouse: 55 },
  { date: "2025-05-08", dog: 22, cat: 23, mouse: 55 },
  { date: "2025-06-05", dog: 22, cat: 11, mouse: 22 },
  { date: "2025-06-08", dog: 65, cat: 23, mouse: 55 },
  { date: "2025-06-14", dog: 70, cat: 90, mouse: 112 },
  { date: "2025-06-30", dog: 50, cat: 30, mouse: 12 },
]

const chartConfig = {
  date: { label: "Thời gian" },
  dog: { label: "Chó", color: "var(--chart-1)" },
  cat: { label: "Mèo", color: "var(--chart-2)" },
  mouse: { label: "Chuột", color: "var(--chart-3)" },
} satisfies ChartConfig

export default function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("1y")

  React.useEffect(() => {
    if (isMobile) setTimeRange("1m")
  }, [isMobile])

   const filteredData = timeRange === "1m" ? getFullMonthData(chartData) : chartData.filter((item) => { 
    const date = new Date(item.date)
    const referenceDate = new Date()
    let daysToSubtract = 365
    if (timeRange === "1y") {
      daysToSubtract = 365
    } else if (timeRange === "6m") {
      daysToSubtract = 183
    }else{
      daysToSubtract = 30
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })


  function getFullMonthData(data: typeof chartData) {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const fullDates = Array.from({ length: daysInMonth +1}, (_, i) => {
    const date = new Date(year, month, i + 1)
    const iso = date.toISOString().split("T")[0]
    return iso
  })

  const dataMap = Object.fromEntries(
    data.map((item) => [item.date, item])
  )

  const filled = fullDates.map((date) => {
    return dataMap[date] || {
      date,
      dog: 0,
      cat: 0,
      mouse: 0,
    }
  })

  return filled
}

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Thống kê số thú cưng được nhận nuôi</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Số thú cưng được nhận nuôi {timeRange === "1y" ? "1 năm" : timeRange === "6m" ? "6 tháng" : "1 tháng"} trở lại
          </span>
          <span className="@[540px]/card:hidden">Thống kê gần đây</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(val) => val && setTimeRange(val)}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="1y">1 năm</ToggleGroupItem>
            <ToggleGroupItem value="6m">6 tháng</ToggleGroupItem>
            <ToggleGroupItem value="1m">1 tháng</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 data-[slot=select-value]:block data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Chọn mốc thời gian"
            >
              <SelectValue placeholder="Chọn mốc thời gian" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="1y" className="rounded-lg">1 năm</SelectItem>
              <SelectItem value="6m" className="rounded-lg">6 tháng</SelectItem>
              <SelectItem value="1m" className="rounded-lg">1 tháng</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("vi-VN", {
                  month: "long",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="dog"
              type="monotone"
              fill="var(--chart-1)"
              stroke="var(--chart-1)"
              stackId="a"
            />
            <Area
              dataKey="cat"
              type="monotone"
              fill="var(--chart-2)"
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="mouse"
              type="monotone"
              fill="var(--chart-3)"
              stroke="var(--chart-3)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
