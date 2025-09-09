// components/InProgressBadge.tsx
import React from "react";

interface InProgressBadgeProps {
  text?: string;
}

const InProgressBadge: React.FC<InProgressBadgeProps> = ({
  text = "In Progress",
}) => {
  return (
    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#B5D9D2] text-green-800">
      {text}
    </div>
  );
};

export default InProgressBadge;
