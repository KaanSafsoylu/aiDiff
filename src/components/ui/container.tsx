import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({
  children,
  className,
}: ContainerProps) {
  return (
    <div className={cn(
      "w-full mx-auto px-4 md:px-6 lg:px-8 max-w-7xl",
      className
    )}>
      {children}
    </div>
  )
}
