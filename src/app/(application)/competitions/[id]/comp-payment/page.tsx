import { notFound } from "next/navigation";
import { getMatchDataBeforePayment } from "@/constant/get-all-dummy-data";
import CompetitionPayment from "@/components/competitions/competitions-payment";

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
    <section className="sm:p-8 md:container">
      <CompetitionPayment
        title={match.title}
        time={match.time}
        // times={match.times}
        // date={match.date}
        location={match.location}
        price={match.price}
        club={match.club}
      />
    </section>
  );
}
