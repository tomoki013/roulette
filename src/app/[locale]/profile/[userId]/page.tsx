import { Metadata } from "next";
import ProfilePageClient from "./Client";
import { getProfileByUserId } from "@/lib/services/profileService";

export async function generateMetadata(props: { params: { userId: string, locale: string } }): Promise<Metadata> {
    const { userId, locale } = props.params;
    const profile = await getProfileByUserId(userId);
    const t = (await import(`@/i18n/locales/${locale}/common.json`)).default;

    const title = profile?.username ? `${profile.username} | ${t('title')}` : t('mypage.anonymousProfile');
    const description = profile?.description || t('mypage.anonymousProfile');

    return {
        title: title,
        description: description,
    }
}

const ProfilePage = ({ params }: { params: { userId: string } }) => {
    return <ProfilePageClient userId={params.userId} />;
}

export default ProfilePage;
