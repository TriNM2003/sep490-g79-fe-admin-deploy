
import { TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const formatVND = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value)

export const description = "Biểu đồ số tiền quyên góp theo tháng (VNĐ)"

type monthlyData = {
  month: string;
  amount: number;
}

const chartData : monthlyData[] = [
  { month: "Tháng 1", amount: 186000 },
  { month: "Tháng 2", amount: 305000 },
  { month: "Tháng 3", amount: 237000 },
  { month: "Tháng 4", amount: 73000 },
  { month: "Tháng 5", amount: 209000 },
  { month: "Tháng 6", amount: 214000 },
  { month: "Tháng 7", amount: 186000 },
  { month: "Tháng 8", amount: 305000 },
  { month: "Tháng 9", amount: 237000 },
  { month: "Tháng 10", amount: 73000 },
  { month: "Tháng 11", amount: 209000 },
  { month: "Tháng 12", amount: 214000 },
]

const chartConfig = {
  amount: {
    label: "Số tiền(VNĐ): ",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

export function ChartBarLabelCustom({donationData}: {donationData: monthlyData[]}) {
  // Tính toán tăng hay giảm theo phần trăm
  function calculateDonationChange(
    currentAmount: number,
    previousAmount: number
  ): { percent: number; isIncrease: boolean, isEqual:boolean } {
    if (previousAmount === 0) {
      return {
        percent: 100,
        isIncrease: true,
        isEqual: false,
      };
    }

    const change = ((currentAmount - previousAmount) / previousAmount) * 100;
    return {
      percent: Math.abs(Math.round(change)),
      isIncrease: change > 0,
      isEqual: change === 0
    };
  }

  const now = new Date();

  const currentMonth = now.getMonth() + 1; // Tháng hiện tại (1–12)
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Tháng trước
  const currentYear = now.getFullYear(); // Năm hiện tại



  const currentMonthData = donationData && donationData.find(
    (d) => d.month === `Tháng ${currentMonth}`
  );
  const previousMonthData = donationData && donationData.find(
    (d) => d.month === `Tháng ${previousMonth}`
  );

  const { percent, isIncrease, isEqual } = calculateDonationChange(
    currentMonthData?.amount ?? 0,
    previousMonthData?.amount ?? 0
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Số tiền quyên góp vào hệ thống theo tháng (Năm {currentYear})
        </CardTitle>
        <CardDescription>Thống kê từ tháng 1 đến tháng 12</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={donationData ?? chartData}
            layout="vertical"
            margin={{ top: 0, right: 20, bottom: 0, left: 10 }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
            />
            <XAxis
              dataKey="amount"
              type="number"
              axisLine={true}
              tickLine={false}
              tickFormatter={(value) => formatVND(Number(value))}
              className="max-w-[60vw]"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Bar
              dataKey="amount"
              fill="var(--chart-2)"
              radius={4}
              className="transition-all duration-200 hover:fill-[#22c55e]"
            >
              {/* <LabelList
                dataKey="month"
                position="insideLeft"
                offset={8}
                className="fill-(--color-label)"
                fontSize={12}
              /> */}
              <LabelList
                dataKey="amount"
                position="right"
                offset={8}
                formatter={(value: number) => formatVND(value)}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {isEqual ? (
          <div className="flex gap-2 leading-none font-medium">
            Tháng hiện tại (Tháng {currentMonth}) không thay đổi so với tháng
            trước (Tháng {previousMonth})
            <TrendingUp className="h-4 w-4" />
          </div>
        ) : (
          <div className="flex gap-2 leading-none font-medium">
            Tháng hiện tại (Tháng {currentMonth}) {isIncrease ? "Tăng" : "Giảm"}{" "}
            {percent}% so với tháng trước (Tháng {previousMonth})
            <TrendingUp className="h-4 w-4" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
