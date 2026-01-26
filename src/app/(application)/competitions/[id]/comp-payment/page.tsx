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

  const { access_token, email } = await getAuthServerSession();
  const isAuthenticated = !!access_token;

  const competitionsDetail = await CompetitionsService.getCompetitionsById(
    id,
    access_token || undefined
  );

  if (!competitionsDetail) {
    notFound();
  }

  return (
    <section className="sm:p-8 md:container">
      <CompetitionPayment
        competitonId={competitionsDetail.id}
        name_comp={competitionsDetail.name_comp}
        competition_date={competitionsDetail.competitions_date}
        location={competitionsDetail.location}
        price={competitionsDetail.price}
        isAuthenticated={isAuthenticated}
        userEmail={email}
      />
    </section>
  );
}