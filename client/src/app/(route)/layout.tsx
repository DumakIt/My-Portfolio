import SocketProvider from "../_lib/socketProvider";

export default function HomePageLayout({ children }: { children: React.ReactNode }) {
  return <SocketProvider>{children}</SocketProvider>;
}
