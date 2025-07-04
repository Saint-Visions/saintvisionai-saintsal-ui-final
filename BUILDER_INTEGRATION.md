# Builder.io Integration Guide

This project includes a comprehensive Builder.io integration that allows you to create and manage dynamic content with your Empire design system components.

## 🚀 Quick Start

1. **Environment Setup**
   - Your Builder.io API key is already configured: `VITE_BUILDER_API_KEY`
   - Builder.io is initialized automatically when you visit Builder routes

2. **Access Builder.io Content Management**
   - Visit [Builder.io Content](https://builder.io/content) to create and edit pages
   - Use your API key: `d83998c6a81f466db4fb83ab90c7ba25`

3. **View Your Content**
   - Main Builder interface: `/builder`
   - Dynamic content: `/builder/*` (any path under /builder)
   - Direct content routes: `/pages/*` and `/content/*`

## 📁 File Structure

```
src/
├── lib/
│   └── builder-config.ts          # Centralized Builder.io configuration
├── pages/
│   ├── builder.tsx                # Main Builder.io interface
│   └── builder-dynamic.tsx        # Dynamic content handler
└── builder-registry.ts            # Component registration
```

## 🧩 Registered Components

All Empire design system components are available in Builder.io:

### Core Components

- **EmpireButton** - Customizable buttons with variants, sizes, and actions
- **EmpireCard** - Container cards with different styles and padding
- **EmpireInput** - Form inputs with labels and validation
- **EmpireBadge** - Status badges and labels

### Layout Components

- **EmpireContainer** - Responsive containers with size options
- **EmpireSection** - Page sections with padding and background options
- **EmpireGrid** - Flexible grid layouts with responsive columns

### Section Components

- **EmpireHero** - Hero sections with title, description, and CTAs
- **EmpireFeatureGrid** - Feature showcases in grid format
- **EmpireCTA** - Call-to-action sections
- **EmpireStats** - Statistics display sections

### Application Components

- **SaintVisionAIPricingCards** - Pricing plan displays
- **Sidebar** - Navigation sidebar

## 🎨 Design System Integration

The Builder.io integration maintains your Empire design system:

- **Color Scheme**: Black backgrounds with yellow accents
- **Typography**: Consistent with your existing design
- **Components**: All styled to match your brand
- **Responsive**: Mobile-first design patterns

## 🛣️ Routing

### Fixed Routes (Protected)

These routes are reserved for your application and won't be overridden by Builder.io:

- `/pricing` - Pricing page
- `/dashboard` - Dashboard
- `/chat` - AI Chat
- `/console/*` - AI Console routes
- `/crm` - CRM integration
- And other application routes...

### Builder.io Routes

- `/builder` - Main Builder.io management interface
- `/builder/*` - Dynamic Builder.io content pages
- `/pages/*` - Additional dynamic content routes
- `/content/*` - Alternative content routes

### Homepage

The homepage (`/`) remains your Console Homepage. To create Builder.io content for the homepage:

1. Create a page in Builder.io with URL path: `/`
2. Content will be available at `/builder/` or by modifying the homepage route

## 🔧 Development Features

### Preview Mode

- Automatically enabled in development
- Live preview of changes
- Real-time content updates

### Error Handling

- Graceful fallbacks for missing content
- Clear error messages with action buttons
- Development-friendly debugging information

### Performance

- Content caching in production
- Optimized loading states
- Minimal bundle size impact

## 📝 Creating Content

### 1. Create a New Page

1. Go to [Builder.io Content](https://builder.io/content)
2. Click "New" > "Page"
3. Set the URL path (e.g., `/about`, `/landing`, etc.)
4. Design your page using the registered components

### 2. Use Empire Components

All your design system components are available in the Builder.io editor:

- Drag and drop components from the left panel
- Configure component properties in the right panel
- Preview changes in real-time

### 3. Publish Content

1. Click "Publish" in Builder.io
2. Visit your route (e.g., `/builder/about`)
3. Content appears immediately

## 🔗 API Integration

### Configuration

```typescript
// src/lib/builder-config.ts
export const BUILDER_CONFIG = {
  apiKey: import.meta.env.VITE_BUILDER_API_KEY,
  models: {
    page: "page",
    section: "section",
    data: "data"
  }
}
```

### Content Fetching

```typescript
import { getBuilderContent } from "../lib/builder-config"

const { content, error } = await getBuilderContent("page", {
  url: "/your-page-path"
})
```

## 🎯 Best Practices

### 1. URL Structure

- Use clear, semantic URLs: `/about`, `/contact`, `/features`
- Avoid conflicts with existing application routes
- Use the `/pages/` prefix for content-only pages

### 2. Component Usage

- Leverage EmpireContainer and EmpireSection for consistent layouts
- Use EmpireGrid for responsive designs
- Combine components to create rich page experiences

### 3. Content Organization

- Create reusable sections using the section model
- Use consistent naming conventions
- Document your content structure

## 🚨 Troubleshooting

### Content Not Loading

1. **Check API Key**: Verify `VITE_BUILDER_API_KEY` is set correctly
2. **Check URL Path**: Ensure the Builder.io page URL matches your route
3. **Check Publication**: Verify content is published, not just saved as draft

### Component Not Available

1. **Check Registration**: Verify component is exported from `src/components/index.ts`
2. **Check Registry**: Ensure component is registered in `builder-registry.ts`
3. **Restart Dev Server**: Sometimes registration requires a restart

### Preview Issues

1. **Enable Preview Mode**: Add `?builder.preview=true` to URL
2. **Check Permissions**: Ensure you're logged into Builder.io
3. **Clear Cache**: Try hard refresh or incognito mode

## 🔐 Environment Variables

Required variables in your `.env` file:

```env
VITE_BUILDER_API_KEY=your-api-key-here
VITE_APP_URL=your-app-url-here
```

## 📞 Support

- **Builder.io Documentation**: [https://www.builder.io/c/docs](https://www.builder.io/c/docs)
- **Component Issues**: Check the component source in `src/components/`
- **Integration Issues**: Review `src/lib/builder-config.ts`

## 🎉 What's Next?

Your Builder.io integration is now ready! You can:

1. **Create Your First Page**
   - Visit [Builder.io Content](https://builder.io/content)
   - Create a new page with path `/welcome`
   - Add some Empire components
   - Publish and visit `/builder/welcome`

2. **Explore Advanced Features**
   - Create reusable sections
   - Add custom data models
   - Implement A/B testing
   - Set up content scheduling

3. **Customize Further**
   - Add more components to the registry
   - Create custom field types
   - Implement advanced routing patterns

Your Empire design system is now fully integrated with Builder.io for powerful, visual content management! 🏆
