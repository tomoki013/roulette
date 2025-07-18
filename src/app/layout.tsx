import Script from "next/script";
import "./globals.css";

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
				{/* Google tag (gtag.js) */}
				<Script async src="https://www.googletagmanager.com/gtag/js?id=G-L4CDHVGSSL"></Script>
				<Script id="google-analytics">
				  	{`
				  		window.dataLayer = window.dataLayer || [];
				  		function gtag(){dataLayer.push(arguments);}
				  		gtag('js', new Date());
						
				  		gtag('config', 'G-L4CDHVGSSL');
				  	`}
				</Script>

			</head>
  	  	  	<body>{children}</body>
  	  	</html>
  	);
}