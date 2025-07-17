// src/app/[locale]/layout.tsx

import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import Header from "@/components/layout/Header"; // Headerをインポート
import { i18n } from "../../../i18n-config";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = params;

    return (
        <div lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <I18nProvider locale={locale}>
                <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
                    <Header /> {/* Headerコンポーネントをここに配置 */}
                    <main>{children}</main> {/* ページコンポーネントがここに表示される */}
                </div>
            </I18nProvider>
        </div>
    );
}
