// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  	title: "ルーレットアプリ",
  	description: "要件定義書に基づくルーレットアプリ",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
  	  	<html>
  	  	  	<body>{children}</body>
  	  	</html>
  	);
}