import { notFound } from "next/navigation";
import CompetitionPayment from "@/components/competitions/competitions-payment";
import { CompetitionsService } from "@/services/comp-services";
import { getAuthServerSession } from "@/lib/auth-options";

export default async function CompetitonsPaymentPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const { access_token } = await getAuthServerSession();

  const competitionsDetail = await CompetitionsService.getCompetitionsById(
    id,
    access_token as string
  );

  if (!competitionsDetail) {
    notFound();
  }

  return (
    <section className="sm:p-8 md:container">
      <CompetitionPayment
        title={competitionsDetail.name_comp}
        competition_date={competitionsDetail.competitions_date}
        location={competitionsDetail.location}
      />
    </section>
  );
}
