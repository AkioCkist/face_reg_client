# Face Recognition Attendance System - N-Layer Architecture

This project has been restructured into a proper N-layer architecture for better maintainability, scalability, and separation of concerns.

## 🏗️ Architecture Overview

```
face_reg_client/
├── src/
│   ├── app/                          # Next.js App Router (Presentation Layer)
│   ├── components/                   # UI Components (Presentation Layer)
│   ├── lib/                          # Business Logic Layer
│   ├── store/                        # State Management Layer
│   └── types/                        # Type Definitions
├── public/                           # Static Assets
├── docs/                            # Documentation
├── tests/                           # Test files
└── components/                      # Legacy components (for backward compatibility)
```

## 🎯 Layer Descriptions

### 1. Presentation Layer (`src/app/` & `src/components/`)

**Purpose**: Handles user interface and user interactions

- **`src/app/`**: Next.js App Router pages and layouts
- **`src/components/ui/`**: Basic reusable UI components (Button, Input, etc.)
- **`src/components/layout/`**: Application layout components (Header, Sidebar, etc.)
- **`src/components/features/`**: Feature-specific components grouped by domain

### 2. Business Logic Layer (`src/lib/`)

**Purpose**: Contains application logic, API communication, and utilities

- **`src/lib/services/`**: API service classes for external communication
- **`src/lib/hooks/`**: Custom React hooks for state management
- **`src/lib/utils/`**: Utility functions (validators, formatters, helpers)
- **`src/lib/config/`**: Application configuration files

### 3. State Management Layer (`src/store/`)

**Purpose**: Manages application state and data flow

- **`src/store/slices/`**: Redux slices or state management logic
- **`src/store/providers/`**: Context providers and state providers

### 4. Type Definitions (`src/types/`)

**Purpose**: TypeScript/JSDoc type definitions for better code documentation

- **`auth.types.js`**: Authentication related types
- **`user.types.js`**: User management types
- **`attendance.types.js`**: Attendance system types

## 🔧 Key Features

### Services Layer
- **AuthService**: Handles login, logout, registration, and token management
- **AttendanceService**: Manages attendance marking and history
- **UserService**: User profile and management operations
- **FaceRecognitionService**: Face detection and recognition operations

### Custom Hooks
- **useAuth**: Authentication state and operations
- **useAttendance**: Attendance-related operations
- **useFaceRecognition**: Face recognition functionality

### Utilities
- **Validators**: Form validation functions
- **Formatters**: Data formatting utilities
- **Helpers**: Common utility functions
- **Constants**: Application constants and configurations

## 📁 Component Organization

### UI Components (`src/components/ui/`)
```
├── Button.js          # Reusable button component
├── Input.js           # Form input component
├── Checkbox.js        # Checkbox component
├── Divider.js         # Visual divider component
├── Logo.js            # Application logo
├── SocialButton.js    # Social media buttons
└── index.js           # Barrel export
```

### Layout Components (`src/components/layout/`)
```
├── Header.js          # Application header
├── Sidebar.js         # Navigation sidebar
├── DashboardLayout.js # Dashboard wrapper layout
└── index.js           # Barrel export
```

### Feature Components (`src/components/features/`)
```
├── auth/              # Authentication components
│   ├── LoginForm.js
│   ├── LoginBranding.js
│   └── index.js
├── dashboard/         # Dashboard feature components
│   ├── WelcomeHeader.js
│   ├── SalesCard.js
│   ├── ProjectsTable.js
│   └── index.js
└── attendance/        # Attendance feature components
    └── index.js
```

## 🚀 Usage Examples

### Importing Components
```javascript
// From UI layer
import { Button, Input, Logo } from '../components/ui';

// From layout layer
import { Header, Sidebar, DashboardLayout } from '../components/layout';

// From features layer
import { LoginForm } from '../components/features/auth';
import { SalesCard, ProjectsTable } from '../components/features/dashboard';
```

### Using Services
```javascript
import { AuthService, AttendanceService } from '../lib/services';

// Login user
const result = await AuthService.login({ email, password });

// Mark attendance
const attendance = await AttendanceService.markAttendance(faceData);
```

### Using Custom Hooks
```javascript
import { useAuth, useAttendance } from '../lib/hooks';

function MyComponent() {
  const { user, login, logout } = useAuth();
  const { markAttendance, loading } = useAttendance();
  
  // Component logic...
}
```

### Using Utilities
```javascript
import { validateEmail, formatDate, debounce } from '../lib/utils';

const isValid = validateEmail(email);
const formattedDate = formatDate(new Date());
const debouncedSearch = debounce(searchFunction, 300);
```

## 🔄 Migration Guide

### Old Structure → New Structure
```
components/common/Button.js      → src/components/ui/Button.js
components/dashboard/Header.js   → src/components/layout/Header.js
components/auth/LoginForm.js     → src/components/features/auth/LoginForm.js
```

### Import Updates
```javascript
// Old
import { Button } from '../../components/common';
import { LoginForm } from '../../components/auth';

// New
import { Button } from '../components/ui';
import { LoginForm } from '../components/features/auth';
```

## 🧪 Testing Strategy

The new structure supports better testing:

- **Unit Tests**: Individual services, utilities, and components
- **Integration Tests**: Feature components with their hooks and services
- **E2E Tests**: Full user workflows across layers

## 📈 Benefits

1. **Separation of Concerns**: Each layer has a clear responsibility
2. **Maintainability**: Easier to locate and modify code
3. **Scalability**: Easy to add new features and components
4. **Reusability**: UI components and utilities are highly reusable
5. **Testability**: Each layer can be tested independently
6. **Type Safety**: Comprehensive type definitions improve code quality

## 🔧 Development Guidelines

1. **Single Responsibility**: Each component/service should have one clear purpose
2. **Dependency Direction**: Higher layers depend on lower layers, not vice versa
3. **Barrel Exports**: Use index.js files for clean imports
4. **Consistent Naming**: Follow established naming conventions
5. **Documentation**: Document complex business logic and API interfaces

## 🚧 Next Steps

1. Implement proper error boundaries
2. Add comprehensive logging
3. Implement caching strategies
4. Add performance monitoring
5. Enhance type definitions
6. Add automated testing

This N-layer architecture provides a solid foundation for the Face Recognition Attendance System that can scale and evolve with your requirements.
