import { IconReport, IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CatIcon, HouseIcon, UsersIcon } from "lucide-react"
import type { SectionCardProps } from "@/types/SectionCardProp"

export function SectionCard({icon, title, number, changePercentage, isHigher} : SectionCardProps) {
  return (
    <>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex flex-row gap-2">{icon} {title} </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center">
            {number}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {isHigher && <><IconTrendingUp /> {changePercentage}</>}
              {!isHigher && <><IconTrendingDown /> {changePercentage}</>}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {isHigher && <>Tăng {changePercentage} so với tháng trước <IconTrendingUp className="size-4" /></>}
            {!isHigher && <>Giảm {changePercentage} so với tháng trước <IconTrendingDown className="size-4" /></>}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
