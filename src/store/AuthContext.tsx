"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabaseClient";
import LoadingScreen from "@/components/elements/loadingAnimation/LoadingScreen";

// Contextの型定義
interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// AuthContextを作成
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// AuthProviderコンポーネント
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    // Supabaseの認証状態の変化を監視
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // コンポーネントのアンマウント時に監視を解除
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // ログアウト処理
  const signOut = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  // ローディング中はスピナーを表示し、それ以外は子コンポーネントを描画
  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
