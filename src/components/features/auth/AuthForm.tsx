'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabaseClient';
import { useTranslation } from 'react-i18next';

// onSuccessコールバックを受け取るようにPropsを定義
interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
    const { t } = useTranslation();
    const [isLoginView, setIsLoginView] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = z.object({
        email: z.string().email({ message: t('auth.error.emailInvalid') }),
        password: z.string().min(6, { message: t('auth.error.passwordLength') }),
        username: z.string().optional(),
    });

    type AuthFormValues = z.infer<typeof formSchema>;

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '', password: '', username: '' },
    });

    const onSubmit = async (values: AuthFormValues) => {
        setIsLoading(true);
        setAuthError(null);

        if (isLoginView) {
            const { error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
            });
            if (error) {
                setAuthError(error.message);
            } else {
                onSuccess(); // 成功時にコールバックを実行
            }
        } else {
            const { error } = await supabase.auth.signUp({
                email: values.email,
                password: values.password,
                options: {
                    data: { username: values.username || values.email.split('@')[0] },
                },
            });
            if (error) {
                setAuthError(error.message);
            } else {
                alert('確認メールを送信しました。メール内のリンクをクリックして登録を完了してください。');
                onSuccess(); // 成功時にコールバックを実行
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="text-white">
            <div className="flex justify-center mb-6">
                <button onClick={() => setIsLoginView(true)} className={`px-4 py-2 text-lg font-semibold ${isLoginView ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white/70'}`}>{t('auth.login')}</button>
                <button onClick={() => setIsLoginView(false)} className={`px-4 py-2 text-lg font-semibold ${!isLoginView ? 'text-yellow-300 border-b-2 border-yellow-300' : 'text-white/70'}`}>{t('auth.signUp')}</button>
            </div>
            <h1 className="text-3xl font-bold text-center mb-6">
                {isLoginView ? t('auth.login') : t('auth.signUp')}
            </h1>

            {authError && <p className="bg-red-500/30 text-red-200 text-center p-3 rounded-lg mb-4">{authError}</p>}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* ...フォームのJSXはauth/page.tsxからコピー... */}
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
                    {isLoading ? t('loading') : (isLoginView ? t('auth.login') : t('auth.signUp'))}
                </button>
            </form>
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
        </div>
    );
};

export default AuthForm;
