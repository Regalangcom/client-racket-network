"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function SessionProvider(props: Props) {
  return <NextAuthSessionProvider>{props.children}</NextAuthSessionProvider>;
}
