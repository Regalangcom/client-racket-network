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
  // title: string;
  // date: string;
  // location: string;
  // price: string;
  // club: string;
  // time: string;
  // times: string[];
  title: string;
  location: string;
  time: string;
  price: string;
  club: string;
}

export type IconsCompetitonsProps = {
  icon: StaticImageData;
  label: string | number;
  textClass?: string;
  containerClass?: string;
};
