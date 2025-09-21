'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRoulettesByUserId } from '@/lib/services/rouletteService';
import { getProfileByUserId, updateProfile } from '@/lib/services/profileService';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import MyRouletteList from '@/components/features/mypage/MyRouletteList';
import { useTranslation } from 'react-i18next';
import { Database } from '@/types/database.types';
import { Edit3, Save } from 'lucide-react'; // アイコンをインポート

type Roulette = Database['public']['Tables']['roulettes']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row']; // Profile型を定義

const MyPageClient = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [roulettes, setRoulettes] = useState<Roulette[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null); // プロフィール情報を保持するState
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false); // プロフィール編集状態のState
    const [profileDescription, setProfileDescription] = useState(''); // プロフィール説明文のState

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.replace(`/${i18n.language}/auth`);
            return;
        }

        const fetchData = async () => {
            try {
                // ルーレットとプロフィールを並行して取得
                const [rouletteData, profileData] = await Promise.all([
                    getRoulettesByUserId(user.id),
                    getProfileByUserId(user.id)
                ]);
                setRoulettes(rouletteData);
                if (profileData) {
                    setProfile(profileData);
                    setProfileDescription(profileData.description || '');
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, authLoading, router, i18n.language]);

    const handleProfileSave = async () => {
        if (!user || !profile) return;
        try {
            const updatedProfile = await updateProfile(user.id, { description: profileDescription });
            setProfile(updatedProfile);
            setIsEditingProfile(false);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };
    
    if (authLoading || isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
                {t('mypage.title')}
            </h1>

            {/* プロフィールセクション */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                <h1 className='text-center text-3xl font-bold text-white mb-4'>
                    {t('mypage.profile')}
                </h1>
                <hr className='text-white' />
                <div className="flex justify-between items-center my-4">
                    <h2 className="text-2xl font-bold text-white">{profile?.username || '...'}</h2>
                    {!isEditingProfile && (
                        <button onClick={() => setIsEditingProfile(true)} className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                            <Edit3 size={16} />
                            <span>{t('mypage.edit')}</span>
                        </button>
                    )}
                </div>
                {isEditingProfile ? (
                    <div>
                        <textarea
                            value={profileDescription}
                            onChange={(e) => setProfileDescription(e.target.value)}
                            className="w-full h-24 p-2 bg-white/20 rounded-md text-white"
                            placeholder="プロフィールを入力してください..."
                        />
                        <div className="flex justify-end gap-2 mt-2">
                             <button onClick={() => setIsEditingProfile(false)} className="px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/10 rounded-lg transition-colors">{t('close')}</button>
                            <button onClick={handleProfileSave} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                                <Save size={16} />
                                <span>{t('roulette.settings.save')}</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-white/90 whitespace-pre-wrap">{profileDescription || 'プロフィールが設定されていません。'}</p>
                )}
            </div>

            <MyRouletteList initialRoulettes={roulettes} />
        </div>
    );
};

export default MyPageClient;
