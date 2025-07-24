'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

const TermsOfServicePage = () => {
    const { t, i18n } = useTranslation();
    const locale = i18n.language;

    return (
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-6">{t('termsOfService.title')}</h1>
            <div className="space-y-4 text-white/90">
                <p>{t('termsOfService.lastUpdated')}</p>
                
                {/* Japanese Version */}
                {i18n.language === 'ja' && (
                    <>
                        <p>
                            この利用規約（以下、「本規約」といいます。）は、「Webでルーレット」（以下、「当サイト」といいます。）の利用条件を定めるものです。ユーザーの皆様（以下、「ユーザー」といいます。）には、本規約に従って本サービスをご利用いただきます。
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">第1条（適用）</h2>
                        <p>本規約は、ユーザーと当サイトとの間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">第2条（ユーザー登録）</h2>
                        <p>
                            当サイトの一部の機能を利用するにあたり、ユーザー登録が必要な場合があります。ユーザーは、自己の責任において、メールアドレス及びパスワードを適切に管理するものとします。当サイトは、入力されたメールアドレスとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録している本人による利用とみなします。ユーザーが作成したルーレットデータは、当該ユーザーのアカウントに紐づけて保存されます。
                        </p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">第3条（Cookieの使用）</h2>
                        <p>当サイトでは、利便性の向上と広告配信のためにCookieを使用しています。詳細については、<Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>をご確認ください。</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第4条（アクセス解析ツール）</h2>
                        <p>当サイトでは、サービス向上のためにGoogle Analyticsを利用しています。これにより、個人を特定しない形で利用状況のデータを収集します。詳細は<Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>をご確認ください。</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">第5条（お問い合わせ）</h2>
                        <p>
                            ユーザーが当サイトのお問い合わせフォームを利用する際には、当サイトのプライバシーポリシーに同意したものとみなします。詳細はプライバシーポリシーをご確認ください。
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第6条（禁止事項）</h2>
                        <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>法令または公序良俗に違反する行為</li>
                            <li>犯罪行為に関連する行為</li>
                            <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                            <li>その他、当サイトが不適切と判断する行為</li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第7条（ユーザーコンテンツ）</h2>
                        <ol className="list-decimal list-inside pl-4 space-y-1">
                            <li>ユーザーは、当サイトのテンプレート機能を利用して、自らが作成したルーレット（以下、「ユーザーコンテンツ」といいます。）を公開することができます。</li>
                            <li>ユーザーは、ユーザーコンテンツが第三者の著作権、商標権、プライバシー権、その他の権利を侵害しないことを保証するものとします。</li>
                            <li>当サイトは、ユーザーコンテンツが不適切であると判断した場合、当該ユーザーに通知することなく、ユーザーコンテンツを削除することができるものとします。</li>
                            <li>ユーザーは、自らが作成したユーザーコンテンツに対し、当サイトがサービスを提供する上で必要な範囲において、無償で利用する権利（複製、公衆送信、翻案等を含みます）を許諾するものとします。この権利許諾は、ユーザーがアカウントを削除した後も有効に存続するものとします。</li>
                        </ol>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第8条（免責事項）</h2>
                        <p>当サイトは、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第9条（サービス内容の変更等）</h2>
                        <p>当サイトは、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとします。</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">第10条（準拠法・裁判管轄）</h2>
                        <p>本規約の解釈にあたっては、日本法を準拠法とします。</p>
                        <p className="pt-4">以上</p>
                    </>
                )}

                {/* French Version */}
                {i18n.language === 'fr' && (
                    <>
                        <p>
                            Les présentes Conditions d&apos;utilisation (ci-après dénommées les « Conditions ») définissent les conditions d&apos;utilisation du service « Roulette sur le Web » (ci-après dénommé le « Site »). Les utilisateurs (ci-après dénommés les « Utilisateurs ») utiliseront le Service conformément aux présentes Conditions.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 1 (Application)</h2>
                        <p>Les présentes Conditions s&apos;appliquent à toutes les relations entre l&apos;Utilisateur et le Site concernant l&apos;utilisation du Service.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 2 (Inscription de l&apos;utilisateur)</h2>
                        <p>
                            L&apos;inscription de l&apos;utilisateur peut être requise pour utiliser certaines fonctionnalités de ce site. Les utilisateurs sont responsables de la gestion appropriée de leurs adresses e-mail et mots de passe. Si une connexion est établie avec une combinaison d&apos;adresse e-mail et de mot de passe qui correspond aux informations enregistrées, ce site considérera qu&apos;elle est utilisée par la personne qui a enregistré cet ID utilisateur. Les données de roulette créées par l&apos;utilisateur seront enregistrées en association avec le compte de cet utilisateur.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 3 (Utilisation des cookies)</h2>
                        <p>Ce site utilise des cookies pour améliorer la commodité et pour la diffusion de publicités. Pour plus de détails, veuillez consulter notre <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 4 (Outil d&apos;analyse d&apos;audience)</h2>
                        <p>Ce site utilise Google Analytics pour améliorer nos services. Cela collecte des données d&apos;utilisation d&apos;une manière qui n&apos;identifie pas personnellement les individus. Pour plus de détails, veuillez consulter notre <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 5 (Demandes de renseignements)</h2>
                        <p>
                            En utilisant le formulaire de contact sur ce site, vous êtes réputé avoir accepté notre politique de confidentialité. Veuillez consulter la politique de confidentialité pour plus de détails.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 6 (Interdictions)</h2>
                        <p>Les Utilisateurs ne doivent pas se livrer aux actes suivants lors de l&apos;utilisation du Service.</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Actes qui violent les lois et règlements ou l&apos;ordre public et la morale.</li>
                            <li>Actes liés à des actes criminels.</li>
                            <li>Actes qui détruisent ou interfèrent avec les fonctions des serveurs ou du réseau du Site.</li>
                            <li>Tout autre acte que le Site juge inapproprié.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 7 (Contenu utilisateur)</h2>
                        <ol className="list-decimal list-inside pl-4 space-y-1">
                            <li>Les utilisateurs peuvent publier des roulettes qu&apos;ils ont créées (ci-après dénommées « Contenu utilisateur ») en utilisant la fonction de modèle de ce site.</li>
                            <li>L&apos;utilisateur garantit que le Contenu utilisateur ne viole pas les droits d&apos;auteur, les marques de commerce, les droits à la vie privée ou tout autre droit de tiers.</li>
                            <li>Si le Site détermine que le Contenu utilisateur est inapproprié, il peut supprimer le Contenu utilisateur sans en avertir l&apos;utilisateur.</li>
                            <li>L&apos;utilisateur accorde au Site une licence gratuite d&apos;utilisation du Contenu utilisateur qu&apos;il a créé (y compris la reproduction, la transmission publique, l&apos;adaptation, etc.) dans la mesure nécessaire à la fourniture du service. Cette licence restera en vigueur même après la suppression du compte de l&apos;utilisateur.</li>
                        </ol>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 8 (Clause de non-responsabilité)</h2>
                        <p>Le Site ne sera pas responsable des dommages subis par l&apos;Utilisateur découlant du Service.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 9 (Modification du contenu du service, etc.)</h2>
                        <p>Le Site peut modifier le contenu du Service ou cesser de fournir le Service sans préavis à l&apos;Utilisateur.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 10 (Droit applicable et juridiction)</h2>
                        <p>Les lois du Japon seront le droit applicable pour l&apos;interprétation des présentes Conditions.</p>
                        <p className="pt-4">Fin</p>
                    </>
                )}

                {/* Spanish Version */}
                {i18n.language === 'es' && (
                     <>
                        <p>
                            Estos Términos de servicio (en adelante, los &quot;Términos&quot;) establecen los términos y condiciones para el uso del servicio &quot;Ruleta en la Web&quot; (en adelante, el &quot;Sitio&quot;). Los usuarios (en adelante, los &quot;Usuarios&quot;) utilizarán el Servicio de acuerdo con estos Términos.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 1 (Aplicación)</h2>
                        <p>Estos Términos se aplicarán a todas las relaciones entre el Usuario y el Sitio con respecto al uso del Servicio.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 2 (Registro de usuario)</h2>
                        <p>
                           Es posible que se requiera el registro de usuario para utilizar algunas funciones de este sitio. Los usuarios son responsables de administrar adecuadamente sus direcciones de correo electrónico y contraseñas. Si se inicia sesión con una combinación de dirección de correo electrónico y contraseña que coincide con la información registrada, este sitio lo considerará como un uso por parte de la persona que registró esa ID de usuario. Los datos de la ruleta creados por el usuario se guardarán en asociación con la cuenta de ese usuario.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 3 (Uso de cookies)</h2>
                        <p>Este sitio utiliza cookies para mejorar la comodidad y para la entrega de anuncios. Para obtener más detalles, consulte nuestra <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 4 (Herramienta de análisis de acceso)</h2>
                        <p>Este sitio utiliza Google Analytics para mejorar nuestros servicios. Esto recopila datos de uso de una manera que no identifica personalmente a las personas. Para obtener más detalles, consulte nuestra <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 5 (Consultas)</h2>
                        <p>
                            Al utilizar el formulario de contacto de este sitio, se considera que ha aceptado nuestra Política de privacidad. Consulte la Política de privacidad para obtener más detalles.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 6 (Asuntos prohibidos)</h2>
                        <p>Los usuarios no participarán en los siguientes actos al utilizar el Servicio.</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Actos que violen las leyes y regulaciones o el orden público y la moral.</li>
                            <li>Actos relacionados con actos delictivos.</li>
                            <li>Actos que destruyan o interfieran con las funciones de los servidores o la red del Sitio.</li>
                            <li>Cualquier otro acto que el Sitio considere inapropiado.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 7 (Contenido del usuario)</h2>
                        <ol className="list-decimal list-inside pl-4 space-y-1">
                            <li>Los usuarios pueden publicar ruletas que hayan creado (en adelante, &quot;Contenido del usuario&quot;) utilizando la función de plantilla de este sitio.</li>
                            <li>El usuario garantiza que el Contenido del usuario no infringe los derechos de autor, marcas comerciales, derechos de privacidad u otros derechos de terceros.</li>
                            <li>Si el Sitio determina que el Contenido del usuario es inapropiado, puede eliminar el Contenido del usuario sin notificar al usuario.</li>
                            <li>El usuario otorga al Sitio una licencia gratuita para usar el Contenido del usuario que ha creado (incluida la reproducción, transmisión pública, adaptación, etc.) en la medida necesaria para proporcionar el servicio. Esta concesión de licencia seguirá vigente incluso después de que el usuario elimine su cuenta.</li>
                        </ol>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 8 (Descargo de responsabilidad)</h2>
                        <p>El Sitio no será responsable de ningún daño incurrido por el Usuario que surja del Servicio.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 9 (Cambios en el contenido del servicio, etc.)</h2>
                        <p>El Sitio puede cambiar el contenido del Servicio o dejar de proporcionar el Servicio sin previo aviso al Usuario.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Artículo 10 (Ley aplicable y jurisdicción)</h2>
                        <p>Las leyes de Japón serán la ley aplicable para la interpretación de estos Términos.</p>
                        <p className="pt-4">Fin</p>
                    </>
                )}

                {/* English (Default) Version */}
                {i18n.language === 'en' && (
                    <>
                        <p>
                           These Terms of Service (hereinafter referred to as the &quot;Terms&quot;) set forth the terms and conditions for use of the &quot;Roulette on the Web&quot; (hereinafter referred to as the &quot;Site&quot;). Users (hereinafter referred to as &quot;Users&quot;) shall use the Service in accordance with these Terms.
                        </p>
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 1 (Application)</h2>
                        <p>These Terms shall apply to all relationships between the User and the Site concerning the use of the Service.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 2 (User Registration)</h2>
                        <p>
                            User registration may be required to use some features of this site. Users are responsible for appropriately managing their email addresses and passwords. If a login is made with a combination of email address and password that matches the registered information, this site will deem it as use by the person who registered that user ID. Roulette data created by the user will be saved in association with that user&apos;s account.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 3 (Use of Cookies)</h2>
                        <p>This site uses cookies to improve convenience and for ad delivery. For details, please check our <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 4 (Access Analysis Tool)</h2>
                        <p>This site uses Google Analytics to improve our services. This collects usage data in a way that does not personally identify individuals. For details, please check our <Link href={`/${locale}/privacy-policy`} className="underline hover:text-yellow-300">{t('privacyPolicy')}</Link>.</p>
                        
                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 5 (Inquiries)</h2>
                        <p>
                            By using the contact form on this site, you are deemed to have agreed to our Privacy Policy. Please review the Privacy Policy for details.
                        </p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 6 (Prohibited Matters)</h2>
                        <p>Users shall not engage in the following acts when using the Service.</p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Acts that violate laws and regulations or public order and morals.</li>
                            <li>Acts related to criminal acts.</li>
                            <li>Acts that destroy or interfere with the functions of the Site&apos;s servers or network.</li>
                            <li>Any other acts that the Site deems inappropriate.</li>
                        </ul>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 7 (User Content)</h2>
                        <ol className="list-decimal list-inside pl-4 space-y-1">
                            <li>Users can publish roulettes they have created (hereinafter referred to as &quot;User Content&quot;) using the template feature of this site.</li>
                            <li>The user warrants that the User Content does not infringe on the copyrights, trademark rights, privacy rights, or other rights of third parties.</li>
                            <li>If the Site determines that the User Content is inappropriate, it may delete the User Content without notifying the user.</li>
                            <li>The user grants the Site a free license to use the User Content they have created (including reproduction, public transmission, adaptation, etc.) to the extent necessary to provide the service. This license grant shall remain in effect even after the user deletes their account.</li>
                        </ol>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 8 (Disclaimer)</h2>
                        <p>The Site shall not be liable for any damages incurred by the User arising from the Service.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 9 (Changes to Service Content, etc.)</h2>
                        <p>The Site may change the content of the Service or discontinue providing the Service without notice to the User.</p>

                        <h2 className="text-2xl font-semibold pt-4 pb-2">Article 10 (Governing Law and Jurisdiction)</h2>
                        <p>The laws of Japan shall be the governing law for the interpretation of these Terms.</p>
                        <p className="pt-4">End</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default TermsOfServicePage;