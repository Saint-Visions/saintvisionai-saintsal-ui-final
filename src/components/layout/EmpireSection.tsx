import React from "react"
import { EmpireContainer, ContainerSize } from "./EmpireContainer"

export type SectionPadding = "none" | "sm" | "md" | "lg" | "xl"

interface EmpireSectionProps {
  children: React.ReactNode
  padding?: SectionPadding
  containerSize?: ContainerSize
  background?: "none" | "primary" | "secondary" | "gradient"
  className?: string
}

export function EmpireSection({
  children,
  padding = "lg",
  containerSize = "lg",
  background = "none",
  className = ""
}: EmpireSectionProps) {
  const paddingClasses = {
    none: "",
    sm: "py-8",
    md: "py-16",
    lg: "py-20",
    xl: "py-32"
  }

  const backgroundClasses = {
    none: "",
    primary: "bg-black",
    secondary: "bg-gray-900",
    gradient: "bg-gradient-to-b from-black to-gray-900"
  }

  const allClasses = [
    paddingClasses[padding],
    backgroundClasses[background],
    className
  ].join(" ")

  return (
    <section className={allClasses}>
      <EmpireContainer size={containerSize}>{children}</EmpireContainer>
    </section>
  )
}

export default EmpireSection
