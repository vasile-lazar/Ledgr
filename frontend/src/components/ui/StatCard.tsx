import type { ReactNode } from "react";
import { Card } from "./Card";

interface StatCardProps {
 label: string;
 value: string;
 unit?: string;
 footer?: ReactNode;
}

export default function StatCard({
                                  label,
                                  value,
                                  unit,
                                  footer,
                                 }: StatCardProps) {
 return (
     <Card>
      <div className="text-xs text-muted-foreground mb-3">{label}</div>
      <div className="flex items-baseline gap-2 mb-3">
       <span className="font-serif text-3xl font-semibold">{value}</span>
       {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {footer && <div className="text-xs">{footer}</div>}
     </Card>
 );
}