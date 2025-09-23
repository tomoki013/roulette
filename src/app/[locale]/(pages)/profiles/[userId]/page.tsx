import { Metadata } from "next";
import ProfilePageClient from "./Client";
import { getProfileByUserId } from "@/lib/services/profileService";

export async function generateMetadata(props: {
  params: Promise<{ userId: string; locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { userId, locale } = params;
  const profile = await getProfileByUserId(userId);
  const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

  const title = profile?.username
    ? `${profile.username}`
    : t("mypage.anonymousProfile");
  const description = profile?.description || t("mypage.anonymousProfile");

  return {
    title: title,
    description: description,
  };
}

const ProfilePage = async (props: { params: Promise<{ userId: string }> }) => {
  const params = await props.params;
  const { userId } = params;
  return <ProfilePageClient userId={userId} />;
};

export default ProfilePage;
