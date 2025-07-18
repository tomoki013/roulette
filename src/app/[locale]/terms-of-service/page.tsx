'use client';

import { useTranslation } from 'react-i18next';

const TermsOfServicePage = () => {
    const { t, i18n } = useTranslation();
    const isJapanese = i18n.language === 'ja';

    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">{t('termsTitle')}</h1>
            <div className="space-y-4 text-white/90">
                <p>{t('lastUpdated')}</p>
                {isJapanese ? (
                    <>
                        <p>
                            この利用規約（以下、「本規約」といいます。）は、「Webでルーレット」（以下、「当サイト」といいます。）の利用条件を定めるものです。ユーザーの皆様（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第1条（適用）</h2>
                        <p>本規約は、ユーザーと当サイトとの間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第2条（禁止事項）</h2>
                        <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                            <li>その他、当サイトが不適切と判断する行為</li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第3条（免責事項）</h2>
                        <p>当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">第4条（サービス内容の変更等）</h2>
                        <p>当サイトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとします。</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第5条（準拠法・裁判管轄）</h2>
                        <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
                        <p className="pt-4">以上</p>
                    </>
                ) : (
                    <>
                        <p>
                           These Terms of Service (hereinafter referred to as the &quot;Terms&quot;) set forth the terms and conditions for use of the &quot;Roulette on the Web&quot; (hereinafter referred to as the &quot;Site&quot;). Users (hereinafter referred to as &quot;Users&quot;) shall use the Service in accordance with these Terms.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 1 (Application)</h2>
                        <p>These Terms shall apply to all relationships between the User and the Site concerning the use of the Service.</p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 2 (Prohibited Matters)</h2>
                        <p>Users shall not engage in the following acts when using the Service.</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Acts that violate laws and regulations or public order and morals.</li>
                            <li>Acts related to criminal acts.</li>
                            <li>Acts that destroy or interfere with the functions of the Site&apos;s servers or network.</li>
                            <li>Any other acts that the Site deems inappropriate.</li>
                        </ul>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 3 (Disclaimer)</h2>
                        <p>The Site shall not be liable for any damages incurred by the User arising from the Service.</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 4 (Changes to Service Content, etc.)</h2>
                        <p>The Site may change the content of the Service or discontinue providing the Service without notice to the User.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 5 (Governing Law and Jurisdiction)</h2>
                        <p>The laws of Japan shall be the governing law for the interpretation of these Terms.</p>
                        <p className="pt-4">End</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default TermsOfServicePage;
