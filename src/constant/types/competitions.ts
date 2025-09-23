import { StaticImageData } from "next/image";

export interface CompetitionsDetailCardProps {
  title: string;
  logo: string;
  date: string;
  location: string;
  price: string;
  club: string;
  description: string;
  name_contact: string;
  organized: string;
  contact_avatar: string;
}

export interface CompetitionsRegisterProps {
  title: string;
  date: string;
  location: string;
  price: string;
  club: string;
  time: string;
  times: string[];
}

export type IconEnvCompetitons = {
  icon: StaticImageData;
  label: string;
};
