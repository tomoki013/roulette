'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRoulettesByUserId } from '@/lib/services/rouletteService';
import { getProfileByUserId, updateProfile, deleteUser } from '@/lib/services/profileService';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import MyRouletteList from '@/components/features/mypage/MyRouletteList';
import { useTranslation } from 'react-i18next';
import { Database } from '@/types/database.types';
import { Edit3, Save, Trash2 } from 'lucide-react';
import { useModal } from '@/lib/hooks/useModal';
import Modal from '@/components/elements/common/Modal';

type Roulette = Database['public']['Tables']['roulettes']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

const MyPageClient = () => {
    const { user, signOut, loading: authLoading } = useAuth();
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [roulettes, setRoulettes] = useState<Roulette[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileDescription, setProfileDescription] = useState('');
    const { showModal, closeModal } = useModal();

    useEffect(() => {
        if (authLoading) return;

        if (!user) {
            router.replace(`/${i18n.language}/auth`);
            return;
        }

        const fetchData = async () => {
            try {
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

    const handleDeleteAccount = useCallback(async () => {
        try {
            await deleteUser();
            await signOut();
            closeModal();
            router.push('/');
        } catch (error) {
            console.error("Failed to delete account:", error);
            showModal({
                title: "Error",
                message: "Failed to delete account. Please try again later.",
                type: 'error',
                onConfirm: closeModal,
            });
        }
    }, [signOut, closeModal, showModal, router]);

    const showDeleteConfirmModal = useCallback(() => {
        showModal({
            title: t('mypage.delete_account.modal_title'),
            message: t('mypage.delete_account.modal_description'),
            confirmText: t('mypage.delete_account.confirm_button'),
            cancelText: t('mypage.delete_account.cancel_button'),
            onConfirm: handleDeleteAccount,
            onCancel: closeModal,
            type: 'error'
        });
    }, [t, closeModal, handleDeleteAccount, showModal]);
    
    if (authLoading || isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
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

                    <div className="mt-6 border-t border-white/20 pt-6">
                        <button
                            onClick={showDeleteConfirmModal}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-700/80 transition-colors"
                        >
                            <Trash2 size={16} />
                            <span>{t('mypage.delete_account.button')}</span>
                        </button>
                    </div>
                </div>

                <MyRouletteList initialRoulettes={roulettes} />
            </div>
            <Modal />
        </>
    );
};

export default MyPageClient;
