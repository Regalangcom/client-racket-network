import { StaticImageData } from "next/image";

export interface Match {
  id: string;
  clubName: string;
  title: string;
  date: string;
  location: string;
  status: "ongoing" | "created" | "completed";
  imageUrl: StaticImageData;
}
