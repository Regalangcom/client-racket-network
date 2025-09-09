import { notFound } from "next/navigation";
import { getMatchDataBeforePayment } from "@/constant/getMatchData";
import CompetitionPayment from "@/components/Competitions/competitionsPayment";

export default async function CompetitonsPaymentPage({
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
      <CompetitionPayment
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
