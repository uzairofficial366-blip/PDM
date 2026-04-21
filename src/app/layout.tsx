import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Pak Development Mission (PDM) | Empowering Communities",
    template: "%s | Pak Development Mission",
  },
  description:
    "Pak Development Mission (PDM) is a non-profit organization working towards social development and empowerment of marginalized communities in Khyber Pakhtunkhwa, Pakistan since 2009.",
  keywords: [
    "PDM",
    "Pak Development Mission",
    "NGO Pakistan",
    "KPK NGO",
    "social development",
    "community empowerment",
    "Peshawar",
  ],
  openGraph: {
    title: "Pak Development Mission (PDM)",
    description:
      "Empowering communities through social development in Khyber Pakhtunkhwa.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
