/**
 * 🟡💥 EMPIRE COMPONENT FACTORY - INFINITE SCALABILITY
 * Dynamic component generation and management system
 */

import React from "react"
import { Builder } from "@builder.io/sdk-react"

export interface EmpireComponentConfig {
  name: string
  displayName: string
  category: "core" | "layout" | "sections" | "advanced" | "custom"
  description: string
  icon: string
  version: string
  tags: string[]
  props: EmpireComponentProp[]
  children?: boolean
  examples?: EmpireComponentExample[]
  documentation?: string
}

export interface EmpireComponentProp {
  name: string
  type:
    | "string"
    | "number"
    | "boolean"
    | "enum"
    | "object"
    | "array"
    | "color"
    | "file"
    | "url"
    | "longText"
  required?: boolean
  defaultValue?: any
  description?: string
  options?: string[] | number[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    custom?: (value: any) => boolean | string
  }
  conditional?: {
    dependsOn: string
    values: any[]
  }
}

export interface EmpireComponentExample {
  name: string
  description: string
  props: Record<string, any>
  code?: string
}

export class EmpireComponentFactory {
  private components: Map<string, EmpireComponentConfig> = new Map()
  private reactComponents: Map<string, React.ComponentType<any>> = new Map()

  registerComponent(
    component: React.ComponentType<any>,
    config: EmpireComponentConfig
  ): void {
    // Store component configuration
    this.components.set(config.name, config)
    this.reactComponents.set(config.name, component)

    // Register with Builder.io
    this.registerWithBuilder(component, config)

    console.log(`🏆 Empire Component Registered: ${config.displayName}`)
  }

  private registerWithBuilder(
    component: React.ComponentType<any>,
    config: EmpireComponentConfig
  ): void {
    const builderInputs = config.props.map(prop => {
      const input: any = {
        name: prop.name,
        type: prop.type,
        required: prop.required,
        defaultValue: prop.defaultValue,
        helperText: prop.description
      }

      // Handle enum types
      if (prop.type === "enum" && prop.options) {
        input.enum = prop.options
      }

      // Handle object types
      if (prop.type === "object" && prop.options) {
        input.subFields = prop.options
      }

      // Handle array types
      if (prop.type === "array" && prop.options) {
        input.subFields = prop.options
      }

      // Handle file types
      if (prop.type === "file") {
        input.allowedFileTypes = ["jpeg", "jpg", "png", "webp", "svg"]
      }

      return input
    })

    Builder.registerComponent(component, {
      name: config.name,
      inputs: builderInputs,
      canHaveChildren: config.children,
      image: `https://via.placeholder.com/300x200?text=${encodeURIComponent(config.displayName)}`,
      noWrap: false
    })
  }

  getComponent(name: string): React.ComponentType<any> | undefined {
    return this.reactComponents.get(name)
  }

  getComponentConfig(name: string): EmpireComponentConfig | undefined {
    return this.components.get(name)
  }

  getAllComponents(): EmpireComponentConfig[] {
    return Array.from(this.components.values())
  }

  getComponentsByCategory(category: string): EmpireComponentConfig[] {
    return this.getAllComponents().filter(comp => comp.category === category)
  }

  searchComponents(query: string): EmpireComponentConfig[] {
    const searchTerm = query.toLowerCase()
    return this.getAllComponents().filter(
      comp =>
        comp.name.toLowerCase().includes(searchTerm) ||
        comp.displayName.toLowerCase().includes(searchTerm) ||
        comp.description.toLowerCase().includes(searchTerm) ||
        comp.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    )
  }

  generateComponentCode(name: string, props: Record<string, any>): string {
    const config = this.getComponentConfig(name)
    if (!config) return ""

    const propsString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === "string") {
          return `${key}="${value}"`
        } else if (typeof value === "boolean") {
          return value ? key : ""
        } else {
          return `${key}={${JSON.stringify(value)}}`
        }
      })
      .filter(Boolean)
      .join(" ")

    return `<${config.name} ${propsString}${config.children ? ">" : " />"}`
  }

  validateProps(
    name: string,
    props: Record<string, any>
  ): {
    valid: boolean
    errors: string[]
  } {
    const config = this.getComponentConfig(name)
    if (!config) {
      return { valid: false, errors: ["Component not found"] }
    }

    const errors: string[] = []

    // Check required props
    config.props.forEach(prop => {
      if (prop.required && !(prop.name in props)) {
        errors.push(`Required prop '${prop.name}' is missing`)
      }

      const value = props[prop.name]
      if (value !== undefined && prop.validation) {
        const validation = prop.validation

        // Type validation
        if (prop.type === "number" && typeof value !== "number") {
          errors.push(`Prop '${prop.name}' must be a number`)
        }

        // Min/max validation
        if (typeof value === "number") {
          if (validation.min !== undefined && value < validation.min) {
            errors.push(`Prop '${prop.name}' must be >= ${validation.min}`)
          }
          if (validation.max !== undefined && value > validation.max) {
            errors.push(`Prop '${prop.name}' must be <= ${validation.max}`)
          }
        }

        // Pattern validation
        if (validation.pattern && typeof value === "string") {
          const regex = new RegExp(validation.pattern)
          if (!regex.test(value)) {
            errors.push(`Prop '${prop.name}' does not match required pattern`)
          }
        }

        // Custom validation
        if (validation.custom) {
          const result = validation.custom(value)
          if (typeof result === "string") {
            errors.push(result)
          } else if (!result) {
            errors.push(`Prop '${prop.name}' failed custom validation`)
          }
        }
      }
    })

    return {
      valid: errors.length === 0,
      errors
    }
  }

  generateDocumentation(): string {
    const components = this.getAllComponents()
    let docs = "# Empire Component Library\n\n"

    const categories = ["core", "layout", "sections", "advanced", "custom"]

    categories.forEach(category => {
      const categoryComponents = components.filter(c => c.category === category)
      if (categoryComponents.length === 0) return

      docs += `## ${category.charAt(0).toUpperCase() + category.slice(1)} Components\n\n`

      categoryComponents.forEach(comp => {
        docs += `### ${comp.displayName}\n\n`
        docs += `${comp.description}\n\n`
        docs += `**Category:** ${comp.category}\n`
        docs += `**Version:** ${comp.version}\n`
        docs += `**Tags:** ${comp.tags.join(", ")}\n\n`

        // Props documentation
        if (comp.props.length > 0) {
          docs += "#### Props\n\n"
          docs += "| Name | Type | Required | Default | Description |\n"
          docs += "|------|------|----------|---------|-------------|\n"

          comp.props.forEach(prop => {
            docs += `| ${prop.name} | ${prop.type} | ${prop.required ? "✓" : ""} | ${prop.defaultValue || ""} | ${prop.description || ""} |\n`
          })
          docs += "\n"
        }

        // Examples
        if (comp.examples && comp.examples.length > 0) {
          docs += "#### Examples\n\n"
          comp.examples.forEach((example, index) => {
            docs += `**${example.name}**\n\n`
            docs += `${example.description}\n\n`
            if (example.code) {
              docs += "```jsx\n"
              docs += example.code
              docs += "\n```\n\n"
            }
          })
        }

        docs += "---\n\n"
      })
    })

    return docs
  }

  exportComponents(): string {
    const components = this.getAllComponents()
    return JSON.stringify(components, null, 2)
  }

  importComponents(jsonData: string): void {
    try {
      const components = JSON.parse(jsonData) as EmpireComponentConfig[]
      components.forEach(config => {
        this.components.set(config.name, config)
      })
      console.log(`🏆 Imported ${components.length} component configurations`)
    } catch (error) {
      console.error("Failed to import components:", error)
    }
  }
}

// Global component factory instance
export const empireComponentFactory = new EmpireComponentFactory()

// Register event for dynamic component loading
if (typeof window !== "undefined") {
  window.addEventListener("empire-register-component", (event: any) => {
    const { component, config } = event.detail
    empireComponentFactory.registerComponent(component, config)
  })
}
