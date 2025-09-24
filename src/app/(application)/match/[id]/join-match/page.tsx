import { notFound } from "next/navigation";
import { getMatchDataBeforePayment } from "@/constant/get-all-dummy-data";
import MatchRegister from "@/components/match/matchRegister";

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
    <section className="sm:p-8 md:container">
      <MatchRegister
        time={match.time}
        location={match.location}
        price={match.price}
        club={match.club}
      />
    </section>
  );
}
