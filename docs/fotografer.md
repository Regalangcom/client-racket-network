# Fotografer Feature

Dashboard for photographers to manage events they are assigned to — view event list, event details, and handle invitations.

---

## Routes

| URL | Page file | Description |
|-----|-----------|-------------|
| `/dashboard` | `app/(fotografer)/dashboard/page.tsx` | Event list |
| `/dashboard/event/[id]` | `app/(fotografer)/dashboard/event/[id]/page.tsx` | Event detail |
| `/login` | `app/(fotografer)/login/page.tsx` | Photographer login |

> **Note:** `(fotografer)` is a Next.js route group — the parentheses are stripped from the URL entirely.

---

## File Structure

```
src/
├── app/
│   └── (fotografer)/
│       ├── dashboard/
│       │   ├── layout.tsx               # Shared layout: sidebar + topnav
│       │   ├── page.tsx                 # Event list page (Server Component)
│       │   └── event/
│       │       └── [id]/
│       │           └── page.tsx         # Event detail page (Server Component)
│       └── login/
│           └── page.tsx
│
├── components/fotografer/
│   ├── top-navbar.tsx                   # Top navbar with dynamic breadcrumb
│   ├── sidebar.tsx                      # Left sidebar with nav items
│   ├── event-table.tsx                  # Event list table with search + pagination
│   ├── event-detail.tsx                 # Event detail with tabs (Detail / Invitations / Other)
│   └── login-form.tsx
│
├── services/
│   └── fotografer-service.ts            # API service (static class)
│
└── constant/
    ├── types/
    │   └── fotografer.ts                # TypeScript types
    └── mock/
        └── fotografer-events.ts         # Mock data (used until backend is ready)
```

---

## Data Flow

```
Server Component (page.tsx)
  │
  ├── getAuthServerSession()        → gets access_token from session
  │
  └── FotograferService.getEvents() → returns FotograferEvent[]
        │
        ├── [mock]  returns MOCK_FOTOGRAFER_EVENTS
        └── [real]  fetch(`/api/v1/fotografer/events`, { Authorization: Bearer <token> })
              │
              └── passes data as props to Client Components
```

---

## Types

```ts
// src/constant/types/fotografer.ts

type FotograferEvent = {
  id: number;
  event_name: string;
  time_date: string;   // e.g. "18 March 2025, 17:00 – 19:00"
  field: string;
  club: string;
};

type FotograferInvitation = {
  id: number;
  name: string;
  avatar?: string;     // optional URL, falls back to gray placeholder
};
```

---

## Service

`src/services/fotografer-service.ts` — static class, same pattern as `MatchService` / `ClubService`.

| Method | Description |
|--------|-------------|
| `FotograferService.getEvents(access_token)` | Fetch all events for the photographer |
| `FotograferService.getEventById(id, access_token)` | Fetch single event by ID |
| `FotograferService.getEventInvitations(eventId, access_token)` | Fetch invitations for an event |

All methods accept `access_token: string | null` and return an empty array / `null` on error (no throw to surface).

---

## Components

### `FotograferEventTable`
- **Type:** Client Component (`"use client"`)
- **Props:** `eventList: FotograferEvent[]`
- **Features:** search filter, rows-per-page selector, pagination, `View` link per row

### `FotograferEventDetail`
- **Type:** Client Component (`"use client"`)
- **Props:** `event: FotograferEvent`, `invitations?: FotograferInvitation[]`
- **Tabs:**
  - **Detail** — time/date, field, club; photo upload area; copy link button
  - **Invitations** — grid of person cards with accept (✓) / reject (✕) buttons; badge count on tab
  - **Other** — placeholder

### `FotograferTopNavbar`
- Reads `usePathname()` internally to show dynamic breadcrumb
  - `/dashboard` → `Home`
  - `/dashboard/event/*` → `Event List > Event Detail`

### `FotograferSidebar`
- Active state uses `pathname.startsWith(href)` so nested routes like `/dashboard/event/[id]` keep "Home" highlighted

---

## Connecting to the Real API

When the backend is ready, open `src/services/fotografer-service.ts` and for each method:

1. **Uncomment** the `fetch()` block
2. **Delete** the mock `return` line below it

Example for `getEvents`:

```ts
// Before (mock)
return MOCK_FOTOGRAFER_EVENTS;

// After (real API)
const headers: HeadersInit = {};
if (access_token) headers["Authorization"] = `Bearer ${access_token}`;

const response = await fetch(
  `${process.env.NEXT_PUBLIC_URL_API}/api/v1/fotografer/events`,
  { headers, cache: "no-store" }
);
if (!response.ok) throw new Error("Failed to fetch events");
const data = await response.json();
return data.data || [];
```

**Pages and components need zero changes.** Only `fotografer-service.ts` is touched.

---

## Mock Data

Located in `src/constant/mock/fotografer-events.ts`.  
Safe to delete the entire `constant/mock/` folder once the real API is connected.

---

## Adding a New Feature (e.g. "Other" tab content)

1. Add new type to `src/constant/types/fotografer.ts`
2. Add new service method to `src/services/fotografer-service.ts`
3. Call it in the relevant page with `await FotograferService.getXxx(id, access_token)`
4. Pass as prop to the component
5. Implement UI in `src/components/fotografer/event-detail.tsx` inside `OtherTab`
