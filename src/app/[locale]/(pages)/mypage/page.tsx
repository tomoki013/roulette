import { Metadata } from "next";
import MyPageClient from "./Client";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { locale } = await params;
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  return {
    title: t.mypage.title,
    description: t.mypage.description,
    openGraph: {
      title: t.mypage.title,
      description: t.mypage.description,
      images: [
        {
          url: "favicon.ico",
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      title: t.mypage.title,
      description: t.mypage.description,
      images: ["favicon.ico"],
    },
  };
}

const MyPage = () => {
  return <MyPageClient />;
};

export default MyPage;
