'use client';

import Link from 'next/link';
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
                        <h2 className="text-2xl font-semibold pt-4 pb-2">1. Cookie（クッキー）について</h2>
                        <p>
                            Cookieとは、ユーザーがウェブサイトを閲覧した際に、ブラウザを通じてユーザーのコンピュータに一時的にデータを保存する仕組みです。当サイトでは、サービスの向上、およびユーザー体験の改善を目的としてCookieを使用しています。これにより、ユーザーの設定を記憶したり、より関連性の高い広告を表示したりすることが可能になります。
                        </p>
                        <p>
                            ユーザーは、ブラウザの設定を変更することでCookieの使用を無効にすることができます。また、当サイトのCookie同意バナーで「拒否する」を選択した場合、当サイトで情報が収集されることはありません。ただし、Cookieを無効化すると当サイトに限らず、一部のウェブサイトで機能が正常に利用できなくなる可能性がありますので、あらかじめご了承ください。主要なブラウザのCookie設定変更方法については、以下のリンクをご参照ください。
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Chrome</Link></li>
                            <li><Link href="https://support.mozilla.org/ja/kb/block-websites-storing-cookies-site-data-firefox" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Mozilla Firefox</Link></li>
                            <li><Link href="https://support.apple.com/ja-jp/105082" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Apple Safari</Link></li>
                            <li><Link href="https://support.microsoft.com/ja-jp/windows/microsoft-edge-%E3%81%A7%E3%81%AE-cookie-%E3%81%AE%E5%89%8A%E9%99%A4-a7285316-6d9b-1e5f-5e52-094921a46a9a" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Microsoft Edge</Link></li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. 広告の配信について</h2>
                        <p>
                            当サイトでは、第三者配信の広告サービス「Google AdSense（グーグルアドセンス）」を利用しています。
                            広告配信事業者は、ユーザーの興味に応じた広告を表示するため、当サイトや他サイトへのアクセスに関する情報「Cookie（クッキー）」(氏名、住所、メールアドレス、電話番号は含まれません) を使用することがあります。
                            Cookieを無効にする設定およびGoogleアドセンスに関する詳細は「<Link href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">広告 – ポリシーと規約 – Google</Link>」をご確認ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. アクセス解析ツールについて</h2>
                        <p>
                            当サイトでは、Googleによるアクセス解析ツール「Google Analytics（グーグルアナリティクス）」を利用しています。
                            Google Analyticsは、ユーザーのサイト利用状況を把握するためにCookieを使用します。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。収集されたデータは、サイトの改善や利用状況の分析のために活用されます。
                        </p>
                        <h3 className="text-xl font-semibold pt-2 pb-1">データ収集の無効化（オプトアウト）</h3>
                        <p>
                            この機能はCookieを無効にすることで収集を拒否することが出来ます。また、下記の「Googleアナリティクス オプトアウト アドオン」をインストールすることで、Google Analyticsによるデータ収集を無効にすることも可能です。
                        </p>
                        <p>
                            <Link href="https://tools.google.com/dlpage/gaoptout?hl=ja" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Googleアナリティクス オプトアウト アドオン</Link>
                        </p>
                        <p>
                            Google Analyticsの利用規約やプライバシーポリシーに関する詳細は、以下のリンクをご確認ください。
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Analytics利用規約</Link></li>
                            <li><Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Googleのプライバシーポリシー</Link></li>
                        </ul>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. 免責事項</h2>
                        <p>
                            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. プライバシーポリシーの変更について</h2>
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
                        <h2 className="text-2xl font-semibold pt-4 pb-2">1. About Cookies</h2>
                        <p>
                            A cookie is a mechanism that temporarily stores data on a user&apos;s computer through the browser when the user browses a website. This site uses cookies to improve our services and enhance the user experience. This allows us to remember user settings and display more relevant advertisements.
                        </p>
                        <p>
                            Users can disable the use of cookies by changing their browser settings. If you select &quot;Decline&quot; on our cookie consent banner, no information will be collected in this site. However, please note that in such cases, some functions may not be available on some websites, not limited to this site. For information on how to change cookie settings in major browsers, please refer to the links below.
                        </p>
                         <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Chrome</Link></li>
                            <li><Link href="https://support.mozilla.org/en-US/kb/block-websites-storing-cookies-site-data-firefox" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Mozilla Firefox</Link></li>
                            <li><Link href="https://support.apple.com/en-us/105082" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Apple Safari</Link></li>
                            <li><Link href="https://support.microsoft.com/en-us/windows/microsoft-edge-Browse-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Microsoft Edge</Link></li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. About Advertising</h2>
                        <p>
                            This site uses the third-party advertising service &quot;Google AdSense&quot;.
                            Advertising distributors may use &quot;Cookies&quot; (which do not include your name, address, e-mail address, or telephone number) to display advertisements for products and services that match your interests.
                            For more information about Google AdSense and how to disable cookies, please see &quot;<Link href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Advertising – Policies & Terms – Google</Link>&quot;.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. About Access Analysis Tools</h2>
                        <p>
                            This site uses &quot;Google Analytics&quot;, an access analysis tool provided by Google.
                            Google Analytics uses cookies to understand how users interact with the site. This traffic data is collected anonymously and does not personally identify you. The collected data is used to improve the site and analyze usage patterns.
                        </p>
                        <h3 className="text-xl font-semibold pt-2 pb-1">Opting Out of Data Collection</h3>
                        <p>
                            You can refuse to have this data collected by disabling cookies in your browser settings. You can also disable data collection by Google Analytics by installing the &quot;Google Analytics Opt-out Add-on&quot; below.
                        </p>
                        <p>
                            <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Analytics Opt-out Add-on</Link>
                        </p>
                        <p>
                            For more information on the Google Analytics terms of service and privacy policy, please see the links below.
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                           <li><Link href="https://marketingplatform.google.com/about/analytics/terms/us/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Analytics Terms of Service</Link></li>
                           <li><Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google&apos;s Privacy Policy</Link></li>
                        </ul>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. Disclaimer</h2>
                        <p>
                            Please note that we are not responsible for any damage or loss caused by the content of this site.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. Changes to This Privacy Policy</h2>
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
