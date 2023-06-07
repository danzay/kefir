/** The module keeps a locale manager. */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use( Backend )
    .use( LanguageDetector )
    .use( initReactI18next )
    .init( {
        fallbackLng: 'ru',
        backend: {
            loadPath: '/kefir/locales/{{lng}}/{{ns}}.json',
            addPath: 'kefir/locales/add/{{lng}}/{{ns}}',
            allowMultiLoading: false
        }
    } );

export default i18n;