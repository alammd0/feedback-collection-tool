import { AuthProvider } from "./AuthContext";
import { SocketProvider } from "./SocketContext";
import type { ReactNode } from "react";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <SocketProvider>
      <AuthProvider>{children}</AuthProvider>
    </SocketProvider>
  );
};
