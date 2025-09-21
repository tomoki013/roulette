'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getProfileByUserId } from '@/lib/services/profileService';
import { getPublicTemplatesByUserId } from '@/lib/services/rouletteService';
import { Database } from '@/types/database.types';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import TemplateCard from '@/components/features/templates/TemplateCard';
import { User } from 'lucide-react';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Roulette = Database['public']['Tables']['roulettes']['Row'];
type Template = Roulette & { profiles: Pick<Profile, 'username'> | null };

interface ProfilePageClientProps {
    userId: string;
}

const ProfilePageClient = ({ userId }: ProfilePageClientProps) => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [profileData, templatesData] = await Promise.all([
                    getProfileByUserId(userId),
                    getPublicTemplatesByUserId(userId)
                ]);
                setProfile(profileData);
                setTemplates(templatesData as Template[]);
            } catch (error) {
                console.error("Failed to fetch profile data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!profile) {
        return (
            <div className="text-center text-white/80 bg-white/10 p-12 rounded-2xl">
                <p>{t('mypage.userNotFound', 'ユーザーが見つかりません。')}</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            {/* プロフィールセクション */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <User size={24} className="text-yellow-300" />
                    <h1 className="text-3xl font-bold text-white">{profile.username}</h1>
                </div>
                <p className="text-white/90 whitespace-pre-wrap">
                    {profile.description || t('mypage.noProfileDescription', 'プロフィールが設定されていません。')}
                </p>
            </div>

            {/* 公開テンプレート一覧 */}
            <h2 className="text-2xl font-bold text-white mb-4">{t('mypage.publicTemplates', '公開中のテンプレート')}</h2>
            {templates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map(template => (
                        <TemplateCard key={template.id} template={template} />
                    ))}
                </div>
            ) : (
                <div className="text-center text-white/80 bg-white/10 p-12 rounded-2xl">
                    <p>{t('mypage.noPublicTemplates', '公開中のテンプレートはありません。')}</p>
                </div>
            )}
        </div>
    );
};

export default ProfilePageClient;
