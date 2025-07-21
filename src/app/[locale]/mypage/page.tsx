'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getRoulettesByUserId } from '@/lib/services/rouletteService';
import LoadingScreen from '@/components/elements/loadingAnimation/LoadingScreen';
import MyRouletteList from '@/components/features/mypage/MyRouletteList';
import { useTranslation } from 'react-i18next';
import { Database } from '@/types/database.types';

type Roulette = Database['public']['Tables']['roulettes']['Row'];

const MyPage = () => {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { t, i18n } = useTranslation();
    const [roulettes, setRoulettes] = useState<Roulette[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 認証状態の読み込みが完了するまで待つ
        if (authLoading) return;

        // ログインしていない場合は認証ページにリダイレクト
        if (!user) {
            router.replace(`/${i18n.language}/auth`);
            return;
        }

        // ログインユーザーのルーレットデータを取得
        const fetchRoulettes = async () => {
            try {
                const data = await getRoulettesByUserId(user.id);
                setRoulettes(data);
            } catch (error) {
                console.error("Failed to fetch roulettes:", error);
                // TODO: エラー通知
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoulettes();
    }, [user, authLoading, router, i18n.language]);

    // 認証中またはデータ取得中はローディング画面を表示
    if (authLoading || isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-white text-center mb-8">
                {t('myPage')}
            </h1>
            <MyRouletteList initialRoulettes={roulettes} />
        </div>
    );
};

export default MyPage;
