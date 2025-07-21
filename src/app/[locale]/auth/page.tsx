'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 新規登録とログインのフォームを作成
const AuthPage = () => {
    const { t, i18n } = useTranslation();
    const router = useRouter();
    const [isLoginView, setIsLoginView] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // バリデーションスキーマをメールアドレスベースに変更
    const formSchema = z.object({
        email: z.string().email({ message: t('auth.error.emailInvalid') }),
        password: z.string().min(6, { message: t('auth.error.passwordLength') }),
        // 新規登録時のみ使用
        username: z.string().optional(),
    });

    type AuthFormValues = z.infer<typeof formSchema>;

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '', username: '' },
    });

    // フォーム送信処理
    const onSubmit = async (values: AuthFormValues) => {
        setIsLoading(true);
        setAuthError(null);

        if (isLoginView) {
            // ログイン処理
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            if (error) {
                setAuthError(error.message);
            } else {
                router.push(`/${i18n.language}/mypage`);
                router.refresh();
            }
        } else {
            // 新規登録処理
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: {
                        // profilesテーブルに保存するメタデータ
                        username: values.username || values.email.split('@')[0], // ユーザー名がなければメールの前半部分を登録
                    },
                },
            });
            if (error) {
                setAuthError(error.message);
            } else {
                router.push(`/${i18n.language}/mypage`);
                router.refresh();
            }
        }
        setIsLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
        >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
                <div className="flex justify-center mb-6">
                    <button onClick={() => setIsLoginView(true)} className={`px-4 py-2 text-lg font-semibold ${isLoginView ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white/70'}`}>{t('login')}</button>
                    <button onClick={() => setIsLoginView(false)} className={`px-4 py-2 text-lg font-semibold ${!isLoginView ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white/70'}`}>{t('auth.signUp')}</button>
                </div>

                <h1 className="text-3xl font-bold text-center mb-6">
                    {isLoginView ? t('login') : t('auth.signUp')}
                </h1>

                {authError && <p className="bg-red-500/30 text-red-200 text-center p-3 rounded-lg mb-4">{authError}</p>}

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {!isLoginView && (
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">{t('auth.username')}</label>
                            <input type="text" {...form.register("username")} className="w-full input-style" placeholder={t('auth.usernamePlaceholder')} />
                            {form.formState.errors.username && <p className="text-red-400 text-sm mt-1">{form.formState.errors.username.message}</p>}
                        </div>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">{t('auth.email')}</label>
                        <input type="email" {...form.register("email")} className="w-full input-style" />
                        {form.formState.errors.email && <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-white/90 mb-2">{t('auth.password')}</label>
                        <input type="password" {...form.register("password")} className="w-full input-style" />
                        {form.formState.errors.password && <p className="text-red-400 text-sm mt-1">{form.formState.errors.password.message}</p>}
                    </div>
                    <button type="submit" disabled={isLoading} className="w-full button-primary">
                        {isLoading ? t('spinning') : (isLoginView ? t('login') : t('auth.signUp'))}
                    </button>
                </form>
            </div>
            <style jsx>{`
                .input-style {
                    background-color: rgba(255, 255, 255, 0.2);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 0.5rem;
                    padding: 0.75rem 1rem;
                    color: white;
                    transition: all 0.2s;
                }
                .input-style:focus {
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
                }
                .button-primary {
                    padding: 0.75rem 1.5rem;
                    background-image: linear-gradient(to right, #f6e05e, #f97316);
                    color: white;
                    font-weight: 600;
                    border-radius: 0.5rem;
                    transition: all 0.2s;
                }
                .button-primary:hover {
                    transform: scale(1.02);
                }
                .button-primary:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
            `}</style>
        </motion.div>
    );
};

export default AuthPage;
