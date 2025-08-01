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


type ChartItem = {
  month: string
  amount: number
}

const chartConfig = {
  month: { label: "Tháng" },
  amount: {
    label: "Số thú cưng: ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export default function ChartAreaInteractive({
  yearsArray,
  selectedYear,
  setSelectedYear,
  chartData,
}: {
  yearsArray: number[];
  selectedYear: string;
  setSelectedYear: React.Dispatch<React.SetStateAction<string>>;
  chartData: ChartItem[];
}) {
  const isMobile = useIsMobile();
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Thống kê số thú cưng được nhận nuôi</CardTitle>
        <CardDescription>
          Dữ liệu thống kê theo từng tháng trong năm {selectedYear}
        </CardDescription>
        <CardAction>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger
              className="w-40"
              size="sm"
              aria-label="Chọn năm thống kê"
            >
              <SelectValue placeholder="Chọn năm" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {yearsArray &&
                yearsArray.length > 0 &&
                yearsArray.map((item) => {
                  return (
                    <SelectItem value={item.toString()}>
                      {item.toString()}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 11}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="amount"
              type="monotone"
              fill="var(--chart-1)"
              stroke="var(--chart-1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
