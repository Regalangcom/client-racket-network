import { notFound } from "next/navigation";
import { getMatchDataBeforePayment } from "@/constant/getMatchData";
import MatchRegister from "@/app/components/match/matchRegister";

export default async function MatchRegisterPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  // Ambil data match berdasarkan ID
  const match = await getMatchDataBeforePayment(id);

  if (!match) {
    notFound();
  }

  return (
    <section className="p-4 sm:p-8 container mx-auto">
      <MatchRegister
        title={match.title}
        times={match.times}
        date={match.date}
        location={match.location}
        price={match.price}
        club={match.club}
      />
    </section>
  );
}
