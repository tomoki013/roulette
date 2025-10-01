"use client";

import { useAuthForm } from "@/lib/hooks/useAuthForm";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect } from "react";

interface AuthFormProps {
  onSuccess?: () => void;
  enablePageNavigation?: boolean;
}

const AuthForm = ({
  onSuccess,
  enablePageNavigation = false,
}: AuthFormProps) => {
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
        <p className="mt-2">{t("common.loading")}</p>
      </div>
    );
  }

  // 既にログイン済みの場合は何も表示しない
  if (user) {
    return null;
  }

  const tabButtonBase =
    "py-2 px-4 text-lg font-semibold bg-transparent border-none cursor-pointer transition-all duration-200";
  const tabButtonActive = "text-amber-400 border-b-2 border-amber-400";
  const tabButtonInactive = "text-white/70";
  const inputStyle =
    "bg-white/20 border border-white/30 rounded-lg py-3 px-4 text-white transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-white/70";
  const buttonPrimary =
    "py-3 px-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg transition-all duration-200 w-full border-none cursor-pointer hover:not(:disabled):scale-105 disabled:opacity-50 disabled:cursor-not-allowed";
  const errorMessage =
    "bg-red-500/30 text-red-300 text-center p-3 rounded-lg mb-4";
  const fieldError = "text-red-400 text-sm mt-1";
  const label = "block text-sm font-medium text-white/90 mb-2";

  return (
    <div className="text-white">
      {/* タブ切り替え */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsLoginView(true)}
          className={`${tabButtonBase} ${
            isLoginView ? tabButtonActive : tabButtonInactive
          }`}
        >
          {t("common.login")}
        </button>
        <button
          onClick={() => setIsLoginView(false)}
          className={`${tabButtonBase} ${
            !isLoginView ? tabButtonActive : tabButtonInactive
          }`}
        >
          {t("common.signUp")}
        </button>
      </div>

      {/* タイトル */}
      <h1 className="text-3xl font-bold text-center mb-6">
        {isLoginView ? t("common.login") : t("common.signUp")}
      </h1>

      {/* エラーメッセージ */}
      {authError && <p className={errorMessage}>{authError}</p>}

      {/* フォーム */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* ユーザー名（新規登録時のみ） */}
        {!isLoginView && (
          <div>
            <label className={label}>{t("common.username")}</label>
            <input
              type="text"
              {...form.register("username")}
              className={inputStyle}
              placeholder={t("components.auth.usernamePlaceholder")}
            />
            {form.formState.errors.username && (
              <p className={fieldError}>
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
        )}

        {/* メールアドレス */}
        <div>
          <label className={label}>{t("common.email")}</label>
          <input
            type="email"
            {...form.register("email")}
            className={inputStyle}
          />
          {form.formState.errors.email && (
            <p className={fieldError}>{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* パスワード */}
        <div>
          <label className={label}>{t("common.password")}</label>
          <input
            type="password"
            {...form.register("password")}
            className={inputStyle}
          />
          {form.formState.errors.password && (
            <p className={fieldError}>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* 送信ボタン */}
        <button type="submit" disabled={isLoading} className={buttonPrimary}>
          {isLoading
            ? t("common.loading")
            : isLoginView
              ? t("common.login")
              : t("common.signUp")}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
