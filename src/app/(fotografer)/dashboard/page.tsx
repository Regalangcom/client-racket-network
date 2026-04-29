import React from "react";
import { getAuthServerSession } from "@/lib/auth-options";
import { FotograferService } from "@/services/fotografer-service";
import FotograferEventTable from "@/components/fotografer/event-table";

export default async function FotograferDashboardPage() {
  const { access_token } = await getAuthServerSession();

  const events = await FotograferService.getEvents(access_token ?? null);

  return <FotograferEventTable eventList={events} />;
}
