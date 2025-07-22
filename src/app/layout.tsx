import "./globals.css";
import { Metadata } from "next";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export const metadata: Metadata = {
  	title: 'Webでルーレット',
  	description: 'Webで使える無料のカスタムルーレット作成ツール。好きな項目と比率を設定して、オリジナルの抽選ルーレットがすぐに作れます。登録は一切不要。PC・スマホ対応。',
  	authors: [{ name: 'ともきち' }],
  	openGraph: {
  	  	title: 'Webでルーレット',
  	  	description: 'Webで使える無料のカスタムルーレット作成ツール。好きな項目と比率を設定して、オリジナルの抽選ルーレットがすぐに作れます。登録は一切不要。PC・スマホ対応。',
  	  	url: 'https://webroulette.netlify.app',
  	  	siteName: 'Webでルーレット',
  	  	type: 'website',
  	  	images: [
  	  	  	{
  	  	  	  	url: 'favicon.ico',
  	  	  	  	width: 1200,
  	  	  	  	height: 630,
  	  	  	  	alt: 'Webでルーレット',
  	  	  	},
  	  	],
  	},
  	twitter: {
  	  	card: 'summary_large_image',
  	  	title: 'Webでルーレット',
  	  	description: 'Webで使える無料のカスタムルーレット作成ツール。好きな項目と比率を設定して、オリジナルの抽選ルーレットがすぐに作れます。登録は一切不要。PC・スマホ対応。',
  	  	images: ['favicon.ico'],
  	},
  	metadataBase: new URL('https://webroulette.netlify.app'),
}

export const viewport = {
  	width: 'device-width',
  	initialScale: 1,
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
  	return (
  	  	<html>
			<head>

				{/* Google Search Console */}
				<meta name="google-site-verification" content="qd9h_oeUkXKK0F-u4U5Z-c540MUq_Agst3K0rF8ERdM" />
				{/* Google Adsense */}
				<meta name="google-adsense-account" content="ca-pub-8687520805381056" />
				{/* Google Analytics */}
				<GoogleAnalytics />
				
			</head>
  	  	  	<body>
				{children}
			</body>
  	  	</html>
  	);
}
