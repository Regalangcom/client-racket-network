import React from "react";
import { notFound } from "next/navigation";
import { getAuthServerSession } from "@/lib/auth-options";
import { FotograferService } from "@/services/fotografer-service";
import FotograferEventDetail from "@/components/fotografer/event-detail";

interface PageProps {
  params: { id: string };
}

export default async function FotograferEventDetailPage({ params }: PageProps) {
  const { access_token } = await getAuthServerSession();
  const id = Number(params.id);

  const [event, invitations] = await Promise.all([
    FotograferService.getEventById(id, access_token ?? null),
    FotograferService.getEventInvitations(id, access_token ?? null),
  ]);

  if (!event) notFound();

  return <FotograferEventDetail event={event} invitations={invitations} />;
}
