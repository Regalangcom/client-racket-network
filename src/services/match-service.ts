// services/match-service.ts
import { sampeImage } from "@/public";
import { MatchCardViewProps } from "@/constant/types";

export async function getMatches(): Promise<MatchCardViewProps[]> {
  // Di sini bisa fetch data dari API
  const dummyMatches: MatchCardViewProps[] = [
    {
      id: "1",
      title: "Tennis Thursday Night",
      logo: sampeImage,
      time: "30 April, 19:15",
      location: "Smes Sport Bintaro",
      clubName: "Green Club",
    },
    {
      id: "2",
      title: "Tennis Friday Afternoon",
      logo: sampeImage,
      time: "1 May, 15:30",
      location: "Smes Sport Bintaro",
      clubName: "Green Club",
    },
  ];

  return dummyMatches;
}

export async function getMatchById(
  id: string
): Promise<MatchCardViewProps | null> {
  const matches = await getMatches();
  return matches.find((match) => match.id === id) || null;
}
