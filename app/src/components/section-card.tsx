
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { SectionCardProps } from "@/types/SectionCardProp"

export function SectionCard({icon, title, number} : SectionCardProps) {
  return (
    <>
      <Card className="@container/card max-w-55">
        <CardHeader className="flex flex-col">
          <CardDescription className="flex flex-row gap-2 text-center h-12">{icon} {title} </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums text-center mx-auto">
            {number && number.toLocaleString()}
          </CardTitle>
        </CardHeader>
      </Card>
    </>
  )
}
