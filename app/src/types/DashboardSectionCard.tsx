import type { JSX } from "react";

export default interface dashboardSectionCard {
  title: string;
  icon: JSX.Element;
  number: number;
  changePercentage: string;
  isHigher: boolean;
}