/**
 * 🟡💥 EMPIRE THEME ENGINE - INFINITE SCALABILITY
 * Advanced theming system for enterprise-scale Empire deployments
 */

export interface EmpireTheme {
  id: string
  name: string
  brand: {
    primary: string
    secondary: string
    accent: string
    success: string
    warning: string
    error: string
    info: string
  }
  typography: {
    fontFamily: string
    headingFont: string
    weights: Record<string, number>
    sizes: Record<string, string>
  }
  spacing: Record<string, string>
  breakpoints: Record<string, string>
  shadows: Record<string, string>
  animations: Record<string, string>
  custom?: Record<string, any>
}

export const EMPIRE_THEMES: Record<string, EmpireTheme> = {
  saintvision: {
    id: "saintvision",
    name: "SaintVision™ Empire",
    brand: {
      primary: "#FFD700", // Gold
      secondary: "#000000", // Black
      accent: "#FFA500", // Orange
      success: "#00FF00",
      warning: "#FFD700",
      error: "#FF0000",
      info: "#00BFFF"
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      headingFont: "Space Grotesk, Inter, sans-serif",
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    },
    spacing: {
      px: "1px",
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem"
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(255, 215, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(255, 215, 0, 0.1), 0 1px 2px 0 rgba(255, 215, 0, 0.06)",
      md: "0 4px 6px -1px rgba(255, 215, 0, 0.1), 0 2px 4px -1px rgba(255, 215, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(255, 215, 0, 0.1), 0 4px 6px -2px rgba(255, 215, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(255, 215, 0, 0.1), 0 10px 10px -5px rgba(255, 215, 0, 0.04)",
      glow: "0 0 20px rgba(255, 215, 0, 0.3)"
    },
    animations: {
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      bounce: "bounce 1s infinite",
      glow: "glow 2s ease-in-out infinite alternate"
    }
  },

  dark: {
    id: "dark",
    name: "Dark Empire",
    brand: {
      primary: "#8B5CF6", // Purple
      secondary: "#1F2937", // Dark Gray
      accent: "#F59E0B", // Amber
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6"
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
      headingFont: "Space Grotesk, Inter, sans-serif",
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    },
    spacing: {
      px: "1px",
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem"
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(139, 92, 246, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(139, 92, 246, 0.1), 0 1px 2px 0 rgba(139, 92, 246, 0.06)",
      md: "0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)",
      lg: "0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)",
      xl: "0 20px 25px -5px rgba(139, 92, 246, 0.1), 0 10px 10px -5px rgba(139, 92, 246, 0.04)",
      glow: "0 0 20px rgba(139, 92, 246, 0.3)"
    },
    animations: {
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      bounce: "bounce 1s infinite",
      glow: "glow 2s ease-in-out infinite alternate"
    }
  },

  neon: {
    id: "neon",
    name: "Neon Empire",
    brand: {
      primary: "#00FFFF", // Cyan
      secondary: "#FF00FF", // Magenta
      accent: "#00FF00", // Lime
      success: "#00FF00",
      warning: "#FFFF00",
      error: "#FF0080",
      info: "#00BFFF"
    },
    typography: {
      fontFamily: "Orbitron, monospace",
      headingFont: "Orbitron, monospace",
      weights: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        black: 900
      },
      sizes: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "3.75rem"
      }
    },
    spacing: {
      px: "1px",
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem"
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px"
    },
    shadows: {
      sm: "0 0 5px rgba(0, 255, 255, 0.3)",
      DEFAULT: "0 0 10px rgba(0, 255, 255, 0.4)",
      md: "0 0 15px rgba(0, 255, 255, 0.5)",
      lg: "0 0 25px rgba(0, 255, 255, 0.6)",
      xl: "0 0 35px rgba(0, 255, 255, 0.7)",
      glow: "0 0 40px rgba(0, 255, 255, 0.8)"
    },
    animations: {
      pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      spin: "spin 0.5s linear infinite",
      ping: "ping 0.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      bounce: "bounce 0.8s infinite",
      glow: "neon-glow 1.5s ease-in-out infinite alternate"
    }
  }
}

export class EmpireThemeEngine {
  private currentTheme: EmpireTheme = EMPIRE_THEMES.saintvision
  private customThemes: Map<string, EmpireTheme> = new Map()

  constructor(initialTheme?: string) {
    if (initialTheme && EMPIRE_THEMES[initialTheme]) {
      this.currentTheme = EMPIRE_THEMES[initialTheme]
    }
    this.applyTheme()
  }

  setTheme(themeId: string): void {
    const theme = EMPIRE_THEMES[themeId] || this.customThemes.get(themeId)
    if (theme) {
      this.currentTheme = theme
      this.applyTheme()
      this.saveThemePreference(themeId)
    }
  }

  getCurrentTheme(): EmpireTheme {
    return this.currentTheme
  }

  registerCustomTheme(theme: EmpireTheme): void {
    this.customThemes.set(theme.id, theme)
  }

  getAllThemes(): EmpireTheme[] {
    return [
      ...Object.values(EMPIRE_THEMES),
      ...Array.from(this.customThemes.values())
    ]
  }

  private applyTheme(): void {
    const root = document.documentElement
    const theme = this.currentTheme

    // Apply CSS custom properties
    Object.entries(theme.brand).forEach(([key, value]) => {
      root.style.setProperty(`--empire-${key}`, value)
    })

    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--empire-spacing-${key}`, value)
    })

    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--empire-shadow-${key}`, value)
    })

    // Apply typography
    root.style.setProperty("--empire-font-family", theme.typography.fontFamily)
    root.style.setProperty(
      "--empire-heading-font",
      theme.typography.headingFont
    )

    // Dispatch theme change event
    window.dispatchEvent(
      new CustomEvent("empire-theme-changed", {
        detail: { theme: this.currentTheme }
      })
    )
  }

  private saveThemePreference(themeId: string): void {
    localStorage.setItem("empire-theme", themeId)
  }

  loadThemePreference(): void {
    const saved = localStorage.getItem("empire-theme")
    if (saved) {
      this.setTheme(saved)
    }
  }

  createThemeVariant(
    baseThemeId: string,
    overrides: Partial<EmpireTheme>
  ): EmpireTheme {
    const baseTheme =
      EMPIRE_THEMES[baseThemeId] || this.customThemes.get(baseThemeId)
    if (!baseTheme) {
      throw new Error(`Base theme ${baseThemeId} not found`)
    }

    return {
      ...baseTheme,
      ...overrides,
      id: overrides.id || `${baseThemeId}-variant`,
      brand: { ...baseTheme.brand, ...overrides.brand },
      typography: { ...baseTheme.typography, ...overrides.typography },
      spacing: { ...baseTheme.spacing, ...overrides.spacing },
      breakpoints: { ...baseTheme.breakpoints, ...overrides.breakpoints },
      shadows: { ...baseTheme.shadows, ...overrides.shadows },
      animations: { ...baseTheme.animations, ...overrides.animations }
    }
  }
}

// Global theme engine instance
export const empireTheme = new EmpireThemeEngine()

// Auto-load theme preference on initialization
if (typeof window !== "undefined") {
  empireTheme.loadThemePreference()
}
