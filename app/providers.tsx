"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }: Layout) => {
  return <SessionProvider>{children}</SessionProvider>;
};
