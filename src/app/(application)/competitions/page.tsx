import CompetitionsCard from "@/components/competitions/competitions-card";
import CompetitionFilter from "@/components/competitions/competitions-filter";
import CompetitionsSearch from "@/components/competitions/compSearch";
import { CompetitionData } from "@/constant/types";
import { getAuthServerSession } from "@/lib/auth-options";
import { CompetitionsService } from "@/services/comp-services";
import { Calendar } from "lucide-react";

export default async function CompetitionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { access_token } = await getAuthServerSession();

  const AllCompetitions: CompetitionData[] =
    await CompetitionsService.getAllCompetition({}, access_token || null);

  return (
    <section className="p-4 container-lg max-w-screen-2xl mx-auto">
      {" "}
      {/* Hapus min-h-screen atau atur ulang */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Sidebar sm:w-[27%] */}
        <div className="w-full sm:w-[26%] text-white mt-3">
          <CompetitionsSearch />
        </div>
        {/* Main Content */}
        <div className="flex-1  max-w-full">
          <div className="mb-4 font-semibold">
            {/*   filter */}
            <CompetitionFilter />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {AllCompetitions && AllCompetitions.length > 0 ? (
              AllCompetitions.map((comp) => (
                <CompetitionsCard key={comp.id} competitions={comp} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Competition Available
                </h3>
                <p className="text-gray-500 text-center max-w-sm">
                  There are no Competition scheduled at the moment. Check back
                  later for upcoming games!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
