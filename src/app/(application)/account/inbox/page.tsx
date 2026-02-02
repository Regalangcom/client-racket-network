import { getAuthServerSession } from "@/lib/auth-options";
import { NotificationService } from "@/services/notification-service";
import InboxPage from "@/components/account/inbox/inbox-page";
import { redirect } from "next/navigation";

export default async function InboxServerPage() {
  const { access_token } = await getAuthServerSession();

  if (!access_token) {
    redirect("/sign-in?callbackUrl=/account/inbox");
  }

  const notifications = await NotificationService.getNotifications(access_token);

  return <InboxPage notifications={notifications} />;
}
