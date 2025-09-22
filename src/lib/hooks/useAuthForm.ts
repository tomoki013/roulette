import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getSupabase } from '@/lib/supabaseClient';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export interface AuthFormValues {
    email: string;
    password: string;
    username?: string;
}

interface UseAuthFormOptions {
    onSuccess?: () => void;
    enablePageNavigation?: boolean;
}

export const useAuthForm = ({
    onSuccess,
    enablePageNavigation = false
}: UseAuthFormOptions = {}
) => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isLoginView, setIsLoginView] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().email({ message: t('auth.error.emailInvalid') }),
        password: z.string().min(6, { message: t('auth.error.passwordLength') }),
        username: z.string().optional(),
    });

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '', username: '' },
    });

    const handleSubmit = async (values: AuthFormValues) => {
        setIsLoading(true);
        setAuthError(null);
        const supabase = getSupabase();

        try {
            if (isLoginView) {
                // ログイン処理
                const { error } = await supabase.auth.signInWithPassword({
                    email: values.email,
                    password: values.password,
                });
              
                if (error) {
                    setAuthError(error.message);
                } else {
                    if (enablePageNavigation) {
                        router.push(`/${i18n.language}/mypage`);
                        router.refresh();
                    }
                    onSuccess?.();
                }
            } else {
                // 新規登録処理
                const { error } = await supabase.auth.signUp({
                    email: values.email,
                    password: values.password,
                    options: {
                        data: {
                            username: values.username || values.email.split('@')[0],
                        },
                    },
                });
              
                if (error) {
                    setAuthError(error.message);
                } else {
                    if (!enablePageNavigation) {
                        alert('確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。');
                    } else {
                        router.push(`/${i18n.language}/mypage`);
                        router.refresh();
                    }
                    onSuccess?.();
                }
            }
        } catch {
            setAuthError('予期しないエラーが発生しました。');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        form,
        isLoginView,
        setIsLoginView,
        authError,
        isLoading,
        handleSubmit,
        t,
    };
};
