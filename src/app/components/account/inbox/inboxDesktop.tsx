import React, { useEffect } from "react";
import { useInbox } from "@/hooks/useInbox";

export const InboxDesktopView: React.FC = () => {
  const { items, loading, error, loadInboxItems } = useInbox();

  useEffect(() => {
    loadInboxItems();
  }, [loadInboxItems]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r p-6">
        <h1 className="text-2xl font-bold mb-6">Inbox</h1>
      </div>

      {/* Main Content */}
      <div className="w-3/4 bg-gray-100 p-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            {items.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.type}</h3>
                    <p className="text-sm text-gray-600">
                      Your ticket for competition is {item.ticket}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">{item.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
