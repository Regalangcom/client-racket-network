# Racket Network Frontend

A modern sports/racket-based social network platform built with Next.js 14, featuring club management, match scheduling, competitions, and integrated payment processing.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Redux](https://img.shields.io/badge/Redux_Toolkit-2.8-764ABC?style=flat-square&logo=redux)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Key Features](#key-features)
- [Available Scripts](#available-scripts)
- [Custom Hooks](#custom-hooks)
- [Styling Guide](#styling-guide)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

---

## Overview

Racket Network (RN) is a comprehensive platform for racket sports enthusiasts. The application enables users to:

- **Join & Create Clubs** - Find local clubs or create your own community
- **Schedule Matches** - Organize and join matches with skill-based matchmaking
- **Compete** - Participate in tournaments and competitions
- **Connect** - Network with players in your area
- **Pay Seamlessly** - Integrated QRIS payment for match and competition fees

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript 5 |
| **State Management** | Redux Toolkit + redux-persist |
| **Authentication** | NextAuth.js (JWT strategy) |
| **Styling** | Tailwind CSS 3.4 + shadcn/ui |
| **Forms** | React Hook Form + Zod validation |
| **API Client** | Axios |
| **Error Tracking** | Sentry |
| **Icons** | Lucide React, React Icons |
| **Date Utilities** | date-fns, React Day Picker |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Regalangcom/client-racket-network.git
   cd client-racket-network
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_URL_API=your_backend_api_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

   # Optional: Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open the application**

   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (application)/            # Main app routes (protected)
│   │   ├── (main)/               # Home page
│   │   ├── account/              # User account (profile, inbox, settings)
│   │   ├── club/                 # Club management
│   │   ├── match/                # Match features
│   │   ├── competitions/         # Competition features
│   │   └── layout.tsx            # App layout (navbar/footer)
│   ├── (auth)/                   # Authentication routes
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   ├── reset-password/
│   │   ├── otp/
│   │   └── layout.tsx            # Auth layout (minimal)
│   ├── api/auth/                 # NextAuth API route
│   ├── payment/                  # Payment pages
│   ├── qris/                     # QRIS payment gateway
│   └── _components/              # App-level shared components
├── components/                   # Feature components
│   ├── ui/                       # shadcn/ui base components
│   ├── account/                  # Profile, inbox, settings
│   ├── club/                     # Club management
│   ├── competitions/             # Competition features
│   ├── match/                    # Match features
│   ├── home/                     # Home page components
│   ├── qris/                     # QRIS payment UI
│   ├── navbar/                   # Navigation
│   └── footer/                   # Footer
├── redux/                        # State management
│   ├── index.ts                  # Store configuration
│   └── store/                    # Slices (auth, payment, inbox)
├── lib/                          # Utilities
│   ├── auth-options.ts           # NextAuth configuration
│   └── utils.ts                  # Helper functions
├── hooks/                        # Custom React hooks
├── services/                     # API service classes
├── constant/                     # Constants and TypeScript types
│   └── types/                    # Type definitions
└── public/                       # Static assets (icons, images)
```

### Route Groups

| Group | Purpose | Layout |
|-------|---------|--------|
| `(application)` | Main app routes (protected) | Navbar + Footer |
| `(auth)` | Authentication pages | Minimal (no navbar) |

---

## Architecture

### Server vs Client Components

The application follows Next.js 14 best practices:

- **Server Components** (default) - Used for data fetching and rendering
  ```typescript
  // src/app/(application)/(main)/page.tsx
  export default async function HomePage() {
    const session = await getAuthServerSession();
    const data = await fetchData(session.access_token);
    return <HomeClient data={data} />;
  }
  ```

- **Client Components** - Used for interactivity
  ```typescript
  'use client';
  // For forms, modals, state management, session hooks
  ```

### State Management (Redux)

Three persisted slices manage application state:

```typescript
// Store Structure
{
  auth: {
    authState: boolean
  },
  payment: {
    qrString: string | null,
    orderId: string | null
  },
  inbox: {
    items: InboxItem[],
    loading: boolean,
    error: string | null
  }
}
```

### Authentication Flow

1. User submits credentials
2. Backend API validates and returns JWT
3. NextAuth stores token in session
4. Server components use `getAuthServerSession()`
5. Client components use `useSession()` hook

```typescript
// Server-side auth check
import { getAuthServerSession } from '@/lib/auth-options';

export default async function ProtectedPage() {
  const session = await getAuthServerSession();
  if (!session) redirect('/sign-in');
  // ...
}
```

---

## Key Features

### 1. Authentication
- JWT-based authentication via NextAuth.js
- Credentials provider (email/password)
- OTP verification
- Password reset flow
- Protected routes with auth guards

### 2. Club Management
- Browse and search clubs
- Create clubs with logo upload
- Join clubs (with approval workflow)
- Club owner management features
- Member request handling

### 3. Match Management
- List matches with server-side filtering via URL search params
- **Search by name** — partial, case-insensitive match (`?name=padel`)
- **Filter by gender restriction** — exact match (`?gender_restriction=Woman only`)
- **Filter by skill level** — Beginner / Intermediate / Advanced (`?skill_level=Beginner`)
- **Filter by location** — partial, case-insensitive match (`?location=jakarta`)
- Filters are combinable and persist in the URL for shareability
- Match details with time slot selection
- Match registration with payment
- Promo code support
- Real-time participant tracking

#### Match Filter API Reference

| Param | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Partial, case-insensitive name search | `?name=padel` |
| `location` | string | Partial, case-insensitive location search | `?location=union` |
| `gender_restriction` | string | Exact match on gender rule | `?gender_restriction=Woman only` |
| `skill_level` | string | Exact match: Beginner, Intermediate, Advanced | `?skill_level=Beginner` |
| `date` | string (ISO) | Filter matches on a specific day | `?date=2026-03-05` |
| `page` | number | Page number, default 1 | `?page=1` |
| `limit` | number | Items per page, default 10 | `?limit=10` |

### 4. Competition Management
- Competition listings with search
- Skill-level based registration
- Competition payment processing
- Venue and organizer information

### 5. Payment System
- **Midtrans QRIS** integration
- Order creation and tracking
- Payment status polling
- Floating countdown timer for payment deadlines
- Voucher/promo code discounts
- Payment history

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (binds to 0.0.0.0) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Custom Hooks

| Hook | Purpose |
|------|---------|
| `useCountdowns` | Manage multiple payment countdown timers |
| `useDatePicker` | Date/date range picker state (single/range modes) |
| `useWindowDimension` | Device detection (mobile/tablet/laptop) + dimensions |
| `useLogoUpload` | File upload with preview for logos |
| `useInbox` | Redux wrapper for inbox operations |

### Usage Example

```typescript
import { useWindowDimension } from '@/hooks/useWindowdimension';

function ResponsiveComponent() {
  const { isMobile, isTablet, width } = useWindowDimension();

  if (isMobile) return <MobileView />;
  return <DesktopView />;
}
```

---

## Styling Guide

### Custom Colors (CSS Variables)

```css
--color-green-rc         /* Primary brand green */
--background-button-rc   /* Button backgrounds */
--background-card-rc     /* Card backgrounds */
```

### Custom Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `xs` | 375px | Extra small mobile |
| `sm` | 640px | Small mobile |
| `md` | 768px | Tablet |
| `laptop` | 1024px | Laptop |
| `desktop` | 1280px | Desktop |

### Responsive Component Pattern

Many components have mobile/desktop variants:

```
components/account/profile/
├── profile-page.tsx      # Responsive wrapper
├── profile-mobile.tsx    # Mobile layout
└── profile-dekstop.tsx   # Desktop layout
```

### Using Tailwind Classes

```typescript
import { cn } from '@/lib/utils';

<div className={cn(
  "base-classes",
  condition && "conditional-classes"
)} />
```

---

## Deployment

### Build Output

The project is configured for **standalone** output, optimized for containerized deployment:

```javascript
// next.config.js
module.exports = {
  output: 'standalone',
  // ...
}
```

### Production Deployment

```bash
# Build
npm run build

# Copy static files for standalone
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Start with Node.js or PM2
node .next/standalone/server.js
# or
pm2 start node --name rn -- .next/standalone/server.js
```

### Image Domains

Configured remote image sources:
- `galangbucket.s3.ap-southeast-2.amazonaws.com` (AWS S3)
- `api.sandbox.midtrans.com` (Midtrans)
- `ui-avatars.com` (Avatar generation)
- `lh3.googleusercontent.com` (Google avatars)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_URL_API` | Yes | Backend API base URL |
| `NEXTAUTH_SECRET` | Yes | Secret for JWT signing |
| `NEXTAUTH_URL` | Yes | Application URL |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry error tracking DSN |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |

---

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run lint` to check for issues
4. Submit a pull request

---

## License

Private - All rights reserved.