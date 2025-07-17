import { Geist, Geist_Mono } from "next/font/google";
import I18nProvider from "@/components/I18nProvider";
import Header from "@/components/layout/Header";
import { i18n } from "../../../i18n-config";
import { Metadata } from "next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

// generateMetadata関数を追加
export async function generateMetadata(props: { params: Promise<{ locale: string }>}): Promise<Metadata> {
    const params = await props.params
    const { locale } = await params;
    // 対応する翻訳ファイルを動的にインポート
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;
  
    return {
        title: t.mainTitle,
        description: t.description,
    };
}

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
    const { locale } = await params;

    return (
        <div lang={locale} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <I18nProvider locale={locale}>
                <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 p-4">
                    <Header />
                    <main>{children}</main>
                </div>
            </I18nProvider>
        </div>
    );
}
