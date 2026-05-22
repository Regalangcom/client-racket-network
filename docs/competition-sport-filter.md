# Competition — Sport Category Filter

Documents the full flow of `sport_category` from club creation → competition creation → competition filter page.

---

## Overview

When an owner creates a club they pick a sport (e.g. Tennis, Padel). When they later create a competition from that club, the competition automatically inherits the club's `sport_category`. Users on the competitions page can then filter by sport, which is delegated to the backend.

---

## Flow

```
Owner creates Club
  └── picks sport_category (Tennis | Padel | PingPong | Badminton)
        └── saved to BE with the club

Owner creates Competition (from club detail page)
  └── MenuJoined → UnifiedEventDialog → CompetitionForm
        └── payload includes sport_category: clubData.sport_category
              └── POST /api/v1/competitions  { sport_category: "Tennis", ... }
                    └── saved to BE with the competition

User visits /competitions?sport_category=Tennis
  └── CompetitionsPage passes sport_category to service
        └── GET /api/v1/competitions?sport_category=Tennis  ← BE filters
              └── returns only Tennis competitions
```

---

## Files Involved

| File | Role |
|------|------|
| `src/constant/club-tags.ts` | Single source of truth for `SPORT_OPTIONS` |
| `src/constant/types/competitions.ts` | `CompetitionCreatePayload` type |
| `src/services/comp-services.ts` | API calls — create & fetch competitions |
| `src/components/club/joined/menu-joined/menu-joined.tsx` | Builds competition payload (includes sport_category) |
| `src/components/competitions/competitions-filter.tsx` | Filter buttons — driven by `SPORT_OPTIONS` |
| `src/app/(application)/competitions/page.tsx` | Passes sport_category to BE, client-side search filter |

---

## Sport Options

All sport options are defined in one place:

```ts
// src/constant/club-tags.ts
export const SPORT_OPTIONS = [
  { value: "Tennis",    label: "Tennis" },
  { value: "Padel",     label: "Padel" },
  { value: "PingPong",  label: "PingPong" },
  { value: "Badminton", label: "Badminton" },
] as const;
```

**To add a new sport:** add it here — the filter buttons in `competitions-filter.tsx` update automatically.

> PingPong currently uses the Padel icon (`padel.svg` / `padelActive.svg`) as a fallback in `competitions-filter.tsx` because no dedicated icon exists yet.

---

## Backend Response Shape

```json
GET /api/v1/competitions?sport_category=Padel

{
  "success": true,
  "data": [
    {
      "id": 1,
      "name_comp": "Padel Open Jakarta",
      "sport_category": "Padel",
      "organizer_name": "DC Jakarta",
      "location": "Jakarta Selatan",
      "competition_date": "2026-06-01",
      "quota": 32,
      "slot_left": 20,
      "status": "PUBLISHED"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

The array lives at `response.data` — the service extracts it with `data.data || []`.

---

## Creating a Competition (Owner)

`menu-joined.tsx` builds the payload and passes `sport_category` from the club data:

```ts
const payload = {
  club_id: clubId,
  name_comp: data.event_title,
  ...
  sport_category: clubData?.sport_category || "",  // ← inherited from club
};

await CompetitionsService.createCompetition(payload, access_token);
```

`comp-services.ts` appends it to FormData:

```ts
if (payload.sport_category) {
  formData.append("sport_category", payload.sport_category);
}
```

---

## Fetching & Filtering Competitions

Sport filter is handled by the **backend** (Option A). Search filter is handled **client-side** because the backend does not support search queries yet.

```ts
// competitions/page.tsx

// sport_category → sent to BE as query param
const AllCompetitions = await CompetitionsService.getAllCompetition(
  { sport_category: sportCategory || undefined },
  access_token || null
);

// search → filtered client-side
const filteredCompetitions = AllCompetitions.filter((comp) => {
  return searchQuery
    ? comp.name_comp.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.organizer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.location.toLowerCase().includes(searchQuery.toLowerCase())
    : true;
});
```

---

## Filter UI

`competitions-filter.tsx` maps `SPORT_OPTIONS` into filter buttons. Each button toggles `?sport_category=<name>` in the URL, which triggers a server re-render.

```ts
const iconMap = {
  Tennis:   { icon: tenis,     activeIcon: tenisActive },
  Padel:    { icon: padel,     activeIcon: padelActive },
  PingPong: { icon: padel,     activeIcon: padelActive },  // fallback icon
  Badminton:{ icon: badmindton, activeIcon: badmindtonActive },
};

const filters = SPORT_OPTIONS.map((sport) => ({
  name: sport.label,
  ...iconMap[sport.value],
}));
```

Clicking the same active filter a second time removes the `sport_category` param (shows all sports).

---

## Error Handling

`getAllCompetition` returns `[]` on any error (network failure, non-ok response) — never `undefined`. This prevents `.filter()` from crashing on the page.

```ts
} catch (error) {
  console.error("Error fetching matches:", error);
  return [];   // ← safe fallback
}
```

---

## Adding a New Sport Icon

1. Add the icon file to `src/public/assets/icons/`
2. Export it from `src/public/index.tsx`
3. Add the active variant if available
4. Update `iconMap` in `src/components/competitions/competitions-filter.tsx`
5. Update `SPORT_ICONS` in `src/constant/club-tags.ts` (used by club cards)
