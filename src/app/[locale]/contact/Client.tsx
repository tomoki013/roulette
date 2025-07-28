'use client';

import { useState, useRef } from 'react'; // useRefをインポート
import { useTranslation } from 'react-i18next';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from 'next/link';

const ContactPageClient = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    // コンポーネントのトップ要素への参照を作成
    const topRef = useRef<HTMLDivElement>(null);

    const formSchema = z.object({
        name: z.string().min(2, {
            message: t('contact.error.nameRequired'),
        }),
        email: z.string().email({
            message: t('contact.error.emailRequired'),
        }),
        subject: z.string().min(5, {
            message: t('contact.submit.error.subjectLength'),
        }),
        message: z.string().min(10, {
            message: t('contact.submit.error.messageLength'),
        }),
        inquiryType: z.string({
            required_error: t('contact.submit.error.inquiryTypeRequired'),
        }).refine(value => value !== "", { message: t('contact.submit.error.inquiryTypeRequired') }),
        agreeToTerms: z.boolean().refine(val => val === true, {
            message: t('contact.submit.error.agreeToTermsRequired'),
        }),
    });

    type ContactFormValues = z.infer<typeof formSchema>;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            inquiryType: "",
            agreeToTerms: false,
        },
    });

    /**
     * フォーム送信処理
     * @param values フォームの入力値
     * @description エラーハンドリングを強化し、サーバーエラーとネットワークエラーを区別して表示します。
     * エラー発生時にはページトップにスクロールします。
     */
    const onSubmit = async (values: ContactFormValues) => {
        setErrorMessage(null);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                // サーバーがエラーレスポンスを返した場合 (ステータスコード 4xx, 5xx)
                const errorData = await response.json().catch(() => null); // JSON以外のレスポンスも考慮
                const serverMessage = errorData?.message || t('contact.submit.errorServer', 'サーバー側で予期せぬエラーが発生しました。');
                setErrorMessage(`${t('contact.submit.errorSeverPrefix', 'サーバーエラー')}: ${serverMessage}`);
                // エラー表示のためにトップへスクロール
                topRef.current?.scrollIntoView({ behavior: 'smooth' });
            }
        } catch {
            // ネットワークエラーなど、リクエスト自体が失敗した場合
            setErrorMessage(t('contact.submit.errorNetwork', 'ネットワーク接続に問題があるようです。接続を確認後、再度お試しください。'));
            // エラー表示のためにトップへスクロール
            topRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    };


    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white text-center">
                <h1 className="text-3xl font-bold mb-4">{t('contact.submit.successTitle')}</h1>
                <p className="text-white/80 mb-8">{t('contact.submit.successExcerpt')}</p>
                <button 
                    onClick={() => {
                        setIsSubmitted(false)
                        form.reset();
                    }} 
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors font-semibold"
                >
                    {t('contact.newInquiry')}
                </button>
            </div>
        )
    }

    return (
        // 作成したrefをトップレベルのdivにアタッチ
        <div ref={topRef} className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">{t('contact.title')}</h1>
            <p className="text-white/80 mb-8">{t('contact.excerpt')}</p>
            
            {/* エラーメッセージの表示をより分かりやすく改善 */}
            {errorMessage && (
                <div role="alert" className="mb-6 rounded-lg border border-red-500/80 bg-red-900/50 p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 flex-shrink-0 text-red-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                        </svg>
                        <h3 className="font-semibold text-red-300">
                            {t('contact.submit.error', 'メッセージの送信に失敗しました')}
                        </h3>
                    </div>
                    <p className="mt-2 text-sm text-red-300/90 pl-9">
                        {errorMessage}
                    </p>
                </div>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">{t('contact.name')}</label>
                        <input type="text" {...form.register("name")} id="name" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all" />
                        {form.formState.errors.name && <p className="text-red-400 text-sm mt-1">{form.formState.errors.name.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">{t('contact.email')}</label>
                        <input type="email" {...form.register("email")} id="email" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all" />
                        {form.formState.errors.email && <p className="text-red-400 text-sm mt-1">{form.formState.errors.email.message}</p>}
                    </div>
                </div>
                <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-white/90 mb-2">{t('contact.inquiryType.title')}</label>
                    <select {...form.register("inquiryType")} id="inquiryType" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 transition-all">
                        <option value="" >{t('contact.inquiryType.placeholder')}</option>
                        <option value="general" className="bg-gray-800">{t('contact.inquiryType.options.general')}</option>
                        <option value="feedback" className="bg-gray-800">{t('contact.inquiryType.options.feedback')}</option>
                        <option value="bugReport" className="bg-gray-800">{t('contact.inquiryType.options.bugReport')}</option>
                        <option value="collaboration" className="bg-gray-800">{t('contact.inquiryType.options.collaboration')}</option>
                        <option value="correction" className="bg-gray-800">{t('contact.inquiryType.options.correction')}</option>
                        <option value="featureRequest" className="bg-gray-800">{t('contact.inquiryType.options.featureRequest')}</option>
                        <option value="other" className="bg-gray-800">{t('contact.inquiryType.options.other')}</option>
                    </select>
                    {form.formState.errors.inquiryType && <p className="text-red-400 text-sm mt-1">{form.formState.errors.inquiryType.message}</p>}
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">{t('contact.subject')}</label>
                    <input type="text" {...form.register("subject")} id="subject" className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all" />
                    {form.formState.errors.subject && <p className="text-red-400 text-sm mt-1">{form.formState.errors.subject.message}</p>}
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">{t('contact.message')}</label>
                    <textarea {...form.register("message")} id="message" rows={5} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"></textarea>
                    {form.formState.errors.message && <p className="text-red-400 text-sm mt-1">{form.formState.errors.message.message}</p>}
                </div>
                <div className="flex items-start space-x-3">
                    <input type="checkbox" {...form.register("agreeToTerms")} id="agreeToTerms" className="h-4 w-4 mt-1 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400" />
                    <div className="text-sm">
                        <label htmlFor="agreeToTerms" className="font-medium text-white/90">{t('contact.agreeToTerms')}</label>
                        <p className="text-white/70">{t('contact.agreeToTermsExcerpt')}</p>
                        {form.formState.errors.agreeToTerms && <p className="text-red-400 text-sm mt-1">{form.formState.errors.agreeToTerms.message}</p>}
                    </div>
                </div>
                <div>
                    <Link href={`/${locale}/privacy-policy`} className="hover:text-yellow-300 underline transition-colors">
                        {t('privacyPolicy.title')}
                    </Link>
                </div>
                <div>
                    <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg hover:from-yellow-500 hover:to-orange-600 transition-colors font-semibold disabled:opacity-50" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? t('loading') : t('contact.submit.button')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactPageClient;
