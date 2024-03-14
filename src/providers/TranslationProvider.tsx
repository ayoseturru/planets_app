import React, {createContext, useState} from 'react';

interface Locale {
    [key: string]: string;
}

interface Messages {
    [locale: string]: Locale;
}

interface TranslationsContextType {
    currentLocale: string;
    changeLocale: (locale: string) => void;
    getMessage: (messageKey: string) => string;
}

interface Props {
    children: React.ReactNode;
}

const OFFERED_LOCALES: Record<string, string> = {EN: "en"},
    MESSAGES: Messages = {
        [OFFERED_LOCALES.EN]: require("../_locales/en.json"),
    },
    DEFAULT_LOCALE: string = OFFERED_LOCALES.EN;

const TranslationsContext = createContext<TranslationsContextType>({
    currentLocale: DEFAULT_LOCALE,
    changeLocale: () => {
    },
    getMessage: () => ''
});

const TranslationsProvider: React.FC<Props> = ({children}) => {
    const [currentLocale, setCurrentLocale] = useState(DEFAULT_LOCALE);

    const changeLocale = (locale: string) => {
        setCurrentLocale(locale);
    };

    const getMessage = (messageKey: string) => {
        return MESSAGES[currentLocale][messageKey] || '';
    };

    return (
        <TranslationsContext.Provider value={{currentLocale, changeLocale, getMessage}}>
            {children}
        </TranslationsContext.Provider>
    );
};

export {TranslationsProvider, TranslationsContext}