import { RecoilRoot } from "recoil";

export default function RecoilSetting({ children }: { children: React.ReactNode }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
