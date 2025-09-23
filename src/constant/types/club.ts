// /src/types/club.d.ts
import { StaticImageData } from "next/image";

export interface ClubDetailCardProps {
  title: string;
  logo: string;
  club: string;
  genre: string;
  name_contact: string;
  member: string;
  contact_avatar: string;
  stars_label: string;
}

export type IconEnvClub = {
  icon: StaticImageData;
  label: string;
};
