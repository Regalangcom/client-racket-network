import { FotograferEvent, FotograferInvitation } from "@/constant/types/fotografer";

export const MOCK_FOTOGRAFER_EVENTS: FotograferEvent[] = [
  { id: 1, event_name: "Mayaw After Teraweh", time_date: "18 March 2025, 17:00 – 19:00", field: "Gor Dimensi", club: "Sinisuka Padel" },
  { id: 2, event_name: "Mabar Kamis Malam", time_date: "18 March 2025, 19:00 – 22:00", field: "Gnaan Pramuka", club: "Overtime Fit" },
  { id: 3, event_name: "Weekday Padel", time_date: "16 March 2025, 17:00 – 19:00", field: "Tebes Arena", club: "Hayu Fun Club" },
  { id: 4, event_name: "Mayaw After Teraweh", time_date: "12 March 2025, 17:00 – 18:00", field: "Yuno Sport", club: "Sinisuka Padel" },
  { id: 5, event_name: "Mabar Kamis Malam", time_date: "10 March 2025, 19:00 – 22:00", field: "Gor Sima", club: "Sima Tennis Club" },
  { id: 6, event_name: "Mayaw After Teraweh", time_date: "10 March 2025, 17:00 – 19:00", field: "Yuno Sport", club: "Sinisuka Padel" },
  { id: 7, event_name: "Hop Padel", time_date: "10 March 2025, 15:00 – 17:00", field: "Tebes Arena", club: "Uvuye Club" },
  { id: 8, event_name: "Mayaw After Teraweh", time_date: "9 March 2025, 17:00 – 19:00", field: "Gnaan Pramuka", club: "Sima Tennis Club" },
  { id: 9, event_name: "Mabar Kamis Malam", time_date: "8 March 2025, 15:00 – 17:00", field: "Hune Sport", club: "Overtime Fit" },
  { id: 10, event_name: "Mabar Kamis Malam", time_date: "2 March 2025, 17:00 – 20:00", field: "Yuno Sport", club: "Uvuye Club" },
];

export const MOCK_INVITATIONS: FotograferInvitation[] = [
  { id: 1, name: "Adi Irawan" },
  { id: 2, name: "Irene K" },
  { id: 3, name: "Rudy Albert" },
];

export function getMockEventById(id: number): FotograferEvent | undefined {
  return MOCK_FOTOGRAFER_EVENTS.find((e) => e.id === id);
}
