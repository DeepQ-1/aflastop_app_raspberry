# CLAUDE.md - AflaStop Application Guide

## Build & Development Commands
- `npm run dev` - Start development server
- `npm run dev:electron` - Start electron development server
- `npm run build` - Build web application
- `npm run build:electron` - Build electron application
- `npm run electron:start` - Start electron application
- `npm run electron:package` - Package electron application
- `npm run electron:make` - Make electron installer

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces and type definitions
- **Components**: Functional components with React hooks
- **Imports**: Group imports by: React, libraries, components, utils/types
- **Naming**:
  - PascalCase for components and interfaces
  - camelCase for functions, variables and props
  - snake_case for storage keys
- **State Management**: Use context API for shared state
- **Formatting**: Follow ESLint recommendations
  - No unused variables or parameters
  - Consistent indentation
- **Error Handling**: Wrap components in ErrorBoundary when appropriate
- **Internationalization**: Use i18next for translations

## Project Structure
- `/src` - Application source code
- `/electron` - Electron-specific code
- `/dependency_scripts` - External script dependencies
- `/autostart_scripts` - Autostart configuration