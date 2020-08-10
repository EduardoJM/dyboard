import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-electron-language-detector';
import Backend from 'i18next-fs-backend';

const options = {
    supportedLngs: ['pt', 'en'],
    lng: 'pt',
    fallbackLng: ['en', 'pt'],
    debug: true,
    whitelist: ['en', 'pt'],
    backend: {
        loadPath: './locales/{{lng}}/{{ns}}.json',
        addPath: './locales/{{lng}}/{{ns}}.missing.json'
    },
    react: {
        wait: false,
        useSuspense: false
    },
    saveMissing: true,
    ns: 'translations',
    defaultNS: 'translations',
    interpolation: {
        escapeValue: false // not needed for react as it escapes by default
    }
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(options);

export default i18n;
