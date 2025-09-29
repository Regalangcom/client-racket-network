import React, { useEffect } from "react";
import { useInbox } from "@/hooks/useInbox";
import { AccountMenu } from "../accountMenu/accountMenu";

export const InboxMobileView: React.FC = () => {
  const { items, loading, error, loadInboxItems } = useInbox();

  useEffect(() => {
    loadInboxItems();
  }, [loadInboxItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header */}
      <div className="mt-24">
        {/* <h1 className="text-lg font-semibold"></h1> */}
        <AccountMenu title="Inbox" showBackButton={true} />

        <div>
          {items.map((item) => (
            <div key={item.id} className="px-4 py-3 border-b flex items-center">
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold  text-md">{item.type}</h3>
                  <span className="text-xs text-gray-500">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Your ticket for competition is {item.ticket}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
