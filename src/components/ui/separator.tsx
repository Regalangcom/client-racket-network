"use client";

import React from "react";

export default function Separator() {
  return (
    <React.Fragment>
      <div className="py-8 relative w-[calc(100%+2rem)] -mx-4 md:-mx-6">
        <div className="bg-gray-300 absolute left-0 right-0 py-[4px]"></div>
      </div>
    </React.Fragment>
  );
}
