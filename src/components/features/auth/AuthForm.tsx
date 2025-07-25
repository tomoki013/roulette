'use client';

import { useAuthForm } from '@/lib/hooks/useAuthForm';
import { useAuth } from '@/lib/hooks/useAuth';
import styles from '@/styles/AuthStyles.module.css';
import { useEffect } from 'react';

interface AuthFormProps {
    onSuccess?: () => void;
    enablePageNavigation?: boolean;
}

const AuthForm = ({
    onSuccess,
    enablePageNavigation = false
}: AuthFormProps
) => {
    const { user, loading: authLoading } = useAuth();
    const {
        form,
        isLoginView,
        setIsLoginView,
        authError,
        isLoading,
        handleSubmit,
        t,
    } = useAuthForm({ onSuccess, enablePageNavigation });

    // 既にログイン済みの場合は成功コールバックを実行
    useEffect(() => {
        if (user && !authLoading) {
            onSuccess?.();
        }
    }, [user, authLoading, onSuccess]);

    // 認証状態をロード中の場合はローディング表示
    if (authLoading) {
        return (
            <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                <p className="mt-2">{t('loading')}</p>
            </div>
        );
    }

    // 既にログイン済みの場合は何も表示しない
    if (user) {
        return null;
    }

    return (
        <div className="text-white">
            {/* タブ切り替え */}
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => setIsLoginView(true)}
                    className={`${styles.tabButton} ${
                        isLoginView ? styles.tabButtonActive : styles.tabButtonInactive
                    }`}
                >
                    {t('auth.login')}
                </button>
                <button
                    onClick={() => setIsLoginView(false)}
                    className={`${styles.tabButton} ${
                        !isLoginView ? styles.tabButtonActive : styles.tabButtonInactive
                    }`}
                >
                    {t('auth.signUp')}
                </button>
            </div>
              
            {/* タイトル */}
            <h1 className="text-3xl font-bold text-center mb-6">
                {isLoginView ? t('auth.login') : t('auth.signUp')}
            </h1>
              
            {/* エラーメッセージ */}
            {authError && (
                <p className={styles.errorMessage}>{authError}</p>
            )}

            {/* フォーム */}
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* ユーザー名（新規登録時のみ） */}
                {!isLoginView && (
                    <div>
                        <label className={styles.label}>
                            {t('auth.username')}
                        </label>
                        <input
                            type="text"
                            {...form.register('username')}
                            className={styles.inputStyle}
                            placeholder={t('auth.usernamePlaceholder')}
                        />
                        {form.formState.errors.username && (
                            <p className={styles.fieldError}>
                                {form.formState.errors.username.message}
                            </p>
                        )}
                    </div>
                )}

                {/* メールアドレス */}
                <div>
                    <label className={styles.label}>
                        {t('auth.email')}
                    </label>
                    <input
                        type="email"
                        {...form.register('email')}
                        className={styles.inputStyle}
                    />
                    {form.formState.errors.email && (
                        <p className={styles.fieldError}>
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>
                
                {/* パスワード */}
                <div>
                    <label className={styles.label}>
                        {t('auth.password')}
                    </label>
                    <input
                        type="password"
                        {...form.register('password')}
                        className={styles.inputStyle}
                    />
                    {form.formState.errors.password && (
                        <p className={styles.fieldError}>
                            {form.formState.errors.password.message}
                        </p>
                    )}
                </div>
                    
                {/* 送信ボタン */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={styles.buttonPrimary}
                >
                    {isLoading
                        ? t('loading')
                        : isLoginView
                        ? t('auth.login')
                        : t('auth.signUp')
                    }
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
