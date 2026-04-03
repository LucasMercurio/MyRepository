import { useMemo, useState } from 'react'
import { LanguageContext } from './languageContext.js'

const STORAGE_KEY = 'portfolio-locale'

const translations = {
    home: {
        welcome: { pt: 'Bem-Vindo', en: 'Welcome' },
        langLabel: { pt: 'Idioma', en: 'Language' },
    },
    about: {
        title: { pt: 'Sobre Mim', en: 'About Me' },
        body: {
            pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus ut efficitur. Integer vitae justo eget magna fermentum iaculis eu non diam.',
            en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus ut efficitur. Integer vitae justo eget magna fermentum iaculis eu non diam.',
        },
    },
    loading: {
        text: { pt: 'Carregando...', en: 'Loading...' },
    },
}

export function LanguageProvider({ children }) {
    const [locale, setLocaleState] = useState(() => {
        try {
            const s = localStorage.getItem(STORAGE_KEY)
            if (s === 'pt' || s === 'en') return s
        } catch {
            /* ignore */
        }
        return 'pt'
    })

    const setLocale = (l) => {
        setLocaleState(l)
        try {
            localStorage.setItem(STORAGE_KEY, l)
        } catch {
            /* ignore */
        }
    }

    const t = useMemo(() => {
        const pick = (group) => {
            const o = {}
            for (const [k, v] of Object.entries(group)) {
                o[k] = v[locale] ?? v.en
            }
            return o
        }
        return {
            home: pick(translations.home),
            about: pick(translations.about),
            loading: pick(translations.loading),
        }
    }, [locale])

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    )
}
