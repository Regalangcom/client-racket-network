"use client";

import React from "react";

export default function Errors({ error }: { error: Error }) {
  console.log(error);

  return (
    <div>
      <p>there was an error ...</p>
    </div>
  );
}
