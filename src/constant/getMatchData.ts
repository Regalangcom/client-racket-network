import { sampeImage } from "@/public";

export async function getMatchData(id: string) {
  const dummyData: Record<string, any> = {
    "1": {
      title: "Tennis Thursday Night",
      logo: sampeImage,
      date: "30 April, 19:15",
      location: "Smes Sport Bintaro",
      price: "Rp 100,000",
      club: "Green Club",
      description:
        "Lorem ipsum is a dummy text commonly used in graphic design, publishing, and web development.",
      times: ["18:00 - 19:00", "20:00 - 21:00"],
    },
    "2": {
      title: "Football Friday Night",
      logo: sampeImage,
      date: "1 May, 20:00",
      location: "Football Field ABC",
      price: "Rp 80,000",
      club: "Red Club",
      description: "A fun and competitive football match for all skill levels.",
      times: ["19:00 - 20:00", "21:00 - 22:00"],
    },
  };

  return dummyData[id] || null;
}

export async function getCompData(id: string) {
  const dummyData: Record<string, any> = {
    "1": {
      title: "Jakarta - Women Single",
      organized: "Organized by GRC",
      logo: sampeImage,
      contact_avatar: sampeImage,
      date: "30 April, 19:15",
      location: "Smes Sport Bintaro",
      price: "Rp 100,000",
      club: "Green Club",
      description:
        "Lorem ipsum is a dummy text commonly used in graphic design, publishing, and web development.",
      name_contact: "andi cobra",
    },
    "2": {
      title: "Football Friday Night",
      logo: sampeImage,
      contact_avatar: sampeImage,
      organized: "Organized by GRC",
      date: "1 May, 20:00",
      location: "Football Field ABC",
      price: "Rp 80,000",
      club: "Red Club",
      description: "A fun and competitive football match for all skill levels.",
    },
  };

  return dummyData[id] || null;
}

export async function getProfileClubData(id: string) {
  const dummyData: Record<string, any> = {
    "1": {
      title: "Jakarta - Women Single",
      logo: sampeImage,
      contact_avatar: sampeImage,
      genre: "Tennis",
      location: "Smes Sport Bintaro",
      member: "28 Members",
      club: "Green Club",
      stars: "4 Stars",
      name_contact: "andi cobra",
    },
  };

  return dummyData[id] || null;
}

// constant/getMatchData.ts
export async function getMatchDataBeforePayment(id: string) {
  const dummyData: Record<string, any> = {
    "1": {
      title: "Jaksel Cup - Women Single", // Tambahkan title
      date: "07 August - 20 August 2025",
      location: "Smes Sport Bintaro",
      price: "Rp 100.000",
      genre: "Tennis",
      club: "Green Club",
      times: ["18:00 - 19:00", "20:00 - 21:00"],
    },
  };

  return dummyData[id] || null;
}
