'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GoogleAnalytics = () => {
    const [consent, setConsent] = useState<string | null>(null);

    useEffect(() => {
        setConsent(localStorage.getItem('cookie_consent'));
    }, []);

    if (consent === 'false') {
        return null;
    }

    return (
        <>
            <Script async src="https://www.googletagmanager.com/gtag/js?id=G-L4CDHVGSSL"></Script>
            <Script id="google-analytics">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-L4CDHVGSSL');
                `}
            </Script>
        </>
    );
};

export default GoogleAnalytics;
