// Original Components
export { SaintVisionAIPricingCards } from "./SaintVisionAIPricingCards"
export { Sidebar } from "./Sidebar"

// Re-export default exports for backward compatibility
export { default as SaintVisionAIPricingCardsDefault } from "./SaintVisionAIPricingCards"
export { default as SidebarDefault } from "./Sidebar"

// Core Components
export { EmpireButton } from "./core/EmpireButton"
export { EmpireCard } from "./core/EmpireCard"
export { EmpireInput } from "./core/EmpireInput"
export { EmpireBadge } from "./core/EmpireBadge"
export { PreferenceDropdown } from "./core/PreferenceDropdown"
export type { AIModelPreference } from "./core/PreferenceDropdown"
export { IntegrationStatusNotes } from "./core/IntegrationStatusNotes"
export type { IntegrationStatus } from "./core/IntegrationStatusNotes"
export { StatusPanel } from "./core/StatusPanel"
export type { SystemStatus, ServiceStatus } from "./core/StatusPanel"

// Layout Components
export { EmpireContainer } from "./layout/EmpireContainer"
export { EmpireSection } from "./layout/EmpireSection"
export { EmpireGrid } from "./layout/EmpireGrid"

// Section Components
export { EmpireHero } from "./sections/EmpireHero"
export { EmpireFeatureGrid } from "./sections/EmpireFeatureGrid"
export { EmpireCTA } from "./sections/EmpireCTA"
export { EmpireStats } from "./sections/EmpireStats"

// Export all types
export type { ButtonVariant, ButtonSize } from "./core/EmpireButton"
export type { CardVariant } from "./core/EmpireCard"
export type { InputType, InputSize } from "./core/EmpireInput"
export type { BadgeVariant, BadgeSize } from "./core/EmpireBadge"
export type { ContainerSize } from "./layout/EmpireContainer"
export type { SectionPadding } from "./layout/EmpireSection"
export type { GridColumns, GridGap } from "./layout/EmpireGrid"

// Console Components
export { ConsoleLayout } from "./console/ConsoleLayout"
export { Dashboard } from "./console/Dashboard"

// Integration Components
export { GHLEmbed } from "./integrations/GHLEmbed"

// Empire Design System Components (re-export everything)
export * from "./empire"
