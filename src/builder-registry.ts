import { Builder } from "@builder.io/react"; // ✅ Correct package + import

import {
  SaintVisionAIPricingCards,
  Sidebar,
  EmpireButton,
  EmpireCard,
  EmpireInput,
  EmpireBadge,
  EmpireHero,
  EmpireFeatureGrid,
  EmpireCTA,
  EmpireStats,
  EmpireContainer,
  EmpireSection,
  EmpireGrid,
  PreferenceDropdown,
  IntegrationStatusNotes,
  StatusPanel,
  ConsoleLayout,
  Dashboard,
  GHLEmbed
} from "./components";

// 💡 Encapsulate all registrations in a function
export function registerAllBuilderComponents() {
  Builder.registerComponent(SaintVisionAIPricingCards, {
    name: "SaintVisionAIPricingCards",
    inputs: [/* ... */] // keep all your pricing cards inputs here
  });

  Builder.registerComponent(Sidebar, {
    name: "Sidebar",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireButton, {
    name: "EmpireButton",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireCard, {
    name: "EmpireCard",
    inputs: [/* ... */],
    canHaveChildren: true
  });

  Builder.registerComponent(EmpireInput, {
    name: "EmpireInput",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireBadge, {
    name: "EmpireBadge",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireHero, {
    name: "EmpireHero",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireFeatureGrid, {
    name: "EmpireFeatureGrid",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireCTA, {
    name: "EmpireCTA",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireStats, {
    name: "EmpireStats",
    inputs: [/* ... */]
  });

  Builder.registerComponent(EmpireContainer, {
    name: "EmpireContainer",
    inputs: [/* ... */],
    canHaveChildren: true
  });

  Builder.registerComponent(EmpireSection, {
    name: "EmpireSection",
    inputs: [/* ... */],
    canHaveChildren: true
  });

  Builder.registerComponent(EmpireGrid, {
    name: "EmpireGrid",
    inputs: [/* ... */],
    canHaveChildren: true
  });

  Builder.registerComponent(PreferenceDropdown, {
    name: "PreferenceDropdown",
    inputs: [/* ... */]
  });

  Builder.registerComponent(IntegrationStatusNotes, {
    name: "IntegrationStatusNotes",
    inputs: [/* ... */]
  });

  Builder.registerComponent(StatusPanel, {
    name: "StatusPanel",
    inputs: [/* ... */]
  });

  Builder.registerComponent(ConsoleLayout, {
    name: "ConsoleLayout",
    inputs: [/* ... */],
    canHaveChildren: true
  });

  Builder.registerComponent(Dashboard, {
    name: "Dashboard",
    inputs: [/* ... */]
  });

  Builder.registerComponent(GHLEmbed, {
    name: "GHLEmbed",
    inputs: [/* ... */]
  });
}
