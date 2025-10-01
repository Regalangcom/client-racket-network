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

export interface MatchRegisterProps {
  location: string;
  time: string;
  price: string;
  club: string;
}

export interface MatchDetailCardProps {
  title?: string;
  logo?: string;
  date?: string;
  location?: string;
  price: string;
  club: string;
  description: string;
  times: string[];
}

export interface MatchCardViewProps {
  id: string;
  title: string;
  time: string;
  location: string;
  logo?: StaticImageData;
  clubName: string;
}

export interface MatchCardProps {
  match: MatchCardViewProps;
}

export type DetailItem = {
  icon: StaticImageData;
  label: string;
  hasTimeSelector?: boolean;
  times?: string[];
};
