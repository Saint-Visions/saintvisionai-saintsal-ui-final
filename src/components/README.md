# SaintSal™ Empire Design System 🚀

A comprehensive, production-ready design system built for the SaintSal Empire brand with Builder.io integration.

## 🎨 Design Tokens

The design system uses CSS custom properties for consistent theming:

```css
/* Primary Colors */
--empire-primary: #fcd34d --empire-bg-primary: #000000
  --empire-text-primary: #ffffff /* Typography */ --empire-font-primary: "Inter"
  --empire-text-xl: 1.25rem /* Spacing */ --empire-space-4: 1rem;
```

## 🧱 Core Components

### EmpireButton

```tsx
<EmpireButton variant="primary" size="lg" href="/signup">
  Get Started
</EmpireButton>
```

**Props:**

- `variant`: `primary | secondary | outline | ghost | danger`
- `size`: `sm | md | lg | xl`
- `disabled`, `loading`, `fullWidth`
- `href`, `target`, `onClick`

### EmpireCard

```tsx
<EmpireCard variant="bordered" padding="lg" hoverable>
  Card content
</EmpireCard>
```

**Props:**

- `variant`: `default | bordered | elevated | glow`
- `padding`: `none | sm | md | lg | xl`
- `hoverable`, `onClick`

### EmpireInput

```tsx
<EmpireInput
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  required
/>
```

**Props:**

- `type`: `text | email | password | number | tel | url | search`
- `size`: `sm | md | lg`
- `label`, `helperText`, `errorMessage`
- `disabled`, `required`, `error`

### EmpireBadge

```tsx
<EmpireBadge variant="success" size="md" removable>
  Active
</EmpireBadge>
```

**Props:**

- `variant`: `primary | secondary | success | warning | error | info`
- `size`: `sm | md | lg`
- `removable`, `onRemove`

## 🏗️ Layout Components

### EmpireContainer

```tsx
<EmpireContainer size="lg" padding>
  Content
</EmpireContainer>
```

### EmpireSection

```tsx
<EmpireSection padding="lg" background="gradient">
  Section content
</EmpireSection>
```

### EmpireGrid

```tsx
<EmpireGrid columns={3} gap="lg" responsive>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</EmpireGrid>
```

## 🎯 Section Components

### EmpireHero

```tsx
<EmpireHero
  title="Build Your Empire"
  subtitle="SaintSal Vision"
  description="Revolutionary AI-powered platform"
  primaryAction={{ text: "Get Started", href: "/signup" }}
  secondaryAction={{ text: "Learn More", href: "/about" }}
  size="xl"
/>
```

### EmpireFeatureGrid

```tsx
<EmpireFeatureGrid
  title="Why Choose SaintSal"
  columns={3}
  features={[
    {
      title: "Lightning Fast",
      description: "Built for speed and performance",
      link: { text: "Learn More", href: "/features" }
    }
  ]}
/>
```

### EmpireCTA

```tsx
<EmpireCTA
  title="Ready to Get Started?"
  description="Join thousands of users building their empire"
  primaryAction={{ text: "Start Free Trial", href: "/signup" }}
  secondaryAction={{ text: "Contact Sales", href: "/contact" }}
/>
```

### EmpireStats

```tsx
<EmpireStats
  title="Trusted by Thousands"
  stats={[
    { value: "10K+", label: "Users", description: "Active monthly users" },
    { value: "99.9%", label: "Uptime", description: "Service availability" }
  ]}
/>
```

## 🎨 Brand Guidelines

### Colors

- **Primary:** Yellow (#FCD34D) - Empire gold
- **Background:** Black (#000000) - Deep space
- **Secondary:** Dark gray (#10161C) - Empire steel
- **Text:** White (#FFFFFF) - Pure clarity

### Typography

- **Font:** Inter (clean, modern, professional)
- **Hierarchy:** 6xl (60px) → xs (12px)
- **Weights:** Light (300) → Black (900)

### Spacing

- **Scale:** 4px increments (1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24)
- **Sections:** 80px (20) vertical padding
- **Components:** 24px (6) internal spacing

### Effects

- **Shadows:** Multiple levels with empire-specific glow
- **Borders:** Rounded (4px, 8px, 12px, 16px)
- **Animations:** Fast (150ms), Normal (250ms), Slow (350ms)

## 🔧 Builder.io Integration

All components are registered with Builder.io for visual editing:

1. **Drag & Drop:** All components available in Builder.io component library
2. **Visual Editing:** Full property editing through Builder.io interface
3. **Responsive:** Mobile-first responsive design
4. **Type Safety:** Full TypeScript support

### Registered Components:

✅ EmpireButton, EmpireCard, EmpireInput, EmpireBadge  
✅ EmpireHero, EmpireFeatureGrid, EmpireCTA, EmpireStats  
✅ EmpireContainer, EmpireSection, EmpireGrid  
✅ SaintVisionAIPricingCards, Sidebar

## 🚀 Usage Examples

### Complete Landing Page

```tsx
function LandingPage() {
  return (
    <>
      <EmpireHero
        title="Build Your Empire"
        description="Revolutionary AI platform for modern entrepreneurs"
        primaryAction={{ text: "Start Building", href: "/signup" }}
        size="xl"
      />

      <EmpireFeatureGrid
        title="Powerful Features"
        columns={3}
        features={features}
      />

      <EmpireStats title="Trusted Worldwide" stats={statsData} />

      <EmpireCTA
        title="Ready to Dominate?"
        primaryAction={{ text: "Join Empire", href: "/signup" }}
      />
    </>
  )
}
```

### Form Example

```tsx
function ContactForm() {
  return (
    <EmpireCard variant="bordered" padding="xl">
      <EmpireInput label="Name" required />
      <EmpireInput type="email" label="Email" required />
      <EmpireInput type="textarea" label="Message" />
      <EmpireButton fullWidth size="lg">
        Send Message
      </EmpireButton>
    </EmpireCard>
  )
}
```

## 📁 File Structure

```
src/components/
├── core/           # Basic UI components
├── layout/         # Layout & structure
├── sections/       # Page sections
├── empire/         # Design system exports
├── styles/         # Design tokens
└── README.md       # This file
```

## 🎯 Best Practices

1. **Consistency:** Always use design tokens instead of hardcoded values
2. **Composition:** Combine components to build complex interfaces
3. **Accessibility:** All components include proper ARIA attributes
4. **Performance:** Components are optimized for fast rendering
5. **Responsive:** Mobile-first approach with breakpoint considerations

---

**Built with ❤️ for the SaintSal™ Empire**
