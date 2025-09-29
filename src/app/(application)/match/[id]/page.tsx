import { notFound } from "next/navigation";
import { getMatchData } from "@/constant/get-all-dummy-data";
import MatchDetailCard from "@/components/match/match-detail-card";

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
    <section className="sm:p-8 md:container-lg ">
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
