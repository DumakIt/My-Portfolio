import type { Metadata } from "next";
import "./globals.css";
import RecoilSetting from "./_lib/recoilSetting";

export const metadata: Metadata = {
  title: "PlayWorld",
  description: "프론트엔드 개발자 최민기의 메타버스 커뮤니티 프로젝트 입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RecoilSetting>{children}</RecoilSetting>
      </body>
    </html>
  );
}
