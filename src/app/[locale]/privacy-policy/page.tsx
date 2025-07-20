'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const PrivacyPolicyPage = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">{t('privacyTitle')}</h1>
            <div className="space-y-4 text-white/90">
                <p>{t('lastUpdated')}</p>

                {/* Japanese Version */}
                {i18n.language === 'ja' && (
                    <>
                        <p>
                            「Webでルーレット」（以下、「当サイト」といいます。）は、ユーザーの皆様のプライバシーを尊重し、個人情報の保護に最大限の注意を払っています。このプライバシーポリシーは、当サイトが収集する情報、その利用方法、および情報の保護について説明するものです。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2" id='cookie-info-ja'>1. Cookie（クッキー）について</h2>
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
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. お問い合わせフォームで取得する個人情報について</h2>
                        <p>
                            当サイトのお問い合わせフォームでは、名前（ニックネーム可）とメールアドレスの入力が必須となっています。取得したこれらの個人情報は、お問い合わせに対する返信や連絡のためにのみ利用し、本人の許可なく第三者に開示することはありません。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. 免責事項</h2>
                        <p>
                            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">6. プライバシーポリシーの変更について</h2>
                        <p>
                            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
                            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                        </p>
                    </>
                )}

                {/* French Version */}
                {i18n.language === 'fr' && (
                    <>
                        <p>
                            &quot;Roulette sur le Web&quot; (ci-après dénommé &quot;ce site&quot;) respecte votre vie privée et accorde la plus grande attention à la protection des informations personnelles. Cette politique de confidentialité explique quelles informations ce site collecte, comment elles sont utilisées et comment elles sont protégées.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2" id='cookie-info-fr'>1. À propos des cookies</h2>
                        <p>
                            Un cookie est un mécanisme qui stocke temporairement des données sur l&apos;ordinateur d&apos;un utilisateur via le navigateur lorsque l&apos;utilisateur navigue sur un site web. Ce site utilise des cookies pour améliorer nos services et l&apos;expérience utilisateur. Cela nous permet de mémoriser les paramètres de l&apos;utilisateur et d&apos;afficher des publicités plus pertinentes.
                        </p>
                        <p>
                            Les utilisateurs peuvent désactiver l&apos;utilisation des cookies en modifiant les paramètres de leur navigateur. Si vous sélectionnez &quot;Refuser&quot; sur notre bannière de consentement aux cookies, aucune information ne sera collectée sur ce site. Cependant, veuillez noter que dans de tels cas, certaines fonctions pourraient ne pas être disponibles sur certains sites web, y compris celui-ci. Pour savoir comment modifier les paramètres des cookies dans les principaux navigateurs, veuillez consulter les liens ci-dessous.
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://support.google.com/chrome/answer/95647?hl=ja" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Chrome</Link></li>
                            <li><Link href="https://support.mozilla.org/fr/kb/effacer-les-cookies-pour-supprimer-les-information" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Mozilla Firefox</Link></li>
                            <li><Link href="https://support.apple.com/fr-fr/105082" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Apple Safari</Link></li>
                            <li><Link href="https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Microsoft Edge</Link></li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. À propos de la publicité</h2>
                        <p>
                            Ce site utilise le service de publicité tiers &quot;Google AdSense&quot;.
                            Les distributeurs de publicité peuvent utiliser des &quot;cookies&quot; (qui n&apos;incluent pas votre nom, adresse, adresse e-mail ou numéro de téléphone) pour afficher des publicités pour des produits et services qui correspondent à vos intérêts.
                            Pour plus d&apos;informations sur Google AdSense et sur la manière de désactiver les cookies, veuillez consulter &quot;<Link href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Publicité – Règles et Conditions d&apos;utilisation – Google</Link>&quot;.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. À propos des outils d&apos;analyse d&apos;audience</h2>
                        <p>
                            Ce site utilise &quot;Google Analytics&quot;, un outil d&apos;analyse d&apos;audience fourni par Google.
                            Google Analytics utilise des cookies pour comprendre comment les utilisateurs interagissent avec le site. Ces données de trafic sont collectées de manière anonyme et ne vous identifient pas personnellement. Les données collectées sont utilisées pour améliorer le site et analyser les modèles d&apos;utilisation.
                        </p>
                        <h3 className="text-xl font-semibold pt-2 pb-1">Désactivation de la collecte de données</h3>
                        <p>
                            Vous pouvez refuser la collecte de ces données en désactivant les cookies dans les paramètres de votre navigateur. Vous pouvez également désactiver la collecte de données par Google Analytics en installant le &quot;Module complémentaire de désactivation de Google Analytics&quot; ci-dessous.
                        </p>
                        <p>
                            <Link href="https://tools.google.com/dlpage/gaoptout?hl=fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Module complémentaire de désactivation de Google Analytics</Link>
                        </p>
                        <p>
                            Pour plus d&apos;informations sur les conditions d&apos;utilisation et la politique de confidentialité de Google Analytics, veuillez consulter les liens ci-dessous.
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://marketingplatform.google.com/about/analytics/terms/fr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Conditions d&apos;utilisation de Google Analytics</Link></li>
                            <li><Link href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Politique de confidentialité de Google</Link></li>
                        </ul>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. À propos des informations personnelles collectées via le formulaire de contact</h2>
                        <p>
                            Notre formulaire de contact vous demande de saisir votre nom (un surnom est acceptable) et votre adresse e-mail. Ces informations personnelles seront utilisées uniquement dans le but de répondre à votre demande et ne seront pas divulguées à des tiers sans votre permission.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. Clause de non-responsabilité</h2>
                        <p>
                            Veuillez noter que nous ne sommes pas responsables des dommages ou pertes causés par le contenu de ce site.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">6. Modifications de cette politique de confidentialité</h2>
                        <p>
                            Ce site se conformera aux lois et réglementations japonaises applicables aux informations personnelles et révisera et améliorera cette politique de temps à autre.
                            La dernière politique de confidentialité révisée sera toujours publiée sur cette page.
                        </p>
                    </>
                )}

                {/* Spanish Version */}
                {i18n.language === 'es' && (
                    <>
                        <p>
                            &quot;Ruleta en la Web&quot; (en adelante, &quot;este sitio&quot;) respeta su privacidad y presta la máxima atención a la protección de la información personal. Esta política de privacidad explica qué información recopila este sitio, cómo se utiliza y cómo se protege.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2" id='cookie-info-es'>1. Acerca de las cookies</h2>
                        <p>
                            Una cookie es un mecanismo que almacena temporalmente datos en el ordenador de un usuario a través del navegador cuando el usuario navega por un sitio web. Este sitio utiliza cookies para mejorar nuestros servicios y la experiencia del usuario. Esto nos permite recordar la configuración del usuario y mostrar anuncios más relevantes.
                        </p>
                        <p>
                            Los usuarios pueden deshabilitar el uso de cookies cambiando la configuración de su navegador. Si selecciona &quot;Rechazar&quot; en nuestro banner de consentimiento de cookies, no se recopilará información en este sitio. Sin embargo, tenga en cuenta que, en tales casos, es posible que algunas funciones no estén disponibles en algunos sitios web, sin limitarse a este sitio. Para obtener información sobre cómo cambiar la configuración de cookies en los principales navegadores, consulte los enlaces a continuación.
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://support.google.com/chrome/answer/95647?hl=ja" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Google Chrome</Link></li>
                            <li><Link href="https://support.mozilla.org/es/kb/borrar-cookies" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Mozilla Firefox</Link></li>
                            <li><Link href="https://support.apple.com/es-es/105082" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Apple Safari</Link></li>
                            <li><Link href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Microsoft Edge</Link></li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">2. Acerca de la publicidad</h2>
                        <p>
                            Este sitio utiliza el servicio de publicidad de terceros &quot;Google AdSense&quot;.
                            Los distribuidores de publicidad pueden usar &quot;cookies&quot; (que no incluyen su nombre, dirección, dirección de correo electrónico o número de teléfono) para mostrar anuncios de productos y servicios que coincidan con sus intereses.
                            Para obtener más información sobre Google AdSense y cómo deshabilitar las cookies, consulte &quot;<Link href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Publicidad – Políticas y Términos – Google</Link>&quot;.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">3. Acerca de las herramientas de análisis de acceso</h2>
                        <p>
                            Este sitio utiliza &quot;Google Analytics&quot;, una herramienta de análisis de acceso proporcionada por Google.
                            Google Analytics utiliza cookies para comprender cómo los usuarios interactúan con el sitio. Estos datos de tráfico se recopilan de forma anónima y no lo identifican personalmente. Los datos recopilados se utilizan para mejorar el sitio y analizar los patrones de uso.
                        </p>
                        <h3 className="text-xl font-semibold pt-2 pb-1">Exclusión de la recopilación de datos</h3>
                        <p>
                            Puede negarse a que se recopilen estos datos desactivando las cookies en la configuración de su navegador. También puede deshabilitar la recopilación de datos por parte de Google Analytics instalando el &quot;Complemento de inhabilitación para navegadores de Google Analytics&quot; a continuación.
                        </p>
                        <p>
                            <Link href="https://tools.google.com/dlpage/gaoptout?hl=es" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Complemento de inhabilitación para navegadores de Google Analytics</Link>
                        </p>
                        <p>
                            Para obtener más información sobre los términos de servicio y la política de privacidad de Google Analytics, consulte los enlaces a continuación.
                        </p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li><Link href="https://marketingplatform.google.com/about/analytics/terms/es/" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Términos de servicio de Google Analytics</Link></li>
                            <li><Link href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer" className="underline hover:text-yellow-300">Política de privacidad de Google</Link></li>
                        </ul>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. Sobre la información personal recopilada a través del formulario de contacto</h2>
                        <p>
                            Nuestro formulario de contacto requiere que introduzca su nombre (se acepta un apodo) y su dirección de correo electrónico. Esta información personal se utilizará únicamente con el fin de responder a su consulta y no se revelará a terceros sin su permiso.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. Descargo de responsabilidad</h2>
                        <p>
                            Tenga en cuenta que no somos responsables de ningún daño o pérdida causada por el contenido de este sitio.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">6. Cambios en esta Política de Privacidad</h2>
                        <p>
                            Este sitio cumplirá con las leyes y regulaciones japonesas aplicables a la información personal y revisará y mejorará esta política de vez en cuando.
                            La última política de privacidad revisada siempre se publicará en esta página.
                        </p>
                    </>
                )}

                {/* English (Default) Version */}
                {/* Renders if language is not 'ja', 'fr', or 'es' */}
                {!'ja_fr_es'.includes(i18n.language) && (
                     <>
                        <p>
                            &quot;Roulette on the Web&quot;(hereinafter referred to as &quot;this site&quot;) respects your privacy and pays the utmost attention to the protection of personal information. This privacy policy explains what information this site collects, how it is used, and how it is protected.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2" id='cookie-info-en'>1. About Cookies</h2>
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
                        <h2 className="text-2xl font-semibold pt-4 pb-2">4. About Personal Information Collected Through the Contact Form</h2>
                        <p>
                            Our contact form requires you to enter your name (a nickname is acceptable) and email address. This personal information will be used solely for the purpose of responding to your inquiry and will not be disclosed to third parties without your permission.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">5. Disclaimer</h2>
                        <p>
                            Please note that we are not responsible for any damage or loss caused by the content of this site.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">6. Changes to This Privacy Policy</h2>
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
