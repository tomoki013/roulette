'use client';

import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
    const { t, i18n } = useTranslation();
    const isJapanese = i18n.language === 'ja';

    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">{t('privacyTitle')}</h1>
            <div className="space-y-4 text-white/90">
                <p>{t('lastUpdated')}</p>
                {isJapanese ? (
                    <>
                        <p>
                            「Webでルーレット」（以下、「当サイト」といいます。）は、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に最大限の注意を払っています。このプライバシーポリシーは、当サイトが収集する情報、その利用方法、および情報の保護について説明するものです。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">1. 広告の配信について</h2>
                        <p>
                            当サイトでは、第三者配信の広告サービス「Google AdSense（グーグルアドセンス）」を利用しています。
                            広告配信事業者は、ユーザーの興味に応じた広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie（クッキー）」(氏名、住所、メールアドレス、電話番号は含まれません) を使用することがあります。
                            Cookieを無効にする設定およびGoogleアドセンスに関する詳細は「<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">広告 – ポリシーと規約 – Google</a>」をご確認ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. アクセス解析ツールについて</h2>
                        <p>
                            当サイトでは、Googleによるアクセス解析ツール「Google Analytics（グーグルアナリティクス）」を利用しています。
                            Google Analyticsはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                            この規約に関して、詳しくは「<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Analytics利用規約</a>」をご確認ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. 免責事項</h2>
                        <p>
                            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. プライバシーポリシーの変更について</h2>
                        <p>
                            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
                            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                        </p>
                    </>
                ) : (
                    <>
                        <p>
                            &quot;Roulette on the Web&quot;(hereinafter referred to as &quot;this site&quot;) respects your privacy and pays the utmost attention to the protection of personal information. This privacy policy explains what information this site collects, how it is used, and how it is protected.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">1. About Advertising</h2>
                        <p>
                            This site uses the third-party advertising service &quot;Google AdSense&quot;.
                            Advertising distributors may use &quot;Cookies&quot; (which do not include your name, address, e-mail address, or telephone number) to display advertisements for products and services that match your interests.
                            For more information about Google AdSense and how to disable cookies, please see &quot;<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Advertising – Policies & Terms – Google</a>&quot;.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. About Access Analysis Tools</h2>
                        <p>
                            This site uses &quot;Google Analytics&quot;, an access analysis tool provided by Google.
                            Google Analytics uses cookies to collect traffic data. This traffic data is collected anonymously and does not personally identify you.
                            You can refuse to have this data collected by disabling cookies in your browser settings.
                            For more information on these terms, please see the &quot;<a href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Analytics Terms of Service</a>&quot;.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. Disclaimer</h2>
                        <p>
                            Please note that we are not responsible for any damage or loss caused by the content of this site.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. Changes to This Privacy Policy</h2>
                        <p>
                            This site will comply with Japanese laws and regulations applicable to personal information and will review and improve this policy from time to time.
                            The latest revised privacy policy will always be disclosed on this page.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;