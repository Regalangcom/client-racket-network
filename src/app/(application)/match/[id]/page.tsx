import { notFound } from "next/navigation";
import { getMatchData } from "@/constant/getMatchData";
import MatchDetailCard from "@/components/match/matchDetailCard";

export default async function MatchDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Ambil data match berdasarkan ID
  const match = await getMatchData(id);

  // Jika tidak ada data match, arahkan ke halaman notFound
  if (!match) {
    notFound();
  }

  return (
    <section className="p-4 sm:p-8 container mx-auto">
      <MatchDetailCard
        title={match.title}
        logo={match.logo}
        date={match.date}
        location={match.location}
        price={match.price}
        club={match.club}
        description={match.description}
        times={match.times}
      />
    </section>
  );
}
