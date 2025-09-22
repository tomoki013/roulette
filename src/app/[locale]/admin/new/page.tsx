import { TemplateForm } from '../components/TemplateForm';
import { Locale } from '@/i18n-config';
import { createTranslation } from '@/i18n/server';

export default async function NewTemplatePage({ params: { locale } }: { params: { locale: Locale } }) {
    const { t } = await createTranslation(locale, 'admin');

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6">{t('form.createTitle')}</h1>
                <TemplateForm />
            </div>
        </div>
    );
}
