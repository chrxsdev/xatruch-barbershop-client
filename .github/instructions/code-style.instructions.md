---
applyTo: '**/*.ts, **/*.tsx, **/*.js, **/*.jsx'
---

# PROJECT CODING STANDARDS & BEST PRACTICES

- Prioritize clean, maintainable code with appropriate comments.

## Code Style & Conventions

### React.js Code Structure

- Use **functional components** with TypeScript
- Export components as **named exports** from files
- Use **explicit interfaces** for props with descriptive names
- Get all props as a single object and destructure them in the function signature
- Avoid React.FC/FC, type props in the function signature directly
- Interfaces for props should be in the same file, the rest in separate files

```tsx
interface SomeSectionProps {
  projectsCount: number;
  yearsExperience: string;
}

export const SomeSection = ({ projectsCount, yearsExperience }: SomeSectionProps) => {
  // Component logic
};
```

### Code Style Guidelines

- Use **strict TypeScript** configuration
- Follow **PascalCase** for component, function, variable, and type names
- Use **arrow functions** for all components, layout, pages, utility files and all the functions (lib, utils, functions in components or hooks) and export them as default
- Use **optional chaining** and **nullish coalescing** for safe property access
- Define **explicit interfaces** for all props and complex objects
- Use **type-only imports** when importing types: `import type { ComponentType } from 'react'`
- Avoid `any` type - use proper typing or `unknown`
- **Use always single quotes** (`'`) over double quotes (`"`) in JS/TS, JSX/TSX, HTML, CSS files
- Use **2 spaces for indentation** (applies to all files)
- Use **`async/await`** for asynchronous operations
- Use Async/Await syntax for all async operations
- Catch and handle errors with logging
- User ?? instead of || when rendering default values
- Avoid declaring multiple components in the same file; if creating a new component is necessary, always place it in a separate file.

### Styling Conventions

- Implement **custom CSS variables** for theme colors
- Use the `cn()` utility function for conditional classes: `cn(clsx, twMerge)`
- Follow **mobile-first** responsive design approach

### State Management

- Use the current React Redux Toolkit setup with the implemented slices
- Use **React hooks** for local state (`useState`, `useEffect`)
- Implement **custom hooks** for reusable logic
- Follow **proper hook dependencies** in useEffect arrays

### Component Patterns

- Use **compound components** for complex UI elements
- Implement **proper loading states** and error boundaries
- Use **React.memo** for performance optimization when needed
- Handle **async operations** with proper error handling

### Animation Guidelines

- Use **CSS transitions** for simple hover effects with tailwind when possible
- Use **GSAP** for complex animations

### API Integration

- Use **Supabase client** for backend operations
- Implement **proper error handling** for API calls
- Use **TypeScript types** for API responses
- Handle **loading states** appropriately

## Design System

### Layout

- **Mobile-first** responsive design
- **Grid/Flexbox** layouts for complex structures
- **Consistent spacing** using Tailwind spacing scale
- **Maximum width containers** for content centering

## Common Patterns to Follow

1. **Always use TypeScript interfaces** for component props, parameters (if params are more than 3), and return types
2. **Export components as named exports** (not default)
3. **Use the `cn()` utility** for className combinations
4. **Implement proper loading and error states**
5. **Follow the established folder structure**
6. **Use custom hooks** for reusable logic
7. **Maintain responsive design** principles
8. **Keep animations performant** and accessible

## Code Quality Standards

- **ESLint configuration** is enforced
- **Consistent formatting** across the codebase
- **Meaningful variable and function names**
- **Proper TypeScript typing** for all functions and components
- **Comment complex logic** and business rules
- **Keep components focused** and single-purpose
