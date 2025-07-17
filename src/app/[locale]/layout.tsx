// src/app/[locale]/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import { i18n } from "../../../i18n-config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// ビルド時に静的なパスを生成します
export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

//【重要】コンポーネントを `async function` として定義します
export default async function LocaleLayout({
    children,
    params // ここでは params オブジェクト全体を受け取る
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
  //【重要】関数の本体で locale を安全に取り出す
  const { locale } = await params;

    return (
        // lang属性を動的に設定します
        <div lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            {/* クライアントコンポーネントにlocaleをpropとして渡します */}
            <I18nProvider locale={locale}>
                {children}
            </I18nProvider>
        </div>
    );
}
